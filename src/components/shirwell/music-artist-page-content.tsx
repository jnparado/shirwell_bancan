"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  BadgeCheck,
  Bell,
  ChevronDown,
  Heart,
  MoreHorizontal,
  Play,
} from "lucide-react";
import type { Song } from "@/types/song";
import { usePlayer } from "@/contexts/player-context";
import {
  ARTIST_DISPLAY_NAME,
  ARTIST_FULL_NAME,
  ARTIST_HERO_POSTER,
  ARTIST_TAGLINE,
  FEATURED_PLAYLISTS,
  POPULAR_DURATIONS,
  POPULAR_PLAY_COUNTS,
} from "@/lib/music-app";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";
import { MusicBottomNav } from "./music-bottom-nav";
import { MusicSidebar } from "./music-sidebar";

interface MusicArtistPageContentProps {
  songs: Song[];
}

export function MusicArtistPageContent({ songs }: MusicArtistPageContentProps) {
  const { setQueue, playSong, toggleShuffle, shuffle, currentSong, isPlaying } =
    usePlayer();

  useEffect(() => {
    if (songs.length > 0) setQueue(songs);
  }, [songs, setQueue]);

  const popular = songs.slice(0, 10);
  const recent = songs.slice(0, 6);
  const featured = songs[0];
  const artistPicks = songs.slice(0, 4);

  function handlePlayAll() {
    if (songs.length === 0) return;
    setQueue(songs);
    const first = songs.find((s) => s.audio_url) ?? songs[0];
    if (first) playSong(first);
  }

  function handleShufflePlay() {
    if (songs.length === 0) return;
    if (!shuffle) toggleShuffle();
    setQueue(songs);
    const playable = songs.filter((s) => s.audio_url);
    const pick = playable[Math.floor(Math.random() * playable.length)] ?? songs[0];
    if (pick) playSong(pick);
  }

  return (
    <div className="flex min-h-[100dvh] min-w-0 flex-col bg-[#0a0a0a] lg:flex-row">
      <MusicSidebar songs={songs} />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-h-0 flex-1 overflow-y-auto pb-[var(--music-app-bottom-safe)]">
          {/* Mobile header */}
          <header className="flex items-center justify-between px-4 py-3 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/shirwell-logo-emblem.png"
                alt="Shirwell"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="font-serif text-base font-bold text-[#FFC107]">SHIRWELL</span>
            </Link>
            <Link
              href="/newsletter"
              className="rounded-full p-2 text-zinc-300 hover:bg-white/10 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Link>
          </header>

          {/* Desktop top bar */}
          <header className="sticky top-0 z-20 hidden items-center justify-end gap-3 border-b border-white/[0.06] bg-[#0a0a0a]/90 px-6 py-3 backdrop-blur-md lg:flex">
            <Link
              href="/newsletter"
              className="rounded-full border border-white/20 px-5 py-1.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
            >
              Upgrade
            </Link>
            <Link
              href="/newsletter"
              className="rounded-full p-2 text-zinc-300 hover:bg-white/10 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Link>
            <button
              type="button"
              className="flex items-center gap-1 rounded-full py-1 pl-1 pr-2 hover:bg-white/10"
              aria-label="Account menu"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-zinc-900 ring-1 ring-[#FFC107]/25">
                <Image
                  src={ARTIST_HERO_POSTER}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="32px"
                />
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            </button>
          </header>

          {/* Hero — mobile: poster + overlay */}
          <section className="relative overflow-hidden lg:hidden">
            <div className="relative mx-auto aspect-[2/3] w-full max-w-sm bg-black">
              <Image
                src={ARTIST_HERO_POSTER}
                alt={`${ARTIST_FULL_NAME} — 45 years of original songs`}
                fill
                className="object-contain object-center"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
                  Official Artist
                </p>
                <h1 className="mt-1 flex items-center gap-2 font-serif text-4xl font-bold text-white">
                  {ARTIST_DISPLAY_NAME}
                  <BadgeCheck
                    className="h-6 w-6 shrink-0 text-[#3b82f6]"
                    fill="currentColor"
                    aria-label="Verified artist"
                  />
                </h1>
              </div>
            </div>
            <div className="px-4 pb-6 pt-4">
              <p className="text-sm leading-relaxed text-zinc-300">{ARTIST_TAGLINE}</p>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayAll}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FFC107] py-3 text-sm font-bold text-stone-950 transition hover:bg-[#e6ae06]"
                >
                  <Play className="h-5 w-5" fill="currentColor" />
                  Play
                </button>
                <Link
                  href="/newsletter"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-white/25 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Follow
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-white/15 p-3 text-zinc-300 hover:bg-white/10"
                  aria-label="More options"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Hero — desktop: poster banner */}
          <section className="relative hidden overflow-hidden lg:block">
            <div className="absolute inset-0">
              <Image
                src={ARTIST_HERO_POSTER}
                alt=""
                fill
                className="object-cover object-center scale-110 blur-3xl opacity-25"
                sizes="100vw"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1208]/95 via-[#0a0a0a]/90 to-[#0a0a0a]" />
            </div>
            <div className="relative mx-auto flex max-w-6xl items-end gap-8 px-6 py-10 xl:gap-12 xl:py-12">
              <div className="relative aspect-[2/3] h-64 w-auto shrink-0 overflow-hidden rounded-lg border border-[#FFC107]/15 bg-black shadow-[0_24px_80px_rgba(255,193,7,0.12)] xl:h-72">
                <Image
                  src={ARTIST_HERO_POSTER}
                  alt={`${ARTIST_FULL_NAME} — 45 years of original songs`}
                  fill
                  className="object-contain object-center"
                  sizes="288px"
                  priority
                />
              </div>
              <div className="min-w-0 flex-1 pb-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Official Artist
                </p>
                <h1 className="mt-3 flex items-center gap-3 font-serif text-6xl font-bold tracking-tight text-white xl:text-7xl">
                  {ARTIST_DISPLAY_NAME}
                  <BadgeCheck
                    className="h-9 w-9 shrink-0 text-[#3b82f6]"
                    fill="currentColor"
                    aria-label="Verified artist"
                  />
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-200">
                  {ARTIST_TAGLINE}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePlayAll}
                    className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-10 py-3.5 text-sm font-bold text-stone-950 shadow-[0_0_32px_rgba(255,193,7,0.25)] transition hover:bg-[#e6ae06]"
                  >
                    <Play className="h-5 w-5" fill="currentColor" />
                    Play
                  </button>
                  <Link
                    href="/newsletter"
                    className="inline-flex rounded-full border border-white/25 px-10 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                  >
                    Follow
                  </Link>
                  <button
                    type="button"
                    className="rounded-full p-3 text-zinc-400 hover:bg-white/10 hover:text-white"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 lg:py-8">
            <div className="min-w-0 space-y-10">
              {/* Popular */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Popular</h2>
                  <Link
                    href="/music/player"
                    className="text-sm font-semibold text-zinc-400 hover:text-white lg:hidden"
                  >
                    See all
                  </Link>
                </div>
                <ol className="space-y-0.5">
                  {popular.map((song, index) => {
                    const active = currentSong?.id === song.id;
                    const liked = index === 0;
                    return (
                      <li key={song.id}>
                        <button
                          type="button"
                          onClick={() => playSong(song)}
                          className={`group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition hover:bg-white/[0.06] ${
                            active ? "bg-white/[0.08]" : ""
                          }`}
                        >
                          <span className="w-6 shrink-0 text-center text-sm tabular-nums text-zinc-500 group-hover:hidden">
                            {index + 1}
                          </span>
                          <span className="hidden w-6 shrink-0 text-[#FFC107] group-hover:block">
                            <Play className="mx-auto h-4 w-4" fill="currentColor" />
                          </span>
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-zinc-800">
                            <Image
                              src={getPlayerArtworkSrc(song)}
                              alt=""
                              fill
                              className="object-cover object-center"
                              sizes="40px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`truncate text-sm font-medium ${
                                active && isPlaying ? "text-[#FFC107]" : "text-white"
                              }`}
                            >
                              {song.title ?? "Untitled"}
                            </p>
                            <p className="truncate text-xs text-zinc-500 lg:hidden">
                              {song.artist ?? ARTIST_FULL_NAME}
                            </p>
                          </div>
                          <span className="hidden text-xs tabular-nums text-zinc-500 lg:inline">
                            {POPULAR_DURATIONS[index] ?? "—"}
                          </span>
                          <span className="hidden text-xs tabular-nums text-zinc-500 lg:inline">
                            {POPULAR_PLAY_COUNTS[index] ?? "—"}
                          </span>
                          <span
                            className={`shrink-0 rounded-full p-2 ${
                              liked ? "text-[#1ed760]" : "text-zinc-500 hover:text-[#FFC107]"
                            }`}
                            onClick={(e) => e.stopPropagation()}
                            role="presentation"
                          >
                            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                          </span>
                          <span className="shrink-0 text-xs tabular-nums text-zinc-500 lg:hidden">
                            {POPULAR_DURATIONS[index] ?? "—"}
                          </span>
                          <span
                            className="hidden shrink-0 rounded-full p-2 text-zinc-500 hover:text-white lg:inline-flex"
                            onClick={(e) => e.stopPropagation()}
                            role="presentation"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </section>

              {/* Playlists for you — mobile-first carousel */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-white">Playlists for you</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {FEATURED_PLAYLISTS.map((playlist, index) => {
                    const song = songs[index];
                    return (
                      <button
                        key={playlist.id}
                        type="button"
                        onClick={() => song && playSong(song)}
                        className="w-36 shrink-0 text-left transition hover:opacity-90 sm:w-40"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-800 shadow-lg">
                          {song ? (
                            <Image
                              src={getPlayerArtworkSrc(song)}
                              alt=""
                              fill
                              className="object-cover object-center"
                              sizes="160px"
                            />
                          ) : null}
                        </div>
                        <p className="mt-2 truncate text-sm font-semibold text-white">
                          {playlist.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">{playlist.subtitle}</p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Recently played */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-white">Recently Played</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {recent.map((song) => (
                    <button
                      key={song.id}
                      type="button"
                      onClick={() => playSong(song)}
                      className="w-36 shrink-0 text-left transition hover:opacity-90 sm:w-40"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-800 shadow-lg">
                        <Image
                          src={getPlayerArtworkSrc(song)}
                          alt=""
                          fill
                          className="object-cover object-center"
                          sizes="160px"
                        />
                      </div>
                      <p className="mt-2 truncate text-sm font-semibold text-white">
                        {song.title ?? "Untitled"}
                      </p>
                      <p className="truncate text-xs text-zinc-500">{ARTIST_FULL_NAME}</p>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Artist picks — desktop */}
            <aside className="hidden lg:block">
              <h2 className="mb-4 text-lg font-bold text-white">Artist Picks</h2>
              {featured ? (
                <button
                  type="button"
                  onClick={() => playSong(featured)}
                  className="group w-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] text-left transition hover:bg-white/[0.07]"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={ARTIST_HERO_POSTER}
                      alt=""
                      fill
                      className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 right-3 font-serif text-xl font-bold text-white">
                      BANCAN
                    </span>
                    <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107] text-stone-950 opacity-0 shadow-lg transition group-hover:opacity-100">
                      <Play className="h-5 w-5" fill="currentColor" />
                    </span>
                  </div>
                </button>
              ) : null}

              <ol className="mt-4 space-y-1">
                {artistPicks.map((song) => {
                  const active = currentSong?.id === song.id;
                  return (
                    <li key={song.id}>
                      <button
                        type="button"
                        onClick={() => playSong(song)}
                        className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition hover:bg-white/[0.06] ${
                          active ? "bg-white/[0.08]" : ""
                        }`}
                      >
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-zinc-800">
                          <Image
                            src={getPlayerArtworkSrc(song)}
                            alt=""
                            fill
                            className="object-cover object-center"
                            sizes="40px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-medium ${
                              active && isPlaying ? "text-[#FFC107]" : "text-white"
                            }`}
                          >
                            {song.title ?? "Untitled"}
                          </p>
                          <p className="truncate text-xs text-zinc-500">{ARTIST_FULL_NAME}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <button
                type="button"
                onClick={handleShufflePlay}
                className="mt-4 w-full rounded-full border border-[#FFC107]/40 py-2.5 text-sm font-semibold text-[#FFC107] transition hover:bg-[#FFC107]/10"
              >
                Shuffle play
              </button>
              <Link
                href="/music-owner"
                className="mt-3 block text-center text-xs text-zinc-500 underline-offset-2 hover:text-zinc-300 hover:underline"
              >
                Music ownership
              </Link>
            </aside>
          </div>
        </main>

        <MusicBottomNav />
      </div>
    </div>
  );
}
