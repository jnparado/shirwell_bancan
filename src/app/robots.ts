import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl().origin;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/library"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
