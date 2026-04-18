import type { Song } from "@/types/song";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  MUSIC_VIDEO_BUCKET,
  resolvePublicStorageUrl,
} from "@/lib/supabase/storage";

/** Bundled copy of `Come on Babe_V1 copy.flac` — served from `/public/audio` */
export const COME_ON_BABE_AUDIO_PATH = "/audio/come-on-babe-v1.flac";

const DEMO_AUDIO = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
];

export const FALLBACK_SONGS: Song[] = [
  {
    id: "fallback-1",
    title: "Come on Babe",
    artist: "Shirwell Bancan",
    year: null,
    audio_url: COME_ON_BABE_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-2",
    title: "I Want to Run Away",
    artist: "Shirwell Bancan",
    year: null,
    audio_url: DEMO_AUDIO[0],
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-3",
    title: "Lovely Forever",
    artist: "Shirwell Bancan",
    year: null,
    audio_url: DEMO_AUDIO[1],
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
  return applyBundledComeOnBabeAudio(mapped);
}

const COME_ON_BABE_TITLE = "come on babe";

/** Use the bundled Come on Babe FLAC whenever the track title matches */
function applyBundledComeOnBabeAudio(songs: Song[]): Song[] {
  return songs.map((s) =>
    s.title?.trim().toLowerCase() === COME_ON_BABE_TITLE
      ? { ...s, audio_url: COME_ON_BABE_AUDIO_PATH }
      : s
  );
}
