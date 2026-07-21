import type { Metadata } from "next";

/** Primary brand string — use in titles, JSON-LD, and copy. */
export const SITE_NAME = "Shirwell Bancan";

/** Short alternate brand form for keywords / alternateName. */
export const SITE_NAME_SHORT = "Shirwell";

/** Top three Google Search targets — use in titles, H1s, and meta descriptions. */
export const PRIMARY_SEARCH_TERMS = [
  "shirwell bancan",
  "shirwell",
  "shirwell music",
] as const;

/** Primary Google Search targets */
export const SEO_KEYWORDS = [
  ...PRIMARY_SEARCH_TERMS,
  "Shirwell Music",
  "Shirwell Bancan",
  "Shirwell Bancan music",
  "Shirwell songs",
  "Shirwell official",
  "Shirwell",
  "listen to Shirwell Bancan",
] as const;

export const HOME_PATH = "/home";

/** Google + social share title — brand first for search results. */
export const SOCIAL_TITLE = "Shirwell Bancan";

export const DEFAULT_TITLE = "Shirwell Bancan | Shirwell Music";

export const HOME_TITLE = DEFAULT_TITLE;

export const MUSIC_PAGE_TITLE =
  "Shirwell Music — Stream Shirwell Bancan Songs Online";

export const DEFAULT_DESCRIPTION =
  "Shirwell Bancan — singer, songwriter, and producer. Official Shirwell music site with 45 years of original songs. Stream Shirwell Bancan online.";

/** Home page meta description — brand first for Google snippets. */
export const HOME_DESCRIPTION = DEFAULT_DESCRIPTION;

export const MUSIC_PAGE_DESCRIPTION =
  "Shirwell music — stream Shirwell Bancan songs online. Listen to the full Shirwell catalogue with the official Shirwell music player.";

/** Logo / favicon — Shirwell Bancan poster (Google search icon + JSON-LD). */
export const SITE_LOGO_PATH = "/about/shirwell-bancan-poster.png";

export const SITE_FAVICON_PATH = "/shirwell-bancan-icon.png";

/** Social / Google thumbnail — Shirwell Bancan poster (gold circle, horse). */
export const DEFAULT_OG_IMAGE = SITE_LOGO_PATH;

export const DEFAULT_OG_IMAGE_ALT =
  "Shirwell Bancan — Experience 45 Years of Original Songs";

/** FAQ copy — reused in visible home content and FAQPage JSON-LD. */
export const BRAND_FAQ = [
  {
    question: "Who is Shirwell Bancan?",
    answer:
      "Shirwell Bancan is a singer, songwriter, and producer with more than 45 years of original music. This website is the official home for Shirwell Bancan — stream songs, explore releases, and learn about Shirwell music.",
  },
  {
    question: "What is Shirwell music?",
    answer:
      "Shirwell music is the original song catalogue written and performed by Shirwell Bancan. Listen on the Shirwell music player at /music, browse featured tracks on the home page, or stream the full catalogue online.",
  },
  {
    question: "Where can I listen to Shirwell Bancan songs online?",
    answer:
      "Stream Shirwell Bancan songs free on the official Shirwell music player at /music. Featured Shirwell tracks are also on the home page — press play on any song card.",
  },
  {
    question: "Is this the official Shirwell website?",
    answer:
      "Yes. This is the official Shirwell Bancan website for Shirwell music — original songs, news, CDs, and the full streaming player.",
  },
] as const;

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

/** Stable production origin — used when env vars are missing at build/runtime. */
export const PRODUCTION_SITE_URL = "https://shirwell-bancan.vercel.app";

/** Public pages listed in `/sitemap.xml` (XML route — not HTML). */
export const SITEMAP_PUBLIC_PATHS = [
  { path: "/home", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/music", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/about", changeFrequency: "yearly" as const, priority: 0.5 },
  { path: "/music-owner", changeFrequency: "yearly" as const, priority: 0.4 },
  { path: "/cds", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/products", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/flowers", changeFrequency: "monthly" as const, priority: 0.45 },
  { path: "/flower", changeFrequency: "monthly" as const, priority: 0.45 },
  { path: "/newsletter", changeFrequency: "weekly" as const, priority: 0.45 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.4 },
  { path: "/search", changeFrequency: "monthly" as const, priority: 0.4 },
  { path: "/premium", changeFrequency: "monthly" as const, priority: 0.35 },
  { path: "/support", changeFrequency: "yearly" as const, priority: 0.35 },
  { path: "/policies", changeFrequency: "yearly" as const, priority: 0.35 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/legal", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
] as const;

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

  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    const fallback = tryParseSiteUrl(PRODUCTION_SITE_URL);
    if (fallback) return fallback;
  }

  return new URL("http://localhost:3000");
}

/** Origin for sitemap/robots — never emits localhost on production. */
export function getSitemapOrigin(): string {
  const origin = getSiteUrl().origin;
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return PRODUCTION_SITE_URL;
  }
  return origin;
}

export function absoluteUrl(path: string): string {
  const origin = getSiteUrl().origin;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

/** Shared Open Graph + Twitter fields — matches Social Metatags preview. */
export function createSocialMetadata(
  overrides: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    imageAlt?: string;
  } = {},
): Pick<Metadata, "openGraph" | "twitter"> {
  const title = overrides.title ?? SOCIAL_TITLE;
  const description = overrides.description ?? DEFAULT_DESCRIPTION;
  const image = overrides.image ?? DEFAULT_OG_IMAGE;
  const imageAlt = overrides.imageAlt ?? DEFAULT_OG_IMAGE_ALT;

  return {
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AU",
      url: overrides.url ?? HOME_PATH,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function createRootMetadata(): Metadata {
  const base = getSiteUrl();
  const social = createSocialMetadata({ url: `${base.origin}${HOME_PATH}` });

  return {
    metadataBase: base,
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    appleWebApp: {
      title: SITE_NAME,
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
      ...social.openGraph,
      url: `${base.origin}${HOME_PATH}`,
    },
    twitter: social.twitter,
    icons: {
      icon: [
        { url: SITE_FAVICON_PATH, sizes: "512x512", type: "image/png" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: SITE_LOGO_PATH, sizes: "682x682", type: "image/png" },
      ],
      apple: [{ url: SITE_FAVICON_PATH, sizes: "180x180", type: "image/png" }],
      shortcut: SITE_FAVICON_PATH,
    },
    category: "entertainment",
    alternates: {
      canonical: HOME_PATH,
      types: {
        "application/xml": "/sitemap.xml",
      },
    },
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
  const logo = absoluteUrl(SITE_LOGO_PATH);
  const favicon = absoluteUrl(SITE_FAVICON_PATH);
  const hero = absoluteUrl(DEFAULT_OG_IMAGE);
  const artistId = `${origin}/#shirwell-bancan`;
  const websiteId = `${origin}/#website`;
  const webPageId = `${origin}${HOME_PATH}#home`;
  const sameAs = parseSameAsEnv();

  const musicGroup: Record<string, unknown> = {
    "@type": ["MusicGroup", "Person"],
    "@id": artistId,
    name: SITE_NAME,
    alternateName: [
      SITE_NAME_SHORT,
      "Shirwell Bancan",
      "Shirwell music",
      "Shirwell Music",
      "Shirwell Bancan music",
    ],
    description: DEFAULT_DESCRIPTION,
    url: `${origin}${HOME_PATH}`,
    jobTitle: "Singer-Songwriter",
    knowsAbout: ["Music", "Songwriting", "Original songs", "Shirwell music"],
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
          "Shirwell",
          "Shirwell music",
          "Shirwell Music",
        ],
        url: `${origin}${HOME_PATH}`,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-AU",
        publisher: { "@id": artistId },
        about: { "@id": artistId },
        mainEntity: { "@id": artistId },
        logo: {
          "@type": "ImageObject",
          url: favicon,
          caption: `${SITE_NAME} logo`,
        },
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

type SongForSeo = {
  title: string | null;
  artist: string | null;
};

function buildMusicRecordingItems(
  songs: SongForSeo[],
  artistId: string,
  musicPageUrl: string,
): Record<string, unknown>[] {
  return songs
    .filter((song) => song.title?.trim())
    .slice(0, 20)
    .map((song) => ({
      "@type": "MusicRecording",
      name: song.title!.trim(),
      byArtist: { "@id": artistId },
      inLanguage: "en-AU",
      url: musicPageUrl,
      ...(song.artist?.trim()
        ? { performer: { "@type": "MusicGroup", name: song.artist.trim() } }
        : {}),
    }));
}

function buildFaqMainEntity(): Record<string, unknown>[] {
  return BRAND_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));
}

/** FAQPage JSON-LD — can appear as rich results for brand searches. */
export function getBrandFaqJsonLd(pageUrl: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: buildFaqMainEntity(),
  };
}

/** JSON-LD for `/home` — brand page + featured Shirwell music catalogue. */
export function getHomePageJsonLd(songs: SongForSeo[]): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const artistId = `${origin}/#shirwell-bancan`;
  const websiteId = `${origin}/#website`;
  const homeUrl = `${origin}${HOME_PATH}`;
  const musicPageUrl = `${origin}/music`;
  const recordings = buildMusicRecordingItems(songs, artistId, musicPageUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#home`,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        url: homeUrl,
        inLanguage: "en-AU",
        isPartOf: { "@id": websiteId },
        about: { "@id": artistId },
        keywords: PRIMARY_SEARCH_TERMS.join(", "),
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(DEFAULT_OG_IMAGE),
        },
        mainEntity: { "@id": `${homeUrl}#faq` },
      },
      {
        "@type": "FAQPage",
        "@id": `${homeUrl}#faq`,
        mainEntity: buildFaqMainEntity(),
      },
      {
        "@type": "ItemList",
        "@id": `${homeUrl}#featured-songs`,
        name: "Shirwell Music — Featured Songs by Shirwell Bancan",
        description:
          "Featured Shirwell music tracks by Shirwell Bancan available to stream online.",
        numberOfItems: recordings.length,
        itemListElement: recordings.map((recording, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: recording,
        })),
      },
    ],
  };
}

/** JSON-LD for `/music` — targets “shirwell music” searches. */
export function getMusicPageJsonLd(songs: SongForSeo[]): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const artistId = `${origin}/#shirwell-bancan`;
  const websiteId = `${origin}/#website`;
  const musicPageUrl = `${origin}/music`;
  const recordings = buildMusicRecordingItems(songs, artistId, musicPageUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${musicPageUrl}#webpage`,
        name: MUSIC_PAGE_TITLE,
        description: MUSIC_PAGE_DESCRIPTION,
        url: musicPageUrl,
        inLanguage: "en-AU",
        isPartOf: { "@id": websiteId },
        about: { "@id": artistId },
        keywords: PRIMARY_SEARCH_TERMS.join(", "),
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(DEFAULT_OG_IMAGE),
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
              item: musicPageUrl,
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "@id": `${musicPageUrl}#song-list`,
        name: "Shirwell Music Catalogue",
        description: "Stream Shirwell Bancan songs — the official Shirwell music catalogue.",
        numberOfItems: recordings.length,
        itemListElement: recordings.map((recording, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: recording,
        })),
      },
    ],
  };
}
