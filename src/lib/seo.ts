import type { Metadata } from "next";

/** Primary brand string — use in titles, JSON-LD, and copy. */
export const SITE_NAME = "Shirwell Bancan";

/** Short alternate brand form for keywords / alternateName. */
export const SITE_NAME_SHORT = "Shirwell";

export const DEFAULT_DESCRIPTION =
  "Shirwell Bancan singer songwriter producer — official site. Explore original songs, videos, and new releases from Shirwell Bancan.";

/** Home page meta description (leads with brand). */
export const HOME_DESCRIPTION =
  "Shirwell Bancan singer songwriter producer — explore songs, videos, and new releases. Listen online.";

/** Hero / social share image (under `public/`) */
export const DEFAULT_OG_IMAGE = "/shirwell-hero.png";

/**
 * Canonical site URL for metadataBase, sitemap, and JSON-LD.
 *
 * Priority:
 * 1. `NEXT_PUBLIC_SITE_URL` — set this to your final domain (e.g. `https://shirwell.com`).
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel’s stable production host (cleaner than preview URLs).
 * 3. `VERCEL_URL` — **preview** deploys get long URLs like `…-r4t334j9r-….vercel.app`; that’s normal.
 *
 * Google Search Console: `GOOGLE_SITE_VERIFICATION` = HTML tag `content` from Google.
 */
export const GOOGLE_SITE_VERIFICATION_TOKEN =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
  "q3SASLjj8P7aTB8EAg-JfkBlZVNXu_evfbxcCg4gc3E";

function tryParseSiteUrl(value: string): URL | null {
  const v = value.trim();
  if (!v) return null;
  try {
    const withProtocol =
      v.startsWith("http://") || v.startsWith("https://")
        ? v
        : `https://${v.replace(/^\/+/, "").replace(/\/$/, "")}`;
    const u = new URL(withProtocol);
    return new URL(u.origin);
  } catch {
    return null;
  }
}

export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    const u = tryParseSiteUrl(explicit);
    if (u) return u;
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) {
    const u = tryParseSiteUrl(vercelProduction);
    if (u) return u;
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return new URL("http://localhost:3000");
}

export function absoluteUrl(path: string): string {
  const origin = getSiteUrl().origin;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

export function createRootMetadata(): Metadata {
  const base = getSiteUrl();
  const ogTitle = `${SITE_NAME} singer songwriter producer`;

  return {
    metadataBase: base,
    title: {
      default: ogTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    appleWebApp: {
      title: SITE_NAME,
    },
    keywords: [
      SITE_NAME,
      "shirwell bancan",
      "singer songwriter producer",
      "Shirwell Bancan singer songwriter producer",
      `${SITE_NAME} songs`,
      `${SITE_NAME} official`,
      `${SITE_NAME} website`,
      "Shirwell Bancan official site",
      "listen to Shirwell Bancan",
      SITE_NAME_SHORT,
      "Shirwell artist",
      "Bancan",
      "original songs",
      "streaming",
      "singer songwriter",
      "producer",
      "Australian musician",
      "New South Wales",
      "Australia",
    ],
    authors: [{ name: SITE_NAME, url: base.href }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url: base,
      siteName: SITE_NAME,
      title: ogTitle,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: `${SITE_NAME} — singer songwriter producer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: DEFAULT_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
    icons: {
      icon: "/shirwell-logo.png",
      apple: "/shirwell-logo.png",
    },
    category: "entertainment",
    verification: {
      google: GOOGLE_SITE_VERIFICATION_TOKEN,
    },
  };
}

/** Comma-separated profile URLs for JSON-LD `sameAs` (Spotify, YouTube, Instagram, etc.). */
function parseSameAsEnv(): string[] {
  const raw = process.env.NEXT_PUBLIC_SAME_AS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("http"));
}

/** JSON-LD: MusicGroup + WebSite + WebPage + SearchAction (helps Google connect brand ↔ URL). */
export function getOrganizationWebsiteJsonLd(): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const logo = absoluteUrl("/shirwell-logo.png");
  const hero = absoluteUrl(DEFAULT_OG_IMAGE);
  const artistId = `${origin}/#shirwell-bancan`;
  const websiteId = `${origin}/#website`;
  const webPageId = `${origin}/#home`;
  const sameAs = parseSameAsEnv();

  const musicGroup: Record<string, unknown> = {
    "@type": "MusicGroup",
    "@id": artistId,
    name: SITE_NAME,
    alternateName: [SITE_NAME_SHORT, "Shirwell Bancan"],
    description: DEFAULT_DESCRIPTION,
    url: origin,
    logo: {
      "@type": "ImageObject",
      url: logo,
      caption: `${SITE_NAME} logo`,
    },
    image: hero,
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
  };
  if (sameAs.length > 0) {
    musicGroup.sameAs = sameAs;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      musicGroup,
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        alternateName: [
          `${SITE_NAME} official website`,
          "Shirwell Bancan",
        ],
        url: origin,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-AU",
        publisher: { "@id": artistId },
        about: { "@id": artistId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: origin,
        name: `${SITE_NAME} singer songwriter producer`,
        description: HOME_DESCRIPTION,
        isPartOf: { "@id": websiteId },
        about: { "@id": artistId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: hero,
        },
      },
    ],
  };
}
