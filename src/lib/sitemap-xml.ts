import { JOURNAL_ARTICLES } from "@/lib/journal-articles";
import { NEWSLETTER_ISSUES } from "@/lib/newsletter-issues";
import { STORE_PRODUCTS } from "@/lib/products";
import { getSitemapOrigin, SITEMAP_PUBLIC_PATHS } from "@/lib/seo";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Build a standards-compliant XML sitemap (never HTML). */
export function buildSitemapXml(): string {
  const origin = getSitemapOrigin();
  const lastmod = new Date().toISOString();

  const journalUrls = JOURNAL_ARTICLES.map(
    (article) => `  <url>
    <loc>${escapeXml(`${origin}/journal/${article.slug}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.55</priority>
  </url>`,
  );

  const newsletterUrls = NEWSLETTER_ISSUES.map(
    (issue) => `  <url>
    <loc>${escapeXml(`${origin}/newsletter/${issue.id}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`,
  );

  const productUrls = STORE_PRODUCTS.map(
    (product) => `  <url>
    <loc>${escapeXml(`${origin}/products/${product.slug}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.45</priority>
  </url>`,
  );

  const urls = [
    ...SITEMAP_PUBLIC_PATHS.map(
      ({ path, changeFrequency, priority }) => `  <url>
    <loc>${escapeXml(`${origin}${path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    ),
    ...newsletterUrls,
    ...journalUrls,
    ...productUrls,
  ].join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function sitemapXmlResponse(): Response {
  return new Response(buildSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
