import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAdTop, ContentPageAds } from "@/components/ads/content-page-ads";
import { DISCOGRAPHY_ENTRIES, DISCOGRAPHY_INTRO } from "@/lib/discography";
import { BLACK_HORSE_ALBUM_TITLE } from "@/lib/black-horse-album";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Discography — Shirwell Music",
  description:
    "Track-by-track guide to Shirwell Bancan songs — Black Horse anthology, release years, and stories behind the official catalogue.",
  alternates: { canonical: "/discography" },
  openGraph: {
    title: `Discography | ${SITE_NAME}`,
    description: `Complete track notes for ${BLACK_HORSE_ALBUM_TITLE} and the Shirwell streaming catalogue.`,
    url: "/discography",
  },
};

export default function DiscographyPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <header className={`${glassCard} p-6 sm:p-8`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Catalogue
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#FFC107] sm:text-4xl">
            Discography
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-base">
            {DISCOGRAPHY_INTRO}
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            <Link href="/music" className="text-[#FFC107] hover:underline">
              Stream now
            </Link>
            {" · "}
            <Link href="/cds" className="text-[#FFC107] hover:underline">
              CD artwork
            </Link>
            {" · "}
            <Link href="/about" className="text-[#FFC107] hover:underline">
              About Shirwell
            </Link>
          </p>
        </header>

        <ContentPageAdTop className="mt-8 px-0 py-4" />

        <ol className="mt-8 space-y-6">
          {DISCOGRAPHY_ENTRIES.map((entry, index) => (
            <li
              key={entry.slug}
              className={`${glassCard} p-6 sm:p-8`}
              id={entry.slug}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Track {index + 1}
                {entry.year ? ` · ${entry.year}` : null}
              </p>
              <h2 className="mt-2 font-serif text-xl font-semibold text-[#FFC107] sm:text-2xl">
                {entry.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                {entry.description}
              </p>
            </li>
          ))}
        </ol>

        <section className={`${glassCard} mt-10 p-6 sm:p-8`}>
          <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
            More to explore
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            Read long-form updates in the{" "}
            <Link href="/newsletter" className="text-[#FFC107] hover:underline">
              Newsletter
            </Link>
            , browse{" "}
            <Link href="/faq" className="text-[#FFC107] hover:underline">
              frequently asked questions
            </Link>
            , or learn how Shirwell built a 45-year catalogue on the{" "}
            <Link href="/about" className="text-[#FFC107] hover:underline">
              About
            </Link>{" "}
            page.
          </p>
        </section>

        <ContentPageAds className="px-0 py-6" placement="both" />
      </main>
      <BottomNav />
    </div>
  );
}
