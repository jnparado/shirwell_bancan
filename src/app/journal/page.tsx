import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAdTop, ContentPageAds } from "@/components/ads/content-page-ads";
import { JOURNAL_ARTICLES } from "@/lib/journal-articles";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Journal — original essays by Shirwell Bancan",
  description:
    "Long-form original writing from Shirwell Bancan: songwriting, mixing, vinyl, touring New South Wales, and the Black Horse catalogue.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: `Journal | ${SITE_NAME}`,
    description: "Original essays on songwriting, touring, and independent publishing.",
    url: "/journal",
  },
};

export default function JournalIndexPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <header className={`${glassCard} p-6 sm:p-8`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Original writing
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#FFC107] sm:text-4xl">
            Journal
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-base">
            These essays are written by Shirwell Bancan and Shirwell Entertainment for
            listeners who want more than a stream. Each article is unique to this site —
            studio method, live work, vinyl, flowers on the road, and how the Black Horse
            anthology was chosen. They are not syndicated posts and not image-only pages.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Dated newsletter issues live on{" "}
            <Link href="/newsletter" className="text-[#FFC107] hover:underline">
              Newsletter
            </Link>
            . Track-by-track notes are on{" "}
            <Link href="/discography" className="text-[#FFC107] hover:underline">
              Discography
            </Link>
            .
          </p>
        </header>

        <ContentPageAdTop className="mt-8 px-0 py-4" />

        <ol className="mt-8 space-y-6">
          {JOURNAL_ARTICLES.map((article) => (
            <li key={article.slug} className={`${glassCard} p-6 sm:p-8`}>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {article.dateLabel}
              </p>
              <h2 className="mt-2 font-serif text-xl font-semibold text-[#FFC107] sm:text-2xl">
                <Link href={`/journal/${article.slug}`} className="hover:underline">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                {article.summary}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                {article.body[0]}
              </p>
              <Link
                href={`/journal/${article.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-[#FFC107] hover:underline"
              >
                Read the full essay →
              </Link>
            </li>
          ))}
        </ol>

        <ContentPageAds className="px-0 py-6" />
      </main>
      <BottomNav />
    </div>
  );
}
