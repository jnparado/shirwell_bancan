"use client";

import Image from "next/image";
import { MoreVertical } from "lucide-react";
import type { Song } from "@/types/song";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";

interface SongRowProps {
  song: Song;
  onPlay: (song: Song) => void;
}

export function SongRow({ song, onPlay }: SongRowProps) {
  return (
    <button
      type="button"
      onClick={() => onPlay(song)}
      className="flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-zinc-900/50 px-3 py-3 text-left backdrop-blur-sm transition hover:bg-zinc-800/60"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-900 ring-2 ring-[#FFC107]/25">
        <Image
          src={getPlayerArtworkSrc(song)}
          alt=""
          fill
          className="object-cover object-center"
          sizes="48px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-white">
          {song.title ?? "Untitled"}
        </p>
        <p className="truncate text-sm text-zinc-400">
          {song.artist ?? "—"}
        </p>
      </div>
      <span
        className="shrink-0 rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <MoreVertical className="h-5 w-5" />
      </span>
    </button>
  );
}
