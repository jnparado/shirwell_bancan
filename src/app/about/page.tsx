import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { BrandLegalMarks } from "@/components/legal/brand-legal-marks";
import { SITE_NAME, getAboutPageJsonLd } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "About Shirwell Bancan — Shirwell Music",
  description: `About Shirwell Bancan — 45 years of original Shirwell music. Singer, songwriter, and performer ${SITE_NAME}.`,
  keywords: ["shirwell bancan", "shirwell", "shirwell music", "about Shirwell"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Shirwell Bancan | Shirwell Music`,
    description: `The story behind Shirwell and Shirwell Bancan — decades of original music.`,
    url: "/about",
    images: [{ url: "/about/shirwell-bancan-poster.png", alt: `${SITE_NAME} — 45 years of original songs` }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getAboutPageJsonLd()),
        }}
      />
      <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className="space-y-8">
          <header className={`${glassCard} overflow-hidden p-6 sm:p-8`}>
            <div className="relative mx-auto max-w-md">
              <Image
                src="/about/shirwell-bancan-poster.png"
                alt={`${SITE_NAME} — Experience 45 years of original songs`}
                width={800}
                height={800}
                className="h-auto w-full rounded-lg shadow-[0_0_48px_rgba(255,193,7,0.12)]"
                priority
              />
              <BrandLegalMarks />
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
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">What you will find here</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
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
                href="mailto:shirwellentertainment@gmail.com"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                shirwellentertainment@gmail.com
              </a>
              . For help using the site, visit our{" "}
              <Link href="/support" className="text-[#FFC107] underline-offset-2 hover:underline">
                Support
              </Link>{" "}
              page.
            </p>
            <p className="mt-6 border-t border-white/[0.08] pt-6 text-xs text-zinc-500">
              © {new Date().getFullYear()} {SITE_NAME}. Shirwell™ — All rights reserved.
            </p>
          </section>
        </article>
      </main>
      <BottomNav />
    </div>
    </>
  );
}
