"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronUp,
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import type { Song } from "@/types/song";
import { usePlayer } from "@/contexts/player-context";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";
import { BottomNav } from "./bottom-nav";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface MusicPageContentProps {
  songs: Song[];
}

/** Outer ring radius in SVG viewBox units (center 50,50) */
const R_OUTER = 47;
const R_INNER_RING = 43;

export function MusicPageContent({ songs }: MusicPageContentProps) {
  const router = useRouter();
  const {
    queue,
    setQueue,
    playSong,
    currentSong,
    isPlaying,
    toggle,
    next,
    prev,
    currentTime,
    duration,
    seek,
  } = usePlayer();

  const [favorite, setFavorite] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [repeatOn, setRepeatOn] = useState(false);
  const [lyricsOpen, setLyricsOpen] = useState(false);

  useEffect(() => {
    if (songs.length === 0) return;
    if (queue.length === 0) {
      setQueue(songs);
      const first = songs.find((s) => s.audio_url) ?? songs[0];
      if (first?.audio_url) playSong(first);
    }
  }, [songs, queue.length, setQueue, playSong]);

  const thumbSrc = getPlayerArtworkSrc(currentSong);
  const title = currentSong?.title ?? "—";
  const artist = currentSong?.artist ?? "—";

  const progressRatio = useMemo(() => {
    if (duration <= 0) return 0;
    return Math.min(1, currentTime / duration);
  }, [currentTime, duration]);

  const outerCirc = 2 * Math.PI * R_OUTER;
  const progressLen = outerCirc * progressRatio;

  const playheadDot = useMemo(() => {
    const angle = -Math.PI / 2 + 2 * Math.PI * progressRatio;
    return {
      cx: 50 + R_OUTER * Math.cos(angle),
      cy: 50 + R_OUTER * Math.sin(angle),
    };
  }, [progressRatio]);

  function handleSeekBar(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = rect.width > 0 ? x / rect.width : 0;
    if (duration > 0) seek(ratio * duration);
  }

  function handleRingSeek(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = e.clientX - cx;
    const y = e.clientY - cy;
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    const ratio = angle / (2 * Math.PI);
    if (duration > 0) seek(ratio * duration);
  }

  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col bg-[#0a0a0c] pb-[calc(7rem+env(safe-area-inset-bottom))]">
      {/* Brand — circular logo + Shirwell (prototype) */}
      <header className="shrink-0 border-b border-white/[0.06] bg-black/60 px-4 py-3.5 backdrop-blur-xl">
        <Link
          href="/"
          className="mx-auto flex max-w-lg items-center justify-center gap-3"
        >
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black/50 ring-2 ring-[#FFC107]/45">
            <Image
              src="/shirwell-logo.png"
              alt=""
              fill
              className="object-cover object-[center_22%]"
              sizes="40px"
              priority
            />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-[#FFC107]">
            Shirwell
          </span>
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-3 pt-4">
        <div className="flex flex-1 flex-col rounded-[28px] border border-white/[0.12] bg-[#1c1c1f] p-5 pb-3 shadow-[0_12px_48px_rgba(0,0,0,0.55)]">
          {/* Player chrome */}
          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full p-2 text-white hover:bg-white/10"
              aria-label="Back"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </button>
            <p className="text-[15px] font-medium text-white">Playing Now</p>
            <button
              type="button"
              onClick={() => setFavorite((f) => !f)}
              className={`rounded-full p-2 hover:bg-white/10 ${
                favorite ? "text-[#FFC107]" : "text-white"
              }`}
              aria-label={favorite ? "Remove favorite" : "Add favorite"}
            >
              <Heart
                className="h-6 w-6"
                strokeWidth={2}
                fill={favorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          {/* Circular art + concentric gold rings + outer progress & dot */}
          <div
            className="relative mx-auto mb-5 w-full max-w-[300px] cursor-pointer"
            onClick={handleRingSeek}
            role="presentation"
            aria-hidden
          >
            <div className="relative aspect-square w-full">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.6" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Outer track */}
                <circle
                  cx="50"
                  cy="50"
                  r={R_OUTER}
                  fill="none"
                  stroke="rgba(255,193,7,0.22)"
                  strokeWidth="1.2"
                />
                {/* Progress on outer ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={R_OUTER}
                  fill="none"
                  stroke="#FFC107"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${progressLen} ${outerCirc}`}
                  transform="rotate(-90 50 50)"
                  className="transition-[stroke-dasharray] duration-150"
                />
                {/* Playhead dot */}
                <circle
                  cx={playheadDot.cx}
                  cy={playheadDot.cy}
                  r="2.2"
                  fill="#FFC107"
                  filter="url(#dot-glow)"
                />
                {/* Inner decorative ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={R_INNER_RING}
                  fill="none"
                  stroke="rgba(255,193,7,0.55)"
                  strokeWidth="2.4"
                />
              </svg>
              <div className="absolute inset-[11%]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#2a2418] shadow-[inset_0_0_0_2px_rgba(255,193,7,0.35)]">
                  <Image
                    src={thumbSrc}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="300px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="mb-5 text-center text-sm tabular-nums text-zinc-200">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>

          {/* Title row — shuffle & repeat flank title / artist (prototype) */}
          <div className="mb-5 flex items-center gap-3 px-0.5">
            <button
              type="button"
              onClick={() => setShuffleOn((s) => !s)}
              className={`shrink-0 rounded-full p-2 ${
                shuffleOn ? "text-[#FFC107]" : "text-zinc-400"
              } hover:bg-white/5`}
              aria-label="Shuffle"
              aria-pressed={shuffleOn}
            >
              <Shuffle className="h-5 w-5" strokeWidth={2} />
            </button>
            <div className="min-w-0 flex-1 text-center">
              <h1 className="truncate text-2xl font-bold tracking-tight text-white">
                {title}
              </h1>
              <p className="mt-1 truncate text-[15px] text-zinc-400">{artist}</p>
            </div>
            <button
              type="button"
              onClick={() => setRepeatOn((r) => !r)}
              className={`shrink-0 rounded-full p-2 ${
                repeatOn ? "text-[#FFC107]" : "text-zinc-400"
              } hover:bg-white/5`}
              aria-label="Repeat"
              aria-pressed={repeatOn}
            >
              <Repeat className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {/* Thin secondary scrub (prototype) */}
          <div
            role="slider"
            tabIndex={0}
            aria-valuenow={Math.round(progressRatio * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mx-auto mb-8 h-1 w-full max-w-[260px] cursor-pointer rounded-full bg-zinc-700/90"
            onClick={handleSeekBar}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" && duration > 0) seek(currentTime + 5);
              if (e.key === "ArrowLeft" && duration > 0) seek(currentTime - 5);
            }}
          >
            <div
              className="relative h-full rounded-full bg-[#FFC107]"
              style={{ width: `${progressRatio * 100}%` }}
            >
              <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-md ring-1 ring-white/30" />
            </div>
          </div>

          {/* Main transport — white glyphs, gold play (prototype) */}
          <div className="mb-6 flex items-center justify-center gap-12">
            <button
              type="button"
              onClick={prev}
              className="text-white hover:opacity-85"
              aria-label="Previous track"
            >
              <SkipBack className="h-10 w-10" fill="currentColor" strokeWidth={0} />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full bg-[#FFC107] text-white shadow-[0_0_40px_rgba(255,193,7,0.4)] transition hover:bg-[#e6ae06]"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-10 w-10" fill="currentColor" strokeWidth={0} />
              ) : (
                <Play className="h-10 w-10 pl-1" fill="currentColor" strokeWidth={0} />
              )}
            </button>
            <button
              type="button"
              onClick={next}
              className="text-white hover:opacity-85"
              aria-label="Next track"
            >
              <SkipForward className="h-10 w-10" fill="currentColor" strokeWidth={0} />
            </button>
          </div>

          {/* Lyrics — olive / gold cap (prototype) */}
          <div className="mt-auto overflow-hidden rounded-t-[28px] border border-[#FFC107]/25 bg-gradient-to-b from-[#4a4420]/95 via-[#2d2810] to-[#141108]">
            <button
              type="button"
              onClick={() => setLyricsOpen((o) => !o)}
              className="flex w-full flex-col items-center gap-1.5 py-4 text-[#ede4c7]"
            >
              <ChevronUp
                className={`h-5 w-5 transition ${lyricsOpen ? "rotate-180" : ""}`}
              />
              <span className="text-sm font-semibold tracking-[0.2em]">Lyrics</span>
            </button>
            {lyricsOpen ? (
              <div className="max-h-[38vh] overflow-y-auto border-t border-[#FFC107]/20 px-4 pb-6 pt-3 text-center text-sm leading-relaxed text-zinc-400">
                <p>Lyrics will appear here when available for this track.</p>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
