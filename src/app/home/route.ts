import { NextResponse } from "next/server";
import type { MetadataRoute } from "next";
import sitemap from "@/app/sitemap";

function toIsoDate(d: Date): string {
  // Sitemap uses date or datetime; datetime is fine.
  return d.toISOString();
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderSitemapXml(items: MetadataRoute.Sitemap): string {
  const urls = items
    .map((it) => {
      const loc = escapeXml(it.url);
      const lastmod =
        it.lastModified instanceof Date
          ? `<lastmod>${escapeXml(toIsoDate(it.lastModified))}</lastmod>`
          : it.lastModified
            ? `<lastmod>${escapeXml(String(it.lastModified))}</lastmod>`
            : "";
      const changefreq = it.changeFrequency
        ? `<changefreq>${escapeXml(String(it.changeFrequency))}</changefreq>`
        : "";
      const priority =
        typeof it.priority === "number"
          ? `<priority>${it.priority.toFixed(2)}</priority>`
          : "";
      return `<url><loc>${loc}</loc>${lastmod}${changefreq}${priority}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls +
    `</urlset>`;
}

/**
 * Google Search Console sometimes gets the sitemap URL wrong (e.g. `/home`).
 * This endpoint makes `/home` return a valid sitemap XML so it can be fetched.
 *
 * Preferred sitemap URL remains: `/sitemap.xml`
 */
export async function GET() {
  const items = sitemap();
  const xml = renderSitemapXml(items);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

