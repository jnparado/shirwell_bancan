import type { MetadataRoute } from "next";
import { getSitemapOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const origin = getSitemapOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/library", "/auth/", "/oauth/", "/profile"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
