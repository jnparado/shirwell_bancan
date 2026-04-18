"use client";

import Image from "next/image";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { usePlayer } from "@/contexts/player-context";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";

export function NowPlayingBar() {
  const { currentSong, isPlaying, toggle, next, prev } = usePlayer();

  if (!currentSong) return null;

  const thumbSrc = getPlayerArtworkSrc(currentSong);

  return (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 px-3">
      <div className="mx-auto flex max-w-lg items-center gap-3 rounded-2xl border border-white/[0.08] bg-[rgba(255,255,255,0.05)] px-3 py-2.5 shadow-lg backdrop-blur-xl">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-zinc-900 ring-2 ring-[#FFC107]/35">
          <Image
            src={thumbSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="44px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#FFC107]/80">
            Playing Now
          </p>
          <p className="truncate text-sm font-semibold text-white">
            {currentSong.title ?? "Untitled"}
          </p>
          <p className="truncate text-xs text-zinc-400">
            {currentSong.artist ?? "—"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-white">
          <button
            type="button"
            onClick={prev}
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Previous track"
          >
            <SkipBack className="h-5 w-5" fill="currentColor" />
          </button>
          <button
            type="button"
            onClick={toggle}
            className="rounded-full p-2 hover:bg-white/10"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" fill="currentColor" />
            ) : (
              <Play className="h-6 w-6 pl-0.5" fill="currentColor" />
            )}
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Next track"
          >
            <SkipForward className="h-5 w-5" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}
