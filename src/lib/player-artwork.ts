import type { Song } from "@/types/song";

/** Full-screen / card player art (second reference image) when no `cover_image` in DB */
export const DEFAULT_PLAYER_ARTWORK = "/shirwell-player-artwork.png";

export function getPlayerArtworkSrc(
  song: Pick<Song, "cover_image"> | null | undefined
): string {
  return song?.cover_image ?? DEFAULT_PLAYER_ARTWORK;
}
