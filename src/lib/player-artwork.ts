import type { Song } from "@/types/song";

/** Default art for every track — Shirwell Bancan poster (horse, gold circle). */
export const DEFAULT_PLAYER_ARTWORK = "/about/shirwell-bancan-poster.png";

export const POSTER_ARTWORK = DEFAULT_PLAYER_ARTWORK;

/** All music uses the Shirwell Bancan poster unless a per-song cover is added later. */
export function getPlayerArtworkSrc(
  _song: Pick<Song, "cover_image"> | null | undefined,
): string {
  return DEFAULT_PLAYER_ARTWORK;
}
