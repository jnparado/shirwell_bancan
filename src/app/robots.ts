import type { MetadataRoute } from "next";
import { getSitemapOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const origin = getSitemapOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        // Explicit allows so ads.txt is never blocked by a broader Disallow.
        allow: ["/", "/ads.txt", "/app-ads.txt"],
        disallow: [
          "/library",
          "/auth/",
          "/oauth/",
          "/profile",
          "/admin",
          "/products/cart",
          "/login",
          "/signup",
        ],
      },
      {
        userAgent: "Mediapartners-Google",
        allow: ["/", "/ads.txt", "/app-ads.txt"],
      },
      {
        userAgent: "AdsBot-Google",
        allow: ["/", "/ads.txt", "/app-ads.txt"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
