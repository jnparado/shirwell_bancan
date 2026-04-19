import type { Metadata } from "next";

/** Primary brand string — use in titles, JSON-LD, and copy. */
export const SITE_NAME = "Shirwell Bancan";

/** Short alternate brand form for keywords / alternateName. */
export const SITE_NAME_SHORT = "Shirwell";

export const DEFAULT_DESCRIPTION =
  "Shirwell Bancan — official site for music and flowers. Stream original songs and songwriting from Shirwell Bancan; roses and florals via Nati Roses (weddings, funerals, occasions).";

/** Home page meta description (leads with brand). */
export const HOME_DESCRIPTION =
  "Shirwell Bancan official site — Shirwell music streaming, songs, and new releases. Listen to Shirwell Bancan online. Flowers + Nati Roses, NSW.";

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
  const ogTitle = `${SITE_NAME} — Music & Flowers`;

  const googleVerify = process.env.GOOGLE_SITE_VERIFICATION?.trim();

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
      "shirwell music",
      `${SITE_NAME} music`,
      `${SITE_NAME} songs`,
      `${SITE_NAME} official`,
      `${SITE_NAME} website`,
      "Shirwell Bancan official site",
      "listen to Shirwell Bancan",
      SITE_NAME_SHORT,
      "Shirwell artist",
      "Bancan",
      "original music",
      "streaming",
      "singer songwriter",
      "Australian musician",
      "flowers",
      "roses",
      "Nati Roses",
      "Middle Dural",
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
          alt: `${SITE_NAME} — music and flowers`,
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
    category: "music",
    ...(googleVerify
      ? {
          verification: {
            google: googleVerify,
          },
        }
      : {}),
  };
}

/** JSON-LD: Shirwell Bancan as MusicGroup (solo artist) + WebSite. */
export function getOrganizationWebsiteJsonLd(): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const logo = absoluteUrl("/shirwell-logo.png");
  const artistId = `${origin}/#shirwell-bancan`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        "@id": artistId,
        name: SITE_NAME,
        alternateName: SITE_NAME_SHORT,
        description: DEFAULT_DESCRIPTION,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: logo,
          caption: `${SITE_NAME} logo`,
        },
        areaServed: {
          "@type": "Country",
          name: "Australia",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE_NAME,
        alternateName: [
          `${SITE_NAME} official website`,
          "Shirwell music",
          "Shirwell Bancan music",
        ],
        url: origin,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-AU",
        publisher: { "@id": artistId },
        about: { "@id": artistId },
      },
    ],
  };
}
