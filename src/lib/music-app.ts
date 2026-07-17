/** Shirwell artist hero — 45 years poster */
export const ARTIST_HERO_POSTER = "/about/shirwell-bancan-poster.png";

export const ARTIST_DISPLAY_NAME = "Shirwell";
export const ARTIST_FULL_NAME = "Shirwell Bancan";

export const ARTIST_TAGLINE =
  "Singer. Songwriter. Rocker. 45 years of original songs — new music out now.";

export function isMusicAppRoute(pathname: string): boolean {
  return pathname === "/music" || pathname.startsWith("/music/");
}

export function isMusicPlayerRoute(pathname: string): boolean {
  return pathname === "/music/player";
}
