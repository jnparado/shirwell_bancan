import type { Song } from "@/types/song";

/** Full-screen player art — gold-ring portrait when no `cover_image` in DB */
export const DEFAULT_PLAYER_ARTWORK = "/about/shirwell-music-hero.png";

/** Poster used on about page and as fallback art elsewhere */
export const POSTER_ARTWORK = "/about/shirwell-bancan-poster.png";

export function getPlayerArtworkSrc(
  song: Pick<Song, "cover_image"> | null | undefined
): string {
  return song?.cover_image ?? DEFAULT_PLAYER_ARTWORK;
}
