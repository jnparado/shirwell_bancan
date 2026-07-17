"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Song } from "@/types/song";
import { usePlayer } from "@/contexts/player-context";
import { MarketingHeader } from "./marketing-header";
import { FeaturedSongCard } from "./featured-song-card";
import { HomePromo } from "./home-promo";
import { BottomNav } from "./bottom-nav";
import { AdSenseUnit } from "@/components/ads/adsense-unit";
import { BrandPhotoFrame } from "@/components/legal/brand-photo-frame";




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
    <div className="page-shell relative">
      <MarketingHeader />

      <main className="relative flex-1">
        {/* Hero — luxury gold gradient + glass */}
        <section className="border-b border-white/[0.06] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#FFC107]/15 bg-gradient-to-br from-[#1a1510] via-[#2a2218] to-[#14110e] p-[1px] shadow-[0_0_80px_rgba(255,193,7,0.08)]">
            <div className="rounded-[22px] bg-black/40 px-6 py-14 text-center backdrop-blur-md sm:px-12 sm:py-20">
              <h1 className="mx-auto max-w-4xl font-serif text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
                <span className="block text-white">
                  Shirwell Music — 45 years of songwriting
                </span>
                <span className="mt-3 block sm:mt-4">
                  <span className="text-white">Talent from </span>
                  <span className="text-[#FFC107]">Shirwell Bancan</span>
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Official Shirwell music by Shirwell Bancan — stream songs here. Explore
                featured tracks and the full player.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#featured"
                  className="inline-flex rounded-full bg-[#FFC107] px-8 py-3.5 text-base font-semibold text-stone-950 shadow-[0_0_32px_rgba(255,193,7,0.3)] transition hover:bg-[#e6ae06]"
                >
                  Explore Songs
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Shirwell talent */}
        <section className="border-b border-emerald-500/10 bg-gradient-to-b from-emerald-950/20 via-black/40 to-transparent px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
              <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                <Link
                  href="/flowers"
                  aria-label="View more — flowers, photos and video"
                  className="group relative block aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/70 shadow-[0_0_60px_rgba(16,185,129,0.12)] transition hover:border-emerald-400/35 hover:shadow-[0_0_72px_rgba(16,185,129,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:rounded-3xl"
                >
                  <BrandPhotoFrame
                    src="/home/princess-flower-shop.png"
                    alt="Princess — flower shop, dance, business and accounting for Shirwell"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    frameClassName="h-full w-full"
                    imageClassName="transition duration-300 group-hover:scale-[1.02]"
                  />
                </Link>
              </div>
              <div className="text-pretty">
                <h2 className="font-serif text-2xl font-bold tracking-tight text-emerald-400 sm:text-3xl">
                  Personal models, dancers, singers, and more
                </h2>
                <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
                  Shirwell has his own personal models, dancers, singers, and more—people
                  who travel with the shows, step in for concerts, and help with everything
                  else that keeps the music moving.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
                  <span className="font-semibold text-[#FFC107]">Princess</span> is highly
                  talented: she holds a bachelor&apos;s degree, works as an accountant and
                  business consultant, and is a standout dancer. She will head the dancing
                  team for concerts, and while Shirwell is traveling she will cover business
                  consulting and accounting—plus whatever else the road throws at the
                  company. One amazing person Shirwell found; outstanding talent like this
                  is not simple to find.
                </p>
                <p className="mt-6">
                  <Link
                    href="/flowers"
                    className="text-sm font-semibold text-[#FFC107] underline-offset-4 transition hover:text-[#FFD54F] hover:underline"
                  >
                    View more
                  </Link>
                </p>
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
            <p className="mb-4 text-sm leading-relaxed text-zinc-500">
              Shirwell music — songs by Shirwell Bancan. Press play on any card or open
              the{" "}
              <Link href="/music" className="text-[#FFC107] underline-offset-2 hover:underline">
                music player
              </Link>{" "}
              for the full experience.
            </p>
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

        <section
          aria-labelledby="about-shirwell-heading"
          className="border-t border-white/[0.05] px-4 py-10 sm:px-6 sm:py-14"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="about-shirwell-heading"
              className="font-serif text-xl font-semibold text-[#FFC107] sm:text-2xl"
            >
              Shirwell — official music by Shirwell Bancan
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              <strong className="font-medium text-zinc-300">Shirwell Bancan</strong> is the
              singer, songwriter, and owner of all Shirwell music on this site. For 45 years,
              Shirwell has written original songs loved by fans of every age. Stream the full
              catalogue on the{" "}
              <Link href="/music" className="text-[#FFC107] underline-offset-2 hover:underline">
                Shirwell music player
              </Link>
              , read the{" "}
              <Link href="/about" className="text-[#FFC107] underline-offset-2 hover:underline">
                about Shirwell Bancan
              </Link>{" "}
              story, or browse featured tracks above.
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
