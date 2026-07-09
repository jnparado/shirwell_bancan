"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/contexts/player-context";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";

/** Apple Music–style mini player — sits above the tab bar on non-/music pages. */
export function AppleMusicMiniPlayer() {
  const pathname = usePathname();
  const { currentSong, isPlaying, toggle, currentTime, duration } = usePlayer();
  const visible = pathname !== "/music" && Boolean(currentSong);

  useEffect(() => {
    if (visible) {
      document.documentElement.setAttribute("data-mini-player", "true");
    } else {
      document.documentElement.removeAttribute("data-mini-player");
    }
    return () => {
      document.documentElement.removeAttribute("data-mini-player");
    };
  }, [visible]);

  if (!visible || !currentSong) return null;

  const thumbSrc = getPlayerArtworkSrc(currentSong);
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  return (
    <div className="fixed bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom))] left-0 right-0 z-40 px-2 sm:px-3">
      <Link
        href="/music"
        className="mx-auto block max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#1c1c1e]/95 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition hover:bg-[#2c2c2e]/95"
        aria-label="Open full player"
      >
        <div
          className="h-[3px] bg-white/10"
          aria-hidden
        >
          <div
            className="h-full bg-[#fa2d48] transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-zinc-800">
            <Image
              src={thumbSrc}
              alt=""
              fill
              className="object-cover object-center"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {currentSong.title ?? "Untitled"}
            </p>
            <p className="truncate text-xs text-white/55">
              {currentSong.artist ?? "Shirwell Bancan"}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" fill="currentColor" />
            ) : (
              <Play className="h-5 w-5 pl-0.5" fill="currentColor" />
            )}
          </button>
        </div>
      </Link>
    </div>
  );
}
