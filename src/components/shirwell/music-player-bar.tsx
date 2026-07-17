"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
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
import { usePlayer } from "@/contexts/player-context";
import { isMusicAppRoute, isMusicPlayerRoute } from "@/lib/music-app";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";
import { formatTime } from "@/lib/player/format-time";

/** Spotify-style bottom player — full bar on desktop, compact above nav on mobile. */
export function MusicPlayerBar() {
  const pathname = usePathname();
  const {
    currentSong,
    isPlaying,
    toggle,
    next,
    prev,
    currentTime,
    duration,
    seek,
    shuffle,
    repeat,
    volume,
    toggleShuffle,
    toggleRepeat,
    setVolume,
  } = usePlayer();

  const onMusicApp = isMusicAppRoute(pathname);
  const onFullPlayer = isMusicPlayerRoute(pathname);
  const visible = Boolean(currentSong) && !onFullPlayer;

  useEffect(() => {
    if (visible) {
      document.documentElement.setAttribute("data-mini-player", "true");
      if (onMusicApp) {
        document.documentElement.setAttribute("data-music-app", "true");
      }
    } else {
      document.documentElement.removeAttribute("data-mini-player");
      document.documentElement.removeAttribute("data-music-app");
    }
    return () => {
      document.documentElement.removeAttribute("data-mini-player");
      document.documentElement.removeAttribute("data-music-app");
    };
  }, [visible, onMusicApp]);

  if (!visible || !currentSong) return null;

  const thumbSrc = getPlayerArtworkSrc(currentSong);
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const ratio = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0;
    if (duration > 0) seek(ratio * duration);
  }

  const playerHref = "/music/player";

  return (
    <div
      className="fixed bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom))] left-0 right-0 z-40 border-t border-white/[0.08] bg-[#121214]/95 backdrop-blur-xl lg:bottom-0"
    >
      <div
        className="hidden h-[3px] cursor-pointer bg-white/10 lg:block"
        onClick={handleSeek}
        role="slider"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" && duration > 0) seek(Math.min(duration, currentTime + 5));
          if (e.key === "ArrowLeft") seek(Math.max(0, currentTime - 5));
        }}
      >
        <div
          className="h-full bg-[#FFC107] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-[1920px] items-center gap-3 px-3 py-2 sm:px-4 lg:gap-6 lg:py-3">
        {/* Track info */}
        <Link
          href={playerHref}
          className="flex min-w-0 flex-1 items-center gap-3 lg:max-w-[30%]"
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-zinc-800 lg:h-14 lg:w-14">
            <Image
              src={thumbSrc}
              alt=""
              fill
              className="object-cover object-center"
              sizes="56px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white hover:underline">
              {currentSong.title ?? "Untitled"}
            </p>
            <p className="truncate text-xs text-zinc-400">
              {currentSong.artist ?? "Shirwell Bancan"}
            </p>
          </div>
        </Link>

        {/* Center controls — desktop */}
        <div className="hidden flex-col items-center gap-1 lg:flex lg:flex-1">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleShuffle}
              className={`rounded-full p-1.5 ${shuffle ? "text-[#FFC107]" : "text-zinc-400 hover:text-white"}`}
              aria-label="Shuffle"
              aria-pressed={shuffle}
            >
              <Shuffle className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={prev}
              className="text-zinc-300 hover:text-white"
              aria-label="Previous"
            >
              <SkipBack className="h-5 w-5" fill="currentColor" />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" fill="currentColor" />
              ) : (
                <Play className="h-4 w-4 pl-0.5" fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              onClick={next}
              className="text-zinc-300 hover:text-white"
              aria-label="Next"
            >
              <SkipForward className="h-5 w-5" fill="currentColor" />
            </button>
            <button
              type="button"
              onClick={toggleRepeat}
              className={`rounded-full p-1.5 ${repeat ? "text-[#FFC107]" : "text-zinc-400 hover:text-white"}`}
              aria-label="Repeat"
              aria-pressed={repeat}
            >
              <Repeat className="h-4 w-4" />
            </button>
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="w-10 text-right text-[11px] tabular-nums text-zinc-500">
              {formatTime(currentTime)}
            </span>
            <div
              className="h-1 flex-1 cursor-pointer rounded-full bg-white/15"
              onClick={handleSeek}
              role="presentation"
            >
              <div
                className="h-full rounded-full bg-[#FFC107]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="w-10 text-[11px] tabular-nums text-zinc-500">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Mobile play + progress */}
        <div className="flex flex-1 flex-col gap-1 lg:hidden">
          <div
            className="h-[3px] rounded-full bg-white/10"
            aria-hidden
          >
            <div
              className="h-full rounded-full bg-[#FFC107]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={toggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white lg:hidden"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="h-5 w-5 pl-0.5" fill="currentColor" />
          )}
        </button>

        {/* Volume + extras — desktop */}
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex lg:max-w-[30%]">
          <Link
            href={playerHref}
            className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
            aria-label="Lyrics and full player"
          >
            <Mic2 className="h-4 w-4" />
          </Link>
          <Link
            href={playerHref}
            className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
            aria-label="Queue"
          >
            <ListMusic className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-zinc-400 hover:text-[#1ed760]"
            aria-label="Save to library"
          >
            <Heart className="h-4 w-4" />
          </button>
          <Volume2 className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="apple-music-volume h-1 w-24 max-w-[120px] cursor-pointer appearance-none rounded-full bg-white/15 accent-[#FFC107]"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
