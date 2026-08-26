import { sitemapXmlResponse } from "@/lib/sitemap-xml";

/** Must be dynamic so locs match the Host AdSense/Google actually crawl. */
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return sitemapXmlResponse({ host: new URL(request.url).host });
}
