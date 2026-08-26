import type { MetadataRoute } from "next";
import { getSitemapOrigin } from "@/lib/seo";

/** Paths Google must always be allowed to fetch for ads + indexing. */
const CRAWLER_ALWAYS_ALLOW = ["/", "/ads.txt", "/app-ads.txt", "/robots.txt", "/sitemap.xml"];

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

export default function robots(): MetadataRoute.Robots {
  const origin = getSitemapOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: CRAWLER_ALWAYS_ALLOW,
        disallow: PRIVATE_DISALLOW,
      },
      // AdSense / AdMob ad crawlers — full public access, never block ads.txt
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
    sitemap: `${origin}/sitemap.xml`,
    host: origin.replace(/^https?:\/\//, ""),
  };
}
