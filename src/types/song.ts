/** Matches Supabase `public.songs` + resolved storage URLs for playback/UI */
export interface Song {
  id: string;
  title: string | null;
  artist: string | null;
  year: number | null;
  /** Resolved absolute URL (storage public URL or external http(s)) */
  audio_url: string | null;
  /** Resolved absolute URL for cover art, if any */
  cover_image: string | null;
  is_premium: boolean | null;
  created_at?: string | null;
}
