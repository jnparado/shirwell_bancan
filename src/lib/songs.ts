import type { Song } from "@/types/song";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  MUSIC_VIDEO_BUCKET,
  resolvePublicStorageUrl,
} from "@/lib/supabase/storage";

/** Bundled `Kissing 240227_04 .mp3` */
export const KISSING_AUDIO_PATH = "/audio/kissing-240227.mp3";

/** `Come on Babe_V4_L2.wav` */
export const COME_ON_BABE_AUDIO_PATH = "/audio/come-on-babe-v4-l2.wav";

/** `Come on Babe_L2_V5.wav` (Version 2 — louder) */
export const COME_ON_BABE_V2_LOUDER_AUDIO_PATH =
  "/audio/come-on-babe-v2-louder.wav";

/** Bundled copy of `I Want To Run Away_240225_V2-2.wav` */
export const RUN_AWAY_AUDIO_PATH = "/audio/i-want-to-run-away.wav";

/** `Ride the Night Away (Thunderline Vocal Mix)` */
export const RIDE_THE_NIGHT_AWAY_AUDIO_PATH =
  "/audio/ride-the-night-away-thunderline-vocal-mix.mp3";

/** `Never Be The Same` */
export const NEVER_BE_THE_SAME_AUDIO_PATH = "/audio/never-be-the-same.mp3";

/** `Black horse` */
export const BLACK_HORSE_AUDIO_PATH = "/audio/black-horse.mp3";


function normalizeTitle(title: string | null | undefined): string {
  return (title ?? "").trim().toLowerCase();
}

function applyWrittenYears(songs: Song[]): Song[] {
  return songs.map((s) => {
    const t = normalizeTitle(s.title);
    // User-provided correct dates:
    // - Kissing (sometimes mistyped as "pissing") written 2024
    // - I Want to Run Away written 2025
    // - Come on babe (all versions) written 1979
    const forcedYear =
      t === "kissing" || t === "pissing"
        ? 2024
        : t === "i want to run away" || t === "i want to runaway"
          ? 2025
          : t === "ride the night away" || t.startsWith("ride the night away")
            ? 2025
            : t === "never be the same" || t.startsWith("never be the same")
              ? 2025
              : t.startsWith("come on babe")
            ? 1979
            : null;

    if (!forcedYear) return s;
    return { ...s, year: forcedYear };
  });
}

export const FALLBACK_SONGS: Song[] = [
  {
    id: "fallback-1",
    title: "Kissing",
    artist: "Shirwell Bancan",
    year: 2024,
    audio_url: KISSING_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-2",
    title: "I Want to Run Away",
    artist: "Shirwell Bancan",
    year: 2025,
    audio_url: RUN_AWAY_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-3",
    title: "Come on babe",
    artist: "Shirwell Bancan",
    year: 1979,
    audio_url: COME_ON_BABE_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-4",
    title: "Come on babe (Version 2 — louder)",
    artist: "Shirwell Bancan",
    year: 1979,
    audio_url: COME_ON_BABE_V2_LOUDER_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-5",
    title: "Black horse(",
    artist: "Shirwell Bancan",
    year: 2025,
    audio_url: RIDE_THE_NIGHT_AWAY_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-6",
    title: "Never Be The Same",
    artist: "Shirwell Bancan",
    year: 2025,
    audio_url: NEVER_BE_THE_SAME_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-7",
    title: "Black Horse",
    artist: "Shirwell Bancan",
    year: 2025,
    audio_url: BLACK_HORSE_AUDIO_PATH,
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
  const supabase = await createServerSupabaseClient();
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
  const normalized = ensureBundledTracksInList(
    applyBundledRunAwayAudio(
      applyBundledComeOnBabeAudio(
        applyBundledKissingAudio(
          applyBundledNeverBeTheSameAudio(
            applyBundledRideTheNightAwayAudio(mapped)
          )
        )
      )
    )
  );
  return applyWrittenYears(normalized);
}

const DISPLAY_TITLE_KISSING = "Kissing";
const DISPLAY_TITLE_COME_ON_BABE = "Come on babe";
const DISPLAY_TITLE_COME_ON_BABE_V2 = "Come on babe (Version 2 — louder)";

/** “Kissing” / legacy alias → bundled MP3 */
function isKissingBundleTrack(title: string | null | undefined): boolean {
  const t = normalizeTitle(title);
  return t === "kissing" || t === "lovely forever";
}

function isComeOnBabeTrack(title: string | null | undefined): boolean {
  const t = normalizeTitle(title);
  return t === "come on babe";
}

function isComeOnBabeV2Track(title: string | null | undefined): boolean {
  const t = normalizeTitle(title);
  return (
    t === "come on babe version 2" ||
    t === "come on babe v2" ||
    t === "come on babe (version 2 — louder)" ||
    t === "come on babe (version 2 - louder)" ||
    t === "come on babe v4 l2 1"
  );
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

/** Title “Come on babe” + local WAV */
function applyBundledComeOnBabeAudio(songs: Song[]): Song[] {
  return songs.map((s) =>
    isComeOnBabeV2Track(s.title)
      ? {
          ...s,
          title: DISPLAY_TITLE_COME_ON_BABE_V2,
          audio_url: COME_ON_BABE_V2_LOUDER_AUDIO_PATH,
        }
      : isComeOnBabeTrack(s.title)
        ? {
            ...s,
            title: DISPLAY_TITLE_COME_ON_BABE,
            audio_url: COME_ON_BABE_AUDIO_PATH,
          }
        : s
  );
}

function isRunAwayTrack(title: string | null | undefined): boolean {
  const t = normalizeTitle(title);
  return t === "i want to run away" || t === "i want to runaway";
}

/** Supabase rows for “I Want to Run Away” use the bundled WAV */
function applyBundledRunAwayAudio(songs: Song[]): Song[] {
  return songs.map((s) =>
    isRunAwayTrack(s.title) ? { ...s, audio_url: RUN_AWAY_AUDIO_PATH } : s
  );
}

function isRideTheNightAwayTrack(title: string | null | undefined): boolean {
  const t = normalizeTitle(title);
  return t === "ride the night away" || t.startsWith("ride the night away");
}

/** Supabase rows for “Ride the Night Away” use the bundled MP3 */
function applyBundledRideTheNightAwayAudio(songs: Song[]): Song[] {
  return songs.map((s) =>
    isRideTheNightAwayTrack(s.title)
      ? {
          ...s,
          title: "Ride the Night Away",
          audio_url: RIDE_THE_NIGHT_AWAY_AUDIO_PATH,
        }
      : s
  );
}

function isNeverBeTheSameTrack(title: string | null | undefined): boolean {
  const t = normalizeTitle(title);
  return t === "never be the same" || t.startsWith("never be the same");
}

/** Supabase rows for “Never Be The Same” use the bundled MP3 */
function applyBundledNeverBeTheSameAudio(songs: Song[]): Song[] {
  return songs.map((s) =>
    isNeverBeTheSameTrack(s.title)
      ? {
          ...s,
          title: "Never Be The Same",
          audio_url: NEVER_BE_THE_SAME_AUDIO_PATH,
        }
      : s
  );
}

/** Ensures bundled tracks appear even when Supabase has other songs but not these yet */
function ensureBundledTracksInList(songs: Song[]): Song[] {
  let result = songs;

  if (!result.some((s) => isRideTheNightAwayTrack(s.title))) {
    result = [
      {
        id: "bundled-ride-the-night-away",
        title: "Black Horse",
        artist: "Shirwell Bancan",
        year: 2025,
        audio_url: RIDE_THE_NIGHT_AWAY_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }

  if (!result.some((s) => isNeverBeTheSameTrack(s.title))) {
    result = [
      {
        id: "bundled-never-be-the-same",
        title: "Never Be The Same",
        artist: "Shirwell Bancan",
        year: 2025,
        audio_url: NEVER_BE_THE_SAME_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }

  return result;
}
