import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSitemapOrigin } from "@/lib/seo";

/** Paths Google must always be allowed to fetch for ads + indexing. */
const CRAWLER_ALWAYS_ALLOW = [
  "/",
  "/ads.txt",
  "/app-ads.txt",
  "/robots.txt",
  "/sitemap.xml",
];

const PRIVATE_DISALLOW = [
  "/library",
  "/auth/",
  "/oauth/",
  "/profile",
  "/admin",
  "/products/cart",
  "/login",
  "/signup",
  "/adsense/",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerStore = await headers();
  const origin = getSitemapOrigin({ host: headerStore.get("host") });

  return {
    rules: [
      {
        userAgent: "*",
        allow: CRAWLER_ALWAYS_ALLOW,
        disallow: PRIVATE_DISALLOW,
      },
      {
        userAgent: "Mediapartners-Google",
        allow: CRAWLER_ALWAYS_ALLOW,
      },
      {
        userAgent: "AdsBot-Google",
        allow: CRAWLER_ALWAYS_ALLOW,
      },
      {
        userAgent: "AdsBot-Google-Mobile",
        allow: CRAWLER_ALWAYS_ALLOW,
      },
      {
        userAgent: "Googlebot",
        allow: CRAWLER_ALWAYS_ALLOW,
        disallow: PRIVATE_DISALLOW,
      },
    ],
    // Do not set `host` — a bad Host line previously broke AdSense crawls (`Host: ttps`).
    sitemap: `${origin}/sitemap.xml`,
  };
}
