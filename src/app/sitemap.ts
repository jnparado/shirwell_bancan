import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

/** Always pre-render at build — Google must fetch without runtime errors. */
export const dynamic = "force-static";

/** Public marketing pages to include in the sitemap (auth/profile excluded). */
const PUBLIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/home", changeFrequency: "weekly", priority: 1 },
  { path: "/music", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/music-owner", changeFrequency: "yearly", priority: 0.4 },
  { path: "/cds", changeFrequency: "monthly", priority: 0.5 },
  { path: "/products", changeFrequency: "monthly", priority: 0.5 },
  { path: "/flowers", changeFrequency: "monthly", priority: 0.45 },
  { path: "/flower", changeFrequency: "monthly", priority: 0.45 },
  { path: "/newsletter", changeFrequency: "weekly", priority: 0.45 },
  { path: "/search", changeFrequency: "monthly", priority: 0.4 },
  { path: "/premium", changeFrequency: "monthly", priority: 0.35 },
  { path: "/support", changeFrequency: "yearly", priority: 0.35 },
  { path: "/legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl().origin;
  const lastModified = new Date();

  return PUBLIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${origin}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
