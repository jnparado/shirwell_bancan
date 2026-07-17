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
  "Shirwell Music | Shirwell Bancan — Official Site";

export const MUSIC_PAGE_TITLE = "Shirwell Music — Stream Shirwell Bancan Songs";

export const DEFAULT_DESCRIPTION =
  "Shirwell music by Shirwell Bancan — official site to stream original songs, watch videos, and discover 45 years of music from Shirwell.";

/** Home page meta description (leads with brand). */
export const HOME_DESCRIPTION =
  "Shirwell music by Shirwell Bancan — the official Shirwell site. Stream songs, explore new releases, and listen to original music online.";

export const MUSIC_PAGE_DESCRIPTION =
  "Shirwell music player — stream Shirwell Bancan songs online. Listen to the full Shirwell catalogue with the official Shirwell music player.";

/** Minimal song shape for JSON-LD (avoids importing Supabase-backed module). */
export type SeoSong = {
  id: string;
  title: string | null;
  artist?: string | null;
  audio_url?: string | null;
  cover_image?: string | null;
};

/** Primary keyword targets — reuse in page metadata. */
export const PRIMARY_KEYWORDS = [
  "shirwell music",
  "shirwell",
  "shirwell bancan",
] as const;

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
  const personId = `${origin}/#person`;
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
    url: `${origin}${HOME_PATH}`,
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
    founder: { "@id": personId },
  };
  if (sameAs.length > 0) {
    musicGroup.sameAs = sameAs;
  }

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: SITE_NAME,
    alternateName: [SITE_NAME_SHORT, "Shirwell music", "Shirwell Music"],
    url: `${origin}${HOME_PATH}`,
    jobTitle: "Singer, Songwriter, Producer",
    description: DEFAULT_DESCRIPTION,
    image: hero,
    knowsAbout: ["Shirwell music", "Original songs", "Live performance"],
  };
  if (sameAs.length > 0) {
    person.sameAs = sameAs;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
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
        keywords: PRIMARY_KEYWORDS.join(", "),
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
export function getMusicPageJsonLd(songs: SeoSong[] = []): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const artistId = `${origin}/#shirwell-bancan`;
  const websiteId = `${origin}/#website`;
  const musicUrl = `${origin}/music`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${musicUrl}#webpage`,
      name: MUSIC_PAGE_TITLE,
      description: MUSIC_PAGE_DESCRIPTION,
      url: musicUrl,
      inLanguage: "en-AU",
      isPartOf: { "@id": websiteId },
      about: { "@id": artistId },
      keywords: PRIMARY_KEYWORDS.join(", "),
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
            item: musicUrl,
          },
        ],
      },
    },
    ...buildMusicRecordingNodes(songs, musicUrl, artistId),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** MusicRecording nodes for catalogue pages — helps Google connect songs to Shirwell Bancan. */
function buildMusicRecordingNodes(
  songs: SeoSong[],
  listenUrl: string,
  artistId: string,
): Record<string, unknown>[] {
  return songs
    .filter((s) => s.title?.trim())
    .slice(0, 20)
    .map((song) => {
      const recording: Record<string, unknown> = {
        "@type": "MusicRecording",
        "@id": `${listenUrl}#recording-${song.id}`,
        name: song.title!.trim(),
        url: listenUrl,
        byArtist: { "@id": artistId },
        potentialAction: {
          "@type": "ListenAction",
          target: listenUrl,
        },
      };
      if (song.cover_image) {
        recording.image = song.cover_image;
      }
      return recording;
    });
}

/** FAQ schema for brand searches (“who is Shirwell Bancan”, “Shirwell music”). */
export function getBrandFaqJsonLd(): Record<string, unknown> {
  const origin = getSiteUrl().origin;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Shirwell Bancan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${SITE_NAME} is a singer, songwriter, and producer with more than 45 years of original Shirwell music. This is the official Shirwell site.`,
        },
      },
      {
        "@type": "Question",
        name: "Where can I listen to Shirwell music?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Stream Shirwell music on the official player at ${origin}/music. All songs are written and owned by ${SITE_NAME}.`,
        },
      },
      {
        "@type": "Question",
        name: "What is Shirwell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Shirwell is the music brand of ${SITE_NAME} — original songs, live performance, and the official Shirwell music catalogue online.`,
        },
      },
    ],
  };
}

/** Home page catalogue list for “shirwell music” entity signals. */
export function getHomeCatalogueJsonLd(songs: SeoSong[]): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const artistId = `${origin}/#shirwell-bancan`;
  const musicUrl = `${origin}/music`;

  const itemListElement = songs
    .filter((s) => s.title?.trim())
    .slice(0, 12)
    .map((song, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: song.title!.trim(),
      url: musicUrl,
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${origin}${HOME_PATH}#featured-songs`,
        name: "Shirwell Music — featured songs by Shirwell Bancan",
        description: HOME_DESCRIPTION,
        numberOfItems: itemListElement.length,
        itemListElement,
      },
      ...buildMusicRecordingNodes(songs, musicUrl, artistId),
    ],
  };
}

/** About page JSON-LD. */
export function getAboutPageJsonLd(): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const artistId = `${origin}/#shirwell-bancan`;
  const websiteId = `${origin}/#website`;

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${origin}/about#about`,
    name: `About Shirwell Bancan — Shirwell Music`,
    description: `About ${SITE_NAME} — 45 years of original Shirwell music.`,
    url: `${origin}/about`,
    inLanguage: "en-AU",
    isPartOf: { "@id": websiteId },
    about: { "@id": artistId },
    keywords: PRIMARY_KEYWORDS.join(", "),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/about/shirwell-bancan-poster.png"),
    },
  };
}
