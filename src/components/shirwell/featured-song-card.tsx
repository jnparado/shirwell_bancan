"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Play, Repeat, Shuffle } from "lucide-react";
import type { Song } from "@/types/song";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";

interface FeaturedSongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  /** Decorative time display when real duration is unknown */
  timeLabel?: string;
}

export function FeaturedSongCard({
  song,
  onPlay,
  timeLabel = "0:00 / 3:00",
}: FeaturedSongCardProps) {
  const artworkSrc = getPlayerArtworkSrc(song);
  const title = song.title ?? "Untitled";
  const artist = song.artist ?? "Shirwell Bancan";
  const [liked, setLiked] = useState(false);

  return (
    <article
      className="flex w-full max-w-sm flex-col rounded-2xl border border-white/[0.08] bg-[rgba(255,255,255,0.05)] p-3 shadow-inner backdrop-blur-md transition hover:border-[#FFC107]/20 hover:bg-[rgba(255,255,255,0.07)]"
    >
      {/* Artwork: portrait in gold ring + overlay controls */}
      <div className="relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-950/90">
        <div className="absolute inset-0 flex items-center justify-center pt-2">
          <div
            className="relative h-[58%] max-h-[200px] aspect-square shrink-0 rounded-full p-[5px]"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,193,7,0.55), rgba(180,140,40,0.35))",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-900 ring-2 ring-black/40">
              <Image
                src={artworkSrc}
                alt={title}
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 768px) 80vw, 240px"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-2 pt-8 text-[10px] font-medium text-white/90 sm:text-[11px]">
          <Shuffle className="h-3.5 w-3.5 shrink-0 text-white/70" strokeWidth={2} />
          <span className="tabular-nums tracking-tight">{timeLabel}</span>
          <Repeat className="h-3.5 w-3.5 shrink-0 text-white/70" strokeWidth={2} />
        </div>
      </div>

      <h3 className="text-lg font-bold leading-snug text-white">{title}</h3>
      <p className="mt-0.5 text-sm text-white/80">{artist}</p>
      <p className="mt-1 text-xs text-zinc-500">{title} min</p>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onPlay(song)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFC107] text-stone-950 shadow-[0_0_20px_rgba(255,193,7,0.35)] transition hover:bg-[#e6ae06]"
          aria-label={`Play ${title}`}
        >
          <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
        </button>
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className={`rounded-full p-2 transition ${
            liked ? "text-[#FFC107]" : "text-zinc-500 hover:text-white/80"
          }`}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <Heart
            className="h-6 w-6"
            strokeWidth={1.75}
            fill={liked ? "currentColor" : "none"}
          />
        </button>
      </div>
    </article>
  );
}
