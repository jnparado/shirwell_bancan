import type { Song } from "@/types/song";
import { ARTIST_HERO_IMAGE } from "@/lib/music-app";

/** Track art when no `cover_image` in DB */
export const DEFAULT_PLAYER_ARTWORK = ARTIST_HERO_IMAGE;

export function getPlayerArtworkSrc(
  song: Pick<Song, "cover_image"> | null | undefined
): string {
  return song?.cover_image ?? DEFAULT_PLAYER_ARTWORK;
}
