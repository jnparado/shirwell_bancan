-- Shirwell_music `songs` table (matches Supabase dashboard)
-- Storage: public bucket `music_video` for audio (and optional cover art)

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  title text,
  artist text,
  year int4,
  audio_url text,
  cover_image text,
  is_premium boolean,
  created_at timestamptz default now()
);

-- `audio_url` / `cover_image` may be:
--   • full https URL, or
--   • object key inside bucket `music_video` (e.g. "Kissing 240227_04 .mp3")
-- The Next.js app resolves keys via /storage/v1/object/public/music_video/<key>

alter table public.songs enable row level security;

create policy "Allow public read songs"
  on public.songs
  for select
  to anon, authenticated
  using (true);
