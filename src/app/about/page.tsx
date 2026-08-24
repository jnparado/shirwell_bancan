import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAds } from "@/components/ads/content-page-ads";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ARTIST_STORY, RECORDING_PHILOSOPHY } from "@/lib/editorial-content";
import { BUSINESS_LOCATION, SUPPORT_EMAIL } from "@/config/contact";
import { absoluteUrl, getBrandFaqJsonLd, HOME_PATH, SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "About Shirwell Bancan — Shirwell Music",
  description:
    "About Shirwell Bancan — 45 years of original Shirwell music. Singer, songwriter, and performer Shirwell Bancan. Official Shirwell site.",
  keywords: ["shirwell bancan", "shirwell", "shirwell music", "about Shirwell"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Shirwell Bancan | Shirwell Music",
    description:
      "The story behind Shirwell and Shirwell Bancan — decades of original Shirwell music.",
    url: "/about",
    images: [{ url: "/about/shirwell-bancan-poster.png", alt: `${SITE_NAME} — 45 years of original songs` }],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLdScript data={getBrandFaqJsonLd(absoluteUrl(HOME_PATH))} />
      <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className="space-y-8">
          <header className={`${glassCard} overflow-hidden p-6 sm:p-8`}>
            <div className="relative mx-auto max-w-md">
              <Image
                src="/about/shirwell-bancan-poster.png"
                alt={`${SITE_NAME} — Experience 45 years of original songs`}
                width={560}
                height={860}
                className="h-auto w-full rounded-lg shadow-[0_0_48px_rgba(255,193,7,0.12)]"
                priority
              />
            </div>
            <div className="mt-8 text-center">
              <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
                About Shirwell Bancan — Shirwell Music
              </h1>
              <p className="mt-3 text-base font-medium tracking-wide text-zinc-200 sm:text-lg">
                Experience 45 Years of Original Songs
              </p>
              <p className="mt-1 text-sm text-zinc-400">From Shirwell Bancan</p>
            </div>
          </header>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <div className="space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <p>
                <strong className="text-zinc-200">{SITE_NAME}</strong> is a singer, songwriter,
                and producer with more than four decades of original music — a legacy built on
                passion, storytelling, and timeless melodies that connect with listeners of every
                age.
              </p>
              <p>
                From the stage to the studio, Shirwell brings showmanship and heart to every
                song. His work spans heartfelt ballads, driving originals, and performances that
                feel both classic and unmistakably his own. This site is the official home for
                streaming his catalogue, discovering new releases, and staying close to the music.
              </p>
              <p>
                <strong className="text-zinc-200">45 years. Countless songs. One extraordinary journey.</strong>{" "}
                Whether you are hearing Shirwell for the first time or have followed the music for
                years, welcome — you are part of a story that keeps growing.
              </p>
            </div>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">Background</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <p>
                Based in {BUSINESS_LOCATION}, Shirwell Bancan has spent more than 45 years
                writing, recording, and performing original music. The catalogue spans
                heartfelt ballads, driving rock originals, and stage performances built on
                storytelling and showmanship.
              </p>
              <p>
                Notable releases include the <strong className="text-zinc-200">Black Horse</strong>{" "}
                limited-edition vinyl — a collection of standout songs from decades on the road —{" "}
                alongside singles and albums streamed here on the official Shirwell music player.
              </p>
            </div>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              {ARTIST_STORY.title}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              {ARTIST_STORY.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              {RECORDING_PHILOSOPHY.title}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              {RECORDING_PHILOSOPHY.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">Career timeline</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <p>
                <strong className="text-zinc-200">1970s–1980s:</strong> Early rock and ballad
                writing, club dates, and the first studio demos that would later surface on
                releases such as Come on Babe and Baby Gonna Rock.
              </p>
              <p>
                <strong className="text-zinc-200">1990s–2000s:</strong> Stage-focused years —
                larger venues, expanded backing bands, and songs like Black Horse that tied
                visual showmanship to the music.
              </p>
              <p>
                <strong className="text-zinc-200">2010s–present:</strong> Digital masters,
                the Lily the Dancing Machine rock and club mixes, and the Black Horse anthology
                documenting 45 years of originals. The official player on this site streams
                approved masters; the{" "}
                <Link href="/discography" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Discography
                </Link>{" "}
                page explains each track.
              </p>
            </div>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">What you will find here</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <li>
                <Link href="/discography" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Discography
                </Link>{" "}
                — track-by-track notes for the Black Horse album and streaming catalogue.
              </li>
              <li>
                <Link href="/music" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Stream music
                </Link>{" "}
                — listen to original songs anytime on the Shirwell player.
              </li>
              <li>
                <Link href="/cds" className="text-[#FFC107] underline-offset-2 hover:underline">
                  CDs &amp; vinyl
                </Link>{" "}
                — physical releases including The Complete Collection and limited editions.
              </li>
              <li>
                <Link href="/flowers" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Flowers
                </Link>{" "}
                — Nati Roses and special bunches from a long-standing partnership.
              </li>
              <li>
                <Link href="/discography" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Discography
                </Link>{" "}
                — track-by-track notes for the Black Horse album and streaming catalogue.
              </li>
              <li>
                <Link href="/journal" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Journal
                </Link>{" "}
                — original essays on songwriting, touring, vinyl, and the catalogue.
              </li>
              <li>
                <Link href="/listening-guide" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Listening guide
                </Link>{" "}
                — curated path for first-time listeners.
              </li>
              <li>
                <Link href="/newsletter" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Newsletter
                </Link>{" "}
                — news, releases, and updates from Shirwell.
              </li>
              <li>
                <Link href="/premium" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Premium
                </Link>{" "}
                — unlimited streaming, early access, and member benefits.
              </li>
            </ul>
          </section>

          <section className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">Get in touch</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              Questions, bookings, or general enquiries:{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
              . For help using the site, visit our{" "}
              <Link href="/support" className="text-[#FFC107] underline-offset-2 hover:underline">
                Support
              </Link>{" "}
              page or the{" "}
              <Link href="/contact" className="text-[#FFC107] underline-offset-2 hover:underline">
                Contact
              </Link>{" "}
              page.
            </p>
            <p className="mt-6 border-t border-white/[0.08] pt-6 text-xs text-zinc-500">
              © {new Date().getFullYear()} {SITE_NAME}. Shirwell™ — All rights reserved.
            </p>
          </section>
        </article>
        <ContentPageAds />
      </main>
      <BottomNav />
    </div>
    </>
  );
}
