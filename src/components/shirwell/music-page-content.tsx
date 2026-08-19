"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import type { Song } from "@/types/song";
import { usePlayer } from "@/contexts/player-context";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";
import { formatTime } from "@/lib/player/format-time";
import { BottomNav } from "./bottom-nav";
import { MusicEditorialArticle } from "./music-editorial-article";
import { AdSenseBoxUnit, AdSenseEnterprisesUnit, AdSenseLabel } from "@/components/ads/adsense-unit";
import { ContentPageAdTop } from "@/components/ads/content-page-ads";

interface MusicPageContentProps {
  songs: Song[];
}

function SkipSecondsButton({
  seconds,
  direction,
  onClick,
}: {
  seconds: number;
  direction: "back" | "forward";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-8 w-8 items-center justify-center text-white/90 hover:text-white sm:h-9 sm:w-9"
      aria-label={`${direction === "back" ? "Rewind" : "Forward"} ${seconds} seconds`}
    >
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden>
        <path
          fill="currentColor"
          d={
            direction === "back"
              ? "M14 4a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-.5 4v4.5H9.8l3.7-3.7 3.7 3.7h-3.7V10h-1Z"
              : "M14 4a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.5 4v4.5h3.7l-3.7 3.7-3.7-3.7h3.7V10h1Z"
          }
        />
      </svg>
      <span className="absolute text-[8px] font-bold">{seconds}</span>
    </button>
  );
}

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
    seekRelative,
    shuffle,
    repeat,
    volume,
    toggleShuffle,
    toggleRepeat,
    setVolume,
  } = usePlayer();

  const [queueOpen, setQueueOpen] = useState(false);
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
  const artist = currentSong?.artist ?? "Shirwell Bancan";
  const credit = currentSong?.desc?.trim() || null;

  const progressRatio = useMemo(() => {
    if (duration <= 0) return 0;
    return Math.min(1, currentTime / duration);
  }, [currentTime, duration]);

  function handleSeekBar(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = rect.width > 0 ? x / rect.width : 0;
    if (duration > 0) seek(ratio * duration);
  }

  return (
    <div className="relative flex min-h-[100dvh] min-w-0 flex-1 flex-col overflow-x-hidden bg-[#0a0806] pb-[var(--page-bottom-safe)]">
      {/* Warm gold glow — Shirwell player */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[#0a0806]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-8%,rgba(255,193,7,0.24),transparent_58%)]" />
        <Image
          src={thumbSrc}
          alt=""
          fill
          className="scale-125 object-cover object-center opacity-20 blur-3xl"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208]/70 via-[#0a0a0c]/92 to-[#0a0806]" />
      </div>

      <header className="relative z-10 flex shrink-0 items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full p-2 text-white/90 hover:bg-white/10"
          aria-label="Close player"
        >
          <ChevronDown className="h-7 w-7" strokeWidth={2} />
        </button>
        <Link
          href="/home"
          className="font-serif text-xs font-bold uppercase tracking-[0.28em] text-[#FFC107] hover:text-[#FFD54F]"
        >
          SHIRWELL
        </Link>
        <button
          type="button"
          onClick={() => setQueueOpen((o) => !o)}
          className={`rounded-full p-2 hover:bg-white/10 ${
            queueOpen ? "text-[#FFC107]" : "text-white/90"
          }`}
          aria-label="Up next"
          aria-pressed={queueOpen}
        >
          <ListMusic className="h-6 w-6" strokeWidth={2} />
        </button>
      </header>

      {!queueOpen ? (
        <ContentPageAdTop className="relative z-10 px-4 pb-2 sm:px-5" />
      ) : null}

      <main className="relative z-10 mx-auto flex w-full min-h-0 max-w-lg flex-1 flex-col overflow-y-auto px-4 pt-2 sm:px-5">
        <h1 className="sr-only">Shirwell Music — stream songs by Shirwell Bancan</h1>
        {!queueOpen ? (
          <>
            <div className="mx-auto mb-6 w-full max-w-[300px] sm:mb-8 sm:max-w-[340px]">
              <div className="relative aspect-square max-h-[42dvh] w-full overflow-hidden rounded-2xl bg-black shadow-[0_0_72px_rgba(255,193,7,0.14)] sm:max-h-none">
                <Image
                  src={thumbSrc}
                  alt={title}
                  fill
                  className="object-contain object-center"
                  sizes="340px"
                  priority
                />
              </div>
            </div>

            <div className="mb-6 text-center">
              <h2 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {title}
              </h2>
              <p className="mt-2 truncate text-base text-white/60">{artist}</p>
              {credit ? (
                <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {credit}
                </p>
              ) : null}
            </div>

            <div className="mb-2">
              <div
                role="slider"
                tabIndex={0}
                aria-valuenow={Math.round(progressRatio * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                className="group h-1.5 w-full cursor-pointer rounded-full bg-white/20"
                onClick={handleSeekBar}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") seekRelative(5);
                  if (e.key === "ArrowLeft") seekRelative(-5);
                }}
              >
                <div
                  className="relative h-full rounded-full bg-[#FFC107] transition-[width] duration-150"
                  style={{ width: `${progressRatio * 100}%` }}
                >
                  <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-md transition group-hover:opacity-100" />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs tabular-nums text-white/45">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
              </div>
            </div>

            <div className="mb-5 space-y-3 sm:mb-6">
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={prev}
                  className="text-white/90 hover:text-white"
                  aria-label="Previous track"
                >
                  <SkipBack className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" strokeWidth={0} />
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition hover:scale-[1.03] sm:h-[4.25rem] sm:w-[4.25rem]"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-7 w-7 sm:h-9 sm:w-9" fill="currentColor" />
                  ) : (
                    <Play className="h-7 w-7 pl-0.5 sm:h-9 sm:w-9 sm:pl-1" fill="currentColor" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="text-white/90 hover:text-white"
                  aria-label="Next track"
                >
                  <SkipForward className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" strokeWidth={0} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <button
                  type="button"
                  onClick={toggleShuffle}
                  className={`rounded-full p-2 ${
                    shuffle ? "text-[#FFC107]" : "text-white/55"
                  } hover:text-white`}
                  aria-label="Shuffle"
                  aria-pressed={shuffle}
                >
                  <Shuffle className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                </button>
                <SkipSecondsButton
                  seconds={15}
                  direction="back"
                  onClick={() => seekRelative(-15)}
                />
                <SkipSecondsButton
                  seconds={15}
                  direction="forward"
                  onClick={() => seekRelative(15)}
                />
                <button
                  type="button"
                  onClick={toggleRepeat}
                  className={`rounded-full p-2 ${
                    repeat ? "text-[#FFC107]" : "text-white/55"
                  } hover:text-white`}
                  aria-label="Repeat"
                  aria-pressed={repeat}
                >
                  <Repeat className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="mb-8 flex items-center gap-3 px-1">
              <Volume2 className="h-4 w-4 shrink-0 text-white/45" strokeWidth={2} />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="apple-music-volume h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#FFC107]"
                aria-label="Volume"
              />
            </div>

            <div className="mt-auto flex gap-3 pb-4">
              <button
                type="button"
                onClick={() => setLyricsOpen((o) => !o)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold ${
                  lyricsOpen
                    ? "bg-[#FFC107]/20 text-[#FFC107]"
                    : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                <Mic2 className="h-4 w-4" />
                Lyrics
              </button>
              <button
                type="button"
                onClick={() => setQueueOpen(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-sm font-semibold text-white/80 hover:bg-white/15"
              >
                <ListMusic className="h-4 w-4" />
                Up Next
              </button>
            </div>

            {lyricsOpen ? (
              <div className="mb-4 max-h-[28vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-center text-sm leading-relaxed text-white/55">
                Lyrics will appear here when available for this track.
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col pb-4">
            <h2 className="mb-4 text-xl font-bold text-white">Up Next</h2>
            <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto">
              {queue.map((song, index) => {
                const active = currentSong?.id === song.id;
                return (
                  <li key={song.id}>
                    <button
                      type="button"
                      onClick={() => playSong(song)}
                      className={`flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition ${
                        active ? "bg-[#FFC107]/15" : "hover:bg-white/8"
                      }`}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-zinc-800">
                        <Image
                          src={getPlayerArtworkSrc(song)}
                          alt=""
                          fill
                          className="object-cover object-center"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-semibold ${
                            active ? "text-[#FFC107]" : "text-white"
                          }`}
                        >
                          {song.title ?? "Untitled"}
                        </p>
                        <p className="truncate text-xs text-white/45">
                          {song.artist ?? "Shirwell Bancan"}
                        </p>
                      </div>
                      {active && isPlaying ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC107]">
                          Playing
                        </span>
                      ) : (
                        <span className="text-xs tabular-nums text-white/30">
                          {index + 1}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => setQueueOpen(false)}
              className="mt-4 rounded-full bg-white/10 py-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              Back to Now Playing
            </button>
          </div>
        )}
      </main>

      {!queueOpen ? (
        <div className="relative z-10 shrink-0 px-4 pb-2">
          <AdSenseLabel className="text-white/35" />
          <AdSenseEnterprisesUnit
            instanceId="music-bottom-enterprises"
            className="rounded-xl border border-white/10 bg-black/30 p-2"
          />
          <div className="mt-3">
            <AdSenseBoxUnit instanceId="music-bottom-box" className="rounded-xl border border-white/10 bg-black/30 p-2" />
          </div>
        </div>
      ) : null}

      <MusicEditorialArticle songCount={songs.length} />

      <BottomNav />
    </div>
  );
}
