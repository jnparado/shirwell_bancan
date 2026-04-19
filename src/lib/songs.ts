import type { Song } from "@/types/song";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  MUSIC_VIDEO_BUCKET,
  resolvePublicStorageUrl,
} from "@/lib/supabase/storage";

/** Bundled `Kissing 240227_04 .mp3` */
export const KISSING_AUDIO_PATH = "/audio/kissing-240227.mp3";

/** `Come on Babe_V1 copy.flac` */
export const COME_ON_BABE_AUDIO_PATH = "/audio/come-on-babe-v1.flac";

/** Bundled copy of `I Want To Run Away_240225_V2-2.wav` */
export const RUN_AWAY_AUDIO_PATH = "/audio/i-want-to-run-away.wav";

export const FALLBACK_SONGS: Song[] = [
  {
    id: "fallback-1",
    title: "Kissing",
    artist: "Shirwell Bancan",
    year: null,
    audio_url: KISSING_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-2",
    title: "I Want to Run Away",
    artist: "Shirwell Bancan",
    year: null,
    audio_url: RUN_AWAY_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-3",
    title: "Come on babe",
    artist: "Shirwell Bancan",
    year: null,
    audio_url: COME_ON_BABE_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
];

type SongRow = {
  id: string;
  title: string | null;
  artist: string | null;
  year: number | null;
  audio_url: string | null;
  cover_image: string | null;
  is_premium: boolean | null;
  created_at?: string | null;
};

function mapRowToSong(
  supabaseUrl: string,
  row: SongRow
): Song {
  return {
    id: row.id,
    title: row.title,
    artist: row.artist,
    year: row.year,
    audio_url: resolvePublicStorageUrl(
      supabaseUrl,
      MUSIC_VIDEO_BUCKET,
      row.audio_url
    ),
    cover_image: resolvePublicStorageUrl(
      supabaseUrl,
      MUSIC_VIDEO_BUCKET,
      row.cover_image
    ),
    is_premium: row.is_premium,
    created_at: row.created_at ?? null,
  };
}

export async function getSongs(): Promise<Song[]> {
  const supabase = createServerSupabaseClient();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabase || !url) return FALLBACK_SONGS;

  const { data, error } = await supabase
    .from("songs")
    .select(
      "id, title, artist, year, audio_url, cover_image, is_premium, created_at"
    )
    .order("created_at", { ascending: false });

  if (error || !data?.length) return FALLBACK_SONGS;

  const mapped = (data as SongRow[]).map((row) => mapRowToSong(url, row));
  return applyBundledRunAwayAudio(
    applyBundledComeOnBabeAudio(applyBundledKissingAudio(mapped))
  );
}

const DISPLAY_TITLE_KISSING = "Kissing";
const DISPLAY_TITLE_COME_ON_BABE = "Come on babe";

/** “Kissing” / legacy alias → bundled MP3 */
function isKissingBundleTrack(title: string | null | undefined): boolean {
  const t = title?.trim().toLowerCase() ?? "";
  return t === "kissing" || t === "lovely forever";
}

function isComeOnBabeTrack(title: string | null | undefined): boolean {
  const t = title?.trim().toLowerCase() ?? "";
  return t === "come on babe";
}

/** Title “Kissing” + local MP3 */
function applyBundledKissingAudio(songs: Song[]): Song[] {
  return songs.map((s) =>
    isKissingBundleTrack(s.title)
      ? {
          ...s,
          title: DISPLAY_TITLE_KISSING,
          audio_url: KISSING_AUDIO_PATH,
        }
      : s
  );
}

/** Title “Come on babe” + local FLAC */
function applyBundledComeOnBabeAudio(songs: Song[]): Song[] {
  return songs.map((s) =>
    isComeOnBabeTrack(s.title)
      ? {
          ...s,
          title: DISPLAY_TITLE_COME_ON_BABE,
          audio_url: COME_ON_BABE_AUDIO_PATH,
        }
      : s
  );
}

function isRunAwayTrack(title: string | null | undefined): boolean {
  const t = title?.trim().toLowerCase() ?? "";
  return t === "i want to run away" || t === "i want to runaway";
}

/** Supabase rows for “I Want to Run Away” use the bundled WAV */
function applyBundledRunAwayAudio(songs: Song[]): Song[] {
  return songs.map((s) =>
    isRunAwayTrack(s.title) ? { ...s, audio_url: RUN_AWAY_AUDIO_PATH } : s
  );
}
