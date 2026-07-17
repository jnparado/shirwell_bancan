import { sitemapXmlResponse } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = 3600;

/** Same XML as `/sitemap.xml` — for GSC submissions at `/sitemap`. */
export function GET() {
  return sitemapXmlResponse();
}
