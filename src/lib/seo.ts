import type { Metadata } from "next";

/** Primary brand string — use in titles, JSON-LD, and copy. */
export const SITE_NAME = "Shirwell Bancan";

/** Short alternate brand form for keywords / alternateName. */
export const SITE_NAME_SHORT = "Shirwell";

/** Primary Google Search targets */
export const SEO_KEYWORDS = [
  "shirwell music",
  "shirwell",
  "shirwell bancan",
  "Shirwell Music",
  "Shirwell Bancan",
  "Shirwell Bancan music",
  "Shirwell songs",
  "Shirwell official",
  "stream Shirwell",
  "listen to Shirwell Bancan",
] as const;

export const HOME_PATH = "/home";

export const DEFAULT_TITLE =
  "Shirwell Music | Shirwell Bancan — Official Site";

export const HOME_TITLE =
  "Shirwell | Shirwell Bancan — Official Music & Songs";

export const MUSIC_PAGE_TITLE = "Shirwell Music — Stream Songs Online";

export const DEFAULT_DESCRIPTION =
  "Shirwell music by Shirwell Bancan — official site to stream original songs, watch videos, and discover 45 years of music from Shirwell.";

/** Home page meta description (leads with brand). */
export const HOME_DESCRIPTION =
  "Shirwell and Shirwell Bancan — official home for Shirwell music. Stream songs, explore new releases, and listen online.";

export const MUSIC_PAGE_DESCRIPTION =
  "Shirwell music player — stream Shirwell Bancan songs online. Listen to the full Shirwell catalogue with the official music player.";

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
  "YXnOZtZE3DI66I3y8cSj8Eu3iBGccXzKSN2PggjeESI";

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
  const ogTitle = DEFAULT_TITLE;

  return {
    metadataBase: base,
    title: {
      default: DEFAULT_TITLE,
      template: `%s | Shirwell Bancan`,
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    appleWebApp: {
      title: "Shirwell Music",
    },
    keywords: [...SEO_KEYWORDS],
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
      url: `${base.origin}${HOME_PATH}`,
      siteName: SITE_NAME,
      title: ogTitle,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: `${SITE_NAME} — Shirwell music`,
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
  const webPageId = `${origin}${HOME_PATH}#home`;
  const sameAs = parseSameAsEnv();

  const musicGroup: Record<string, unknown> = {
    "@type": "MusicGroup",
    "@id": artistId,
    name: SITE_NAME,
    alternateName: [
      SITE_NAME_SHORT,
      "Shirwell Bancan",
      "Shirwell music",
      "Shirwell Music",
    ],
    description: DEFAULT_DESCRIPTION,
    url: origin,
    genre: ["Rock", "Pop", "Original"],
    keywords: SEO_KEYWORDS.join(", "),
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
          "Shirwell music",
          "Shirwell Music",
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
        url: `${origin}${HOME_PATH}`,
        name: HOME_TITLE,
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

/** JSON-LD for `/music` — targets “shirwell music” searches. */
export function getMusicPageJsonLd(): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const artistId = `${origin}/#shirwell-bancan`;
  const websiteId = `${origin}/#website`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${origin}/music#webpage`,
    name: MUSIC_PAGE_TITLE,
    description: MUSIC_PAGE_DESCRIPTION,
    url: `${origin}/music`,
    inLanguage: "en-AU",
    isPartOf: { "@id": websiteId },
    about: { "@id": artistId },
    keywords: "shirwell music, shirwell, shirwell bancan",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/about/shirwell-music-hero.png"),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Shirwell",
          item: `${origin}${HOME_PATH}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Shirwell Music",
          item: `${origin}/music`,
        },
      ],
    },
  };
}
