"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Song } from "@/types/song";
import { usePlayer } from "@/contexts/player-context";
import { MarketingHeader } from "./marketing-header";
import { FeaturedSongCard } from "./featured-song-card";
import { HomePromo } from "./home-promo";
import { BottomNav } from "./bottom-nav";
import { NowPlayingBar } from "./now-playing-bar";
import { AdSenseUnit } from "@/components/ads/adsense-unit";

interface HomeContentProps {
  songs: Song[];
}

export function HomeContent({ songs }: HomeContentProps) {
  const { setQueue, playSong } = usePlayer();

  useEffect(() => {
    setQueue(songs);
  }, [songs, setQueue]);

  const timeLabels = ["1:43 / 3:23", "0:52 / 2:41", "1:08 / 3:05"];

  return (
    <div className="relative flex min-h-full flex-1 flex-col pb-36">
      <MarketingHeader />

      <main className="relative flex-1">
        {/* Hero — luxury gold gradient + glass */}
        <section className="border-b border-white/[0.06] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#FFC107]/15 bg-gradient-to-br from-[#1a1510] via-[#2a2218] to-[#14110e] p-[1px] shadow-[0_0_80px_rgba(255,193,7,0.08)]">
            <div className="rounded-[22px] bg-black/40 px-6 py-14 text-center backdrop-blur-md sm:px-12 sm:py-20">
              <h2 className="mx-auto max-w-4xl font-serif text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
                <span className="block text-white">
                  Experience 45 years of song Writing and
                </span>
                <span className="mt-3 block sm:mt-4">
                  <span className="text-white">Talent From </span>
                  <span className="text-[#FFC107]">Shirwell Bancan.</span>
                </span>
              </h2>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#featured"
                  className="inline-flex rounded-full bg-[#FFC107] px-8 py-3.5 text-base font-semibold text-stone-950 shadow-[0_0_32px_rgba(255,193,7,0.3)] transition hover:bg-[#e6ae06]"
                >
                  Explore Music
                </a>
                <Link
                  href="/flowers"
                  className="inline-flex rounded-full border border-[#FFC107]/45 bg-[rgba(255,255,255,0.05)] px-8 py-3.5 text-base font-semibold text-[#FFC107] backdrop-blur-md transition hover:border-[#FFC107]/65 hover:bg-[rgba(255,255,255,0.08)]"
                >
                  Shop Flowers
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4 py-6 sm:px-6">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Advertisement
          </p>
          <AdSenseUnit className="rounded-xl border border-white/[0.06] bg-black/20 p-2" />
        </div>

        {/* Featured Songs — gold title, glass cards */}
        <section
          id="featured"
          className="border-b border-white/[0.05] px-4 py-10 sm:px-6 sm:py-14"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-[#FFC107] sm:text-3xl">
                Featured Songs
              </h2>
              <Link
                href="#featured"
                className="text-sm font-medium text-[#FFC107] underline-offset-4 hover:text-[#FFD54F] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {songs.map((song, i) => (
                <FeaturedSongCard
                  key={song.id}
                  song={song}
                  onPlay={playSong}
                  timeLabel={timeLabels[i % timeLabels.length]}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="px-4 py-6 sm:px-6">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Advertisement
          </p>
          <AdSenseUnit className="rounded-xl border border-white/[0.06] bg-black/20 p-2" />
        </div>

        <HomePromo />
      </main>

      <NowPlayingBar />
      <BottomNav />
    </div>
  );
}
