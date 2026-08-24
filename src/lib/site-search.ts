import type { Song } from "@/types/song";

export type SiteSearchPage = {
  href: string;
  title: string;
  description: string;
  keywords: string[];
};

/** Static pages indexed for on-site search (AdSense / navigation quality). */
export const SEARCHABLE_PAGES: SiteSearchPage[] = [
  {
    href: "/home",
    title: "Home",
    description: "Featured Shirwell Bancan songs and news.",
    keywords: ["home", "featured", "songs"],
  },
  {
    href: "/music",
    title: "Music player",
    description: "Stream Shirwell Bancan songs online.",
    keywords: ["music", "player", "stream", "listen"],
  },
  {
    href: "/about",
    title: "About Shirwell Bancan",
    description: "Biography and story — 45 years of original music.",
    keywords: ["about", "biography", "story", "artist"],
  },
  {
    href: "/discography",
    title: "Discography",
    description: "Track-by-track guide to Black Horse and the Shirwell catalogue.",
    keywords: ["discography", "album", "tracks", "black horse", "songs"],
  },
  {
    href: "/listening-guide",
    title: "Listening guide",
    description: "Where to start with Shirwell Bancan music — curated listening path.",
    keywords: ["listening", "guide", "start", "catalogue", "black horse"],
  },
  {
    href: "/faq",
    title: "FAQ",
    description: "Frequently asked questions about Shirwell music and this site.",
    keywords: ["faq", "questions", "help", "ads", "premium"],
  },
  {
    href: "/cds",
    title: "CD's & vinyl",
    description: "Black Horse and physical releases.",
    keywords: ["cd", "vinyl", "album", "black horse", "record"],
  },
  {
    href: "/products",
    title: "Products",
    description: "Official Shirwell merchandise and releases.",
    keywords: ["products", "store", "merch", "coffee"],
  },
  {
    href: "/flowers",
    title: "Flowers",
    description: "Nati Roses for weddings, funerals, and occasions.",
    keywords: ["flowers", "roses", "nati", "florist", "wedding"],
  },
  {
    href: "/flower",
    title: "Flower orders",
    description: "Order flowers through Nati Roses.",
    keywords: ["flower", "order", "roses"],
  },
  {
    href: "/newsletter",
    title: "Newsletter",
    description: "News and updates from Shirwell Bancan.",
    keywords: ["newsletter", "news", "updates"],
  },
  {
    href: "/premium",
    title: "Premium",
    description: "Unlimited streaming and member benefits.",
    keywords: ["premium", "subscribe", "subscription"],
  },
  {
    href: "/support",
    title: "Support",
    description: "Help with the website and Shirwell Music app.",
    keywords: ["support", "help", "contact", "faq"],
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Email Shirwell Entertainment.",
    keywords: ["contact", "email", "enquiries", "booking"],
  },
  {
    href: "/music-owner",
    title: "Music owner",
    description: "Copyright and ownership statement.",
    keywords: ["copyright", "owner", "rights", "licensing"],
  },
  {
    href: "/policies",
    title: "Publication policies",
    description: "Terms of Service and Privacy Policy URLs.",
    keywords: ["policies", "terms", "privacy", "publisher"],
  },
  {
    href: "/terms",
    title: "Terms of Service",
    description: "Terms for using Shirwell Bancan services.",
    keywords: ["terms", "terms of service", "legal"],
  },
  {
    href: "/privacy",
    title: "Privacy policy",
    description: "How we handle data, cookies, and ads.",
    keywords: ["privacy", "cookies", "adsense", "data"],
  },
  {
    href: "/legal",
    title: "Legal",
    description: "Terms, copyright, and site rules.",
    keywords: ["legal", "terms", "copyright"],
  },
];

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query);
}

export function searchSite(query: string, songs: Song[]) {
  const q = normalizeQuery(query);
  if (!q) {
    return { pages: [] as SiteSearchPage[], songs: [] as Song[] };
  }

  const pages = SEARCHABLE_PAGES.filter(
    (page) =>
      matchesQuery(page.title, q) ||
      matchesQuery(page.description, q) ||
      page.keywords.some((k) => matchesQuery(k, q)),
  );

  const matchedSongs = songs.filter((song) => {
    const title = song.title ?? "";
    const desc = song.desc ?? "";
    return (
      matchesQuery(title, q) ||
      matchesQuery(desc, q) ||
      (song.year ? String(song.year).includes(q) : false)
    );
  });

  return { pages, songs: matchedSongs };
}
