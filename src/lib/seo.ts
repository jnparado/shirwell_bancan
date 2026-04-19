import type { Metadata } from "next";

/** Primary brand string — use in titles, JSON-LD, and copy. */
export const SITE_NAME = "Shirwell Bancan";

/** Short alternate brand form for keywords / alternateName. */
export const SITE_NAME_SHORT = "Shirwell";

export const DEFAULT_DESCRIPTION =
  "Shirwell Bancan — official site for music and flowers. Stream original songs and songwriting from Shirwell Bancan; roses and florals via Nati Roses (weddings, funerals, occasions).";

/** Home page meta description (leads with brand). */
export const HOME_DESCRIPTION =
  "Shirwell Bancan: stream original music, featured tracks, and decades of songwriting. Shop roses and special bundles — flowers through Nati Roses, NSW.";

/** Hero / social share image (under `public/`) */
export const DEFAULT_OG_IMAGE = "/shirwell-hero.png";

/**
 * Canonical site URL for metadataBase, sitemap, and JSON-LD.
 * Set in production: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (no trailing slash).
 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const normalized = raw.endsWith("/") ? raw.slice(0, -1) : raw;
      return new URL(normalized);
    } catch {
      // fall through
    }
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
      `${SITE_NAME} music`,
      `${SITE_NAME} songs`,
      `${SITE_NAME} official`,
      SITE_NAME_SHORT,
      "Shirwell music",
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
        alternateName: `${SITE_NAME} official website`,
        url: origin,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-AU",
        publisher: { "@id": artistId },
        about: { "@id": artistId },
      },
    ],
  };
}
