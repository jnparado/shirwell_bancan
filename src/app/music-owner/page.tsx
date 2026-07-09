import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Shirwell Music Owner",
  description: `All music on ${SITE_NAME} is owned by Shirwell Bancan — original songs, recordings, lyrics, and compositions.`,
  alternates: { canonical: "/music-owner" },
  openGraph: {
    title: `Shirwell Music Owner | ${SITE_NAME}`,
    description:
      "Ownership notice: every song streamed on this site belongs to Shirwell Bancan.",
    url: "/music-owner",
    images: [
      {
        url: "/home/princess-flower-shop.png",
        alt: `${SITE_NAME} — music owner`,
      },
    ],
  },
};

export default function MusicOwnerPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className="space-y-8">
          <header className={`${glassCard} overflow-hidden p-4 sm:p-8`}>
            <div className="mx-auto w-full max-w-sm sm:max-w-md">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#FFC107]/20 bg-black/40 shadow-[0_0_48px_rgba(255,193,7,0.1)]">
                <Image
                  src="/home/princess-flower-shop.png"
                  alt={`${SITE_NAME} — music owner`}
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 640px) 92vw, 448px"
                  quality={92}
                  priority
                />
              </div>
            </div>
            <div className="mt-8 text-center">
              <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
                Shirwell Music Owner
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-zinc-200 sm:text-lg">
                All music on this website is mine — written, performed, and owned by{" "}
                <strong className="text-[#FFC107]">{SITE_NAME}</strong>.
              </p>
            </div>
          </header>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              Ownership statement
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <p>
                I, <strong className="text-zinc-200">{SITE_NAME}</strong> (Shirwell), am the
                owner of the musical works made available on this site. That includes every
                original song you can stream in the{" "}
                <Link href="/music" className="text-[#FFC107] underline-offset-2 hover:underline">
                  music player
                </Link>
                , on the home page, in search results, and on physical releases such as CDs and
                vinyl.
              </p>
              <p>
                Unless clearly stated otherwise, nothing here is a cover, a third-party
                licence, or someone else&apos;s catalogue.{" "}
                <strong className="text-zinc-200">
                  The songs, recordings, lyrics, melodies, arrangements, and related artwork are
                  mine.
                </strong>
              </p>
            </div>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              What I own
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <li>
                <strong className="text-zinc-200">Compositions</strong> — lyrics, melodies, and
                song structures I wrote
              </li>
              <li>
                <strong className="text-zinc-200">Sound recordings</strong> — studio and live
                masters streamed on this site
              </li>
              <li>
                <strong className="text-zinc-200">Album art &amp; branding</strong> — cover
                images, logos, and promotional material tied to my music
              </li>
              <li>
                <strong className="text-zinc-200">Physical releases</strong> — CDs, vinyl, and
                related products sold under the Shirwell name
              </li>
            </ul>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              For listeners
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <p>
                You are welcome to listen here for your own enjoyment, explore the catalogue,
                and support the music through streaming, newsletter updates, Premium, or buying
                CDs and vinyl. Thank you for respecting that this work is personal and
                professionally protected.
              </p>
              <p>
                Listening on this site does <strong className="text-zinc-200">not</strong> give
                anyone rights to copy, re-upload, sample, remix, sell, or claim my songs as
                their own.
              </p>
            </div>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              Permissions &amp; licensing
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <p>
                If you want to use my music in a video, film, advert, public performance,
                sync project, or any commercial way, you need{" "}
                <strong className="text-zinc-200">written permission from me first</strong>.
                Unauthorised use is not allowed.
              </p>
              <p>
                For licensing, press, or rights questions, contact:{" "}
                <a
                  href="mailto:shirwellentertainment@gmail.com"
                  className="text-[#FFC107] underline-offset-2 hover:underline"
                >
                  shirwellentertainment@gmail.com
                </a>
                . Full legal terms are on our{" "}
                <Link href="/legal" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Legal
                </Link>{" "}
                page.
              </p>
            </div>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              More about Shirwell
            </h2>
            <ul className="mt-4 space-y-2 text-sm sm:text-[15px]">
              <li>
                <Link
                  href="/about"
                  className="text-[#FFC107] underline-offset-2 hover:underline"
                >
                  About Us
                </Link>{" "}
                — story and 45 years of original songs
              </li>
              <li>
                <Link
                  href="/music"
                  className="text-[#FFC107] underline-offset-2 hover:underline"
                >
                  Music player
                </Link>{" "}
                — listen to the catalogue
              </li>
              <li>
                <Link
                  href="/cds"
                  className="text-[#FFC107] underline-offset-2 hover:underline"
                >
                  CDs &amp; vinyl
                </Link>{" "}
                — physical releases
              </li>
            </ul>
            <p className="mt-6 border-t border-white/[0.08] pt-6 text-xs text-zinc-500">
              © {new Date().getFullYear()} {SITE_NAME}. Shirwell™ — All music rights reserved.
            </p>
          </section>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}
