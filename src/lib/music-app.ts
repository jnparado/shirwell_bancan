/** Shirwell artist hero — 45 years poster (default track art) */
export const ARTIST_HERO_POSTER = "/about/shirwell-bancan-poster.png";

/** Wide banner + portrait extracted from design mockup */
export const ARTIST_HERO_BANNER = "/about/shirwell-artist-hero-banner.png";
export const ARTIST_HERO_PHOTO = "/about/shirwell-artist-hero-photo.png";

export const ARTIST_DISPLAY_NAME = "Shirwell";
export const ARTIST_FULL_NAME = "Shirwell Bancan";

export const ARTIST_TAGLINE =
  'Singer. Songwriter. Rocker. New album "BANCAN" is out now!';

export const FEATURED_PLAYLISTS = [
  { id: "top-hits", name: "Top Hits", subtitle: "50 songs" },
  { id: "rock-anthems", name: "Rock Anthems", subtitle: "32 songs" },
  { id: "chill-vibes", name: "Chill Vibes", subtitle: "28 songs" },
  { id: "live-cuts", name: "Live Cuts", subtitle: "18 songs" },
] as const;

export const POPULAR_PLAY_COUNTS = [
  "1.2M",
  "980K",
  "875K",
  "720K",
  "650K",
  "540K",
  "480K",
  "410K",
  "380K",
  "350K",
] as const;

export const POPULAR_DURATIONS = [
  "3:45",
  "4:02",
  "3:18",
  "3:55",
  "4:12",
  "3:30",
  "3:48",
  "4:05",
  "3:22",
  "3:59",
] as const;

export function isMusicAppRoute(pathname: string): boolean {
  return pathname === "/music" || pathname.startsWith("/music/");
}

export function isMusicPlayerRoute(pathname: string): boolean {
  return pathname === "/music/player";
}
