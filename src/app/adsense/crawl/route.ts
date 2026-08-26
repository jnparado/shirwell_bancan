import { NextResponse } from "next/server";
import {
  ADSENSE_CRAWLER_LOGIN_PATH,
  ADSENSE_CRAWLER_PASSWORD_FIELD,
  ADSENSE_CRAWLER_USERNAME_FIELD,
  getAdsenseCrawlerLoginUrl,
  getAdsenseCrawlerRestrictedUrl,
  isAdsenseCrawlerLoginConfigured,
} from "@/config/adsense-crawler";
import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";
import { PRODUCTION_SITE_URL, getSitemapOrigin } from "@/lib/seo";

/**
 * Crawl readiness checklist for AdSense / AdsBot.
 * Open this URL after deploy, then use AdSense → Sites → Check for updates.
 */
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const sitemapOrigin = getSitemapOrigin();

  const checks = await Promise.all([
    fetchOk(`${origin}/ads.txt`),
    fetchOk(`${origin}/app-ads.txt`),
    fetchOk(`${origin}/robots.txt`),
    fetchOk(`${origin}/sitemap.xml`),
  ]);

  const [adsTxt, appAdsTxt, robots, sitemap] = checks;

  const body = {
    ok: adsTxt.ok && robots.ok && sitemap.ok,
    site: origin,
    sitemapOrigin,
    productionSite: PRODUCTION_SITE_URL,
    adsenseConfigured: isAdsenseConfigured(),
    publisherId: ADSENSE_CLIENT_ID,
    crawl: {
      adsTxt: {
        url: `${origin}/ads.txt`,
        ...adsTxt,
        note: "AdSense Sites → Check for updates crawls this URL",
      },
      appAdsTxt: {
        url: `${origin}/app-ads.txt`,
        ...appAdsTxt,
      },
      robots: {
        url: `${origin}/robots.txt`,
        ...robots,
      },
      sitemap: {
        url: `${origin}/sitemap.xml`,
        ...sitemap,
      },
    },
    crawlerAccess: {
      configured: isAdsenseCrawlerLoginConfigured(),
      loginUrl: getAdsenseCrawlerLoginUrl(origin),
      loginPath: ADSENSE_CRAWLER_LOGIN_PATH,
      restrictedUrl: getAdsenseCrawlerRestrictedUrl(origin),
      usernameField: ADSENSE_CRAWLER_USERNAME_FIELD,
      passwordField: ADSENSE_CRAWLER_PASSWORD_FIELD,
      note: "Only needed if Google asks for password-protected URL access",
    },
    nextSteps: [
      "Confirm crawl.adsTxt.status is 200 and body starts with google.com, pub-",
      "In AdSense → Sites → your site → Check for updates",
      "Wait for ads.txt status to become Authorized (can take hours–days)",
      `Set NEXT_PUBLIC_SITE_URL=${PRODUCTION_SITE_URL} on Vercel if sitemapOrigin was wrong`,
    ],
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

async function fetchOk(url: string): Promise<{
  ok: boolean;
  status: number;
  contentType: string | null;
  preview: string;
}> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": "Shirwell-Crawl-Check/1.0" },
      redirect: "follow",
    });
    const text = await res.text();
    return {
      ok: res.ok,
      status: res.status,
      contentType: res.headers.get("content-type"),
      preview: text.slice(0, 120).replace(/\s+/g, " ").trim(),
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      contentType: null,
      preview: error instanceof Error ? error.message : "fetch failed",
    };
  }
}
