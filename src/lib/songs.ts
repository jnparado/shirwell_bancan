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


/** `Hay girls guy voice` */
export const HAY_GIRLS_GUY_VOICE_AUDIO_PATH = "/audio/hay-girls-guy-voice.mp3";

/** `Baby Gonna Rock` */
export const BABY_GONNA_ROCK_AUDIO_PATH = "/audio/baby-gonna-rock.mp3";

/** `Crazy ` */
export const CRAZY_1_AUDIO_PATH = "/audio/crazy.mp3";

/** `Rock-n-Roll Roll ` */
export const ROCK_N_ROLL_ROLL_AUDIO_PATH = "/audio/rock-n-roll-roll.mp3";

/** `Without Your Love` */
export const WITHOUT_YOUR_LOVE_AUDIO_PATH = "/audio/without-your-love.mp3";

/** `1000-minutes apart` */
export const ONE_THOUSAND_MINUTES_APART_AUDIO_PATH = "/audio/one_thousand_minutes_apart.mp3";

/** `how-could-i-find-someone-like-you ` */
export const HOW_COULD_I_FIND_SOMEONE_LIKE_YOU_AUDIO_PATH = "/audio/how-could-i-find-someone-like-you.mp3";
 

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
          : t === "1000 minutes apart" || t.startsWith("1000 minutes apart")
            ? 2025
          : t === "ride the night away" || t.startsWith("ride the night away")
            ? 2025
            : t === "never be the same" || t.startsWith("never be the same")
              ? 2025
              : t === "without your love" || t.startsWith("without your love")
                ? 2025
              : t === "rock-n-roll roll" || t.startsWith("rock-n-roll roll")
                ? 2025
              : t === "crazy 1" || t.startsWith("crazy 1")
                ? 2025
              : t === "baby gonna rock" || t.startsWith("baby gonna rock")
                ? 2025
              : t === "hay girls guy voice" || t.startsWith("hay girls guy voice")
                ? 2025
                : t === "how could i find someone like you" || t.startsWith("how could i find someone like you")
                ? 2025
                
          
            : null;

    if (!forcedYear) return s;
    return { ...s, year: forcedYear };
  });
}

export const FALLBACK_SONGS: Song[] = [
  {
    id: "fallback-1",
    title: "Kissing",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2024,
    audio_url: KISSING_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-2",
    title: "I Want to Run Away",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2025,
    audio_url: RUN_AWAY_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-3",
    title: "Come on babe",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 1979,
    audio_url: COME_ON_BABE_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-4",
    title: "Come on babe (Version 2 — louder)",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 1979,
    audio_url: COME_ON_BABE_V2_LOUDER_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-5",
    title: "Black Horse",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2025,
    audio_url: RIDE_THE_NIGHT_AWAY_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-6",
    title: "Never Be The Same",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2025,
    audio_url: NEVER_BE_THE_SAME_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-7",
    title: "Hay girls guy voice",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2026,
    audio_url: HAY_GIRLS_GUY_VOICE_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-8",
    title: "Baby Gonna Rock",
    artist: "Written by Shirwell Bancan",
    desc: "Dancing version just the demonstration written in my 19 80 there is another one coming that will be completed in the studio this is hybrid dance version demonstration hybrid",
    year: 2025,
    audio_url: BABY_GONNA_ROCK_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-9",
    title: "Crazy 1",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2025,
    audio_url: CRAZY_1_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-10",
    title: "Rock-n-Roll Roll  ",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2025,
    audio_url: ROCK_N_ROLL_ROLL_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-11",
    title: "Without YourLove",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2025,
    audio_url: WITHOUT_YOUR_LOVE_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
  {
    id: "fallback-12",
    title: "1000 Minutes Apart",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2025,
    audio_url: ONE_THOUSAND_MINUTES_APART_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },

  {
    id: "fallback-13",
    title: "How could i find someone like you",
    artist: "Written by Shirwell Bancan",
    desc: "Shirwell Bancan",
    year: 2025,
    audio_url: HOW_COULD_I_FIND_SOMEONE_LIKE_YOU_AUDIO_PATH,
    cover_image: null,
    is_premium: false,
  },
];

type SongRow = {
  id: string;
  title: string | null;
  artist: string | null;
  desc:string |null;
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
    desc: row.desc,
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
      "id, title, desc, artist, year, audio_url, cover_image, is_premium, created_at"
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
        desc: "Shirwell Bancan",
        year: 2025,
        audio_url: RIDE_THE_NIGHT_AWAY_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }

  function isNeverBeTheSameTrack(title: string | null | undefined): boolean {
    const t = normalizeTitle(title);
    return t === "never be the same" || t.startsWith("never be the same");
  }
  if (!result.some((s) => isNeverBeTheSameTrack(s.title))) {
    result = [
      {
        id: "bundled-never-be-the-same",
        title: "Never Be The Same",
        artist: "Written by Shirwell Bancan",
        desc: "Shirwell Bancan",
        year: 2025,
        audio_url: NEVER_BE_THE_SAME_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }

  function isOneThousandMinutesApartTrack(title: string | null | undefined): boolean {
    const t = normalizeTitle(title);
    return t === "1000 minutes apart" || t.startsWith("1000 minutes apart");
  }
  if (!result.some((s) => isOneThousandMinutesApartTrack(s.title))) {
    result = [
      {
        id: "bundled-one-thousand-minutes-apart",
        title: "1000 Minutes Apart",
        artist: "Written by Shirwell Bancan",
        desc: "Shirwell Bancan",
        year: 2025,
        audio_url: ONE_THOUSAND_MINUTES_APART_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }
  function isRockNRollRollTrack(title: string | null | undefined): boolean {
    const t = normalizeTitle(title);
    return t === "rock-n-roll roll" || t.startsWith("rock-n-roll roll");
  }
  if (!result.some((s) => isRockNRollRollTrack(s.title))) {
    result = [
      {
        id: "bundled-rock-n-roll-roll",     
        title: "Rock-n-Roll Roll",
        artist: "Written by Shirwell Bancan",
        desc: "Shirwell Bancan",
        year: 2025,
        audio_url: ROCK_N_ROLL_ROLL_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }

  function isWithoutYourLoveTrack(title: string | null | undefined): boolean {
    const t = normalizeTitle(title);
    return t === "without your love" || t.startsWith("without your love");
  }
  if (!result.some((s) => isWithoutYourLoveTrack(s.title))) {
    result = [
      {
        id: "bundled-without-your-love",
        title: "Without Your Love",
        artist: "Written by Shirwell Bancan",
        desc: "Shirwell Bancan",
        year: 2025,
        audio_url: WITHOUT_YOUR_LOVE_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }
  function isCrazy1Track(title: string | null | undefined): boolean {
    const t = normalizeTitle(title);
    return t === "crazy 1" || t.startsWith("crazy 1");
  }
  if (!result.some((s) => isCrazy1Track(s.title))) {
    result = [
      {
        id: "bundled-crazy-1",
        title: "Crazy 1",
        artist: "Written by Shirwell Bancan",
        desc: "Shirwell Bancan",
        year: 2025,
        audio_url: CRAZY_1_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }
  function isBabyGonnaRockTrack(title: string | null | undefined): boolean {
    const t = normalizeTitle(title);
    return t === "baby gonna rock" || t.startsWith("baby gonna rock");
  }
  if (!result.some((s) => isBabyGonnaRockTrack(s.title))) {
    result = [
      {
        id: "bundled-baby-gonna-rock",
        title: "Baby Gonna Rock",
        artist: "Written by Shirwell Bancan",
        desc: "Dancing version just the demonstration written in my 19 80 there is another one coming that will be completed in the studio this is hybrid dance version demonstration hybrid",
        year: 2025,
        audio_url: BABY_GONNA_ROCK_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
  }
  function isHayGirlsGuyVoiceTrack(title: string | null | undefined): boolean {
    const t = normalizeTitle(title);
    return t === "hay girls guy voice" || t.startsWith("hay girls guy voice");
  } 
  if (!result.some((s) => isHayGirlsGuyVoiceTrack(s.title))) {
    result = [
      {
        id: "bundled-hay-girls-guy-voice",
        title: "Hay Girls Guy Voice",
        artist: "Written by Shirwell Bancan",
        desc: "Shirwell Bancan",
        year: 2025,
        audio_url: HAY_GIRLS_GUY_VOICE_AUDIO_PATH,
        cover_image: null,
        is_premium: false,
      },
      ...result,
    ];
   
  
  

  } 


  return result;
}
