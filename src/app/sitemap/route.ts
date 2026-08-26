import { sitemapXmlResponse } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

/** Same XML as `/sitemap.xml` — for GSC submissions at `/sitemap`. */
export function GET(request: Request) {
  return sitemapXmlResponse({ host: new URL(request.url).host });
}
