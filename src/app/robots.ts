import type { MetadataRoute } from "next";
import { getSitemapOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const origin = getSitemapOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
