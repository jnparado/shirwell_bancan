"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BadgeCheck, Heart, MoreHorizontal, Play } from "lucide-react";
import type { Song } from "@/types/song";
import { usePlayer } from "@/contexts/player-context";
import {
  ARTIST_DISPLAY_NAME,
  ARTIST_FULL_NAME,
  ARTIST_HERO_POSTER,
  ARTIST_TAGLINE,
} from "@/lib/music-app";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";
import { BrandLegalMarks } from "@/components/legal/brand-legal-marks";
import { BottomNav } from "./bottom-nav";
import { MusicSidebar } from "./music-sidebar";

interface MusicArtistPageContentProps {
  songs: Song[];
}

const POPULAR_PLAY_COUNTS = ["1.2M", "980K", "875K", "720K", "650K", "540K", "480K"];

export function MusicArtistPageContent({ songs }: MusicArtistPageContentProps) {
  const { setQueue, playSong, toggleShuffle, shuffle, currentSong, isPlaying } =
    usePlayer();

  useEffect(() => {
    if (songs.length > 0) setQueue(songs);
  }, [songs, setQueue]);

  const popular = songs.slice(0, 10);
  const recent = songs.slice(0, 6);
  const featured = songs[0];

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
          <header className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 lg:hidden">
            <Link href="/" className="font-serif text-lg font-bold text-[#FFC107]">
              SHIRWELL
            </Link>
            <Link
              href="/newsletter"
              className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white"
            >
              Premium
            </Link>
          </header>

          {/* Hero */}
          <section className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#1a1510] via-[#121010] to-[#0a0a0a]">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-end lg:gap-10 lg:py-10">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:max-w-[260px] lg:mx-0 lg:max-w-[280px]">
                <Image
                  src={ARTIST_HERO_POSTER}
                  alt={`${ARTIST_FULL_NAME} — 45 years of original songs`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 220px, 280px"
                  priority
                />
                <BrandLegalMarks />
              </div>

              <div className="flex min-w-0 flex-1 flex-col pb-2 text-center lg:pb-6 lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Official Artist
                </p>
                <h1 className="mt-2 flex items-center justify-center gap-2 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:justify-start">
                  {ARTIST_DISPLAY_NAME}
                  <BadgeCheck
                    className="h-7 w-7 shrink-0 text-[#3b82f6]"
                    fill="currentColor"
                    aria-label="Verified artist"
                  />
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base lg:mx-0">
                  {ARTIST_TAGLINE}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <button
                    type="button"
                    onClick={handlePlayAll}
                    className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-8 py-3 text-sm font-bold text-stone-950 shadow-[0_0_32px_rgba(255,193,7,0.25)] transition hover:bg-[#e6ae06]"
                  >
                    <Play className="h-5 w-5" fill="currentColor" />
                    Play
                  </button>
                  <Link
                    href="/newsletter"
                    className="inline-flex rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                  >
                    Follow
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
            <div className="min-w-0 space-y-10">
              {/* Popular */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-white">Popular</h2>
                <ol className="space-y-0.5">
                  {popular.map((song, index) => {
                    const active = currentSong?.id === song.id;
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
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-zinc-800 lg:hidden">
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
                            <p className="truncate text-xs text-zinc-500">
                              {song.artist ?? ARTIST_FULL_NAME}
                            </p>
                          </div>
                          <span className="hidden text-xs tabular-nums text-zinc-500 sm:inline">
                            {POPULAR_PLAY_COUNTS[index] ?? "—"}
                          </span>
                          <span
                            className="shrink-0 rounded-full p-2 text-zinc-500 hover:text-[#FFC107]"
                            onClick={(e) => e.stopPropagation()}
                            role="presentation"
                          >
                            <Heart className="h-4 w-4" />
                          </span>
                          <span
                            className="shrink-0 rounded-full p-2 text-zinc-500 hover:text-white"
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

              {/* Recently played */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-white">Recently Played</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {recent.map((song) => (
                    <button
                      key={song.id}
                      type="button"
                      onClick={() => playSong(song)}
                      className="w-36 shrink-0 text-left transition hover:opacity-90"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-800 shadow-lg">
                        <Image
                          src={getPlayerArtworkSrc(song)}
                          alt=""
                          fill
                          className="object-cover object-center"
                          sizes="144px"
                        />
                      </div>
                      <p className="mt-2 truncate text-sm font-medium text-white">
                        {song.title ?? "Untitled"}
                      </p>
                      <p className="truncate text-xs text-zinc-500">{ARTIST_FULL_NAME}</p>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Artist picks — desktop sidebar column */}
            <aside className="hidden lg:block">
              <h2 className="mb-4 text-lg font-bold text-white">Artist Picks</h2>
              {featured ? (
                <button
                  type="button"
                  onClick={() => playSong(featured)}
                  className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] text-left transition hover:bg-white/[0.07]"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={ARTIST_HERO_POSTER}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 right-3 font-serif text-lg font-bold text-white">
                      {featured.title ?? "Featured"}
                    </span>
                  </div>
                  <p className="px-3 py-3 text-xs text-zinc-400">
                    Tap to play — official Shirwell catalogue
                  </p>
                </button>
              ) : null}
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

        <BottomNav />
      </div>
    </div>
  );
}
