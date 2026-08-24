import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAdTop, ContentPageAds } from "@/components/ads/content-page-ads";
import { ArticleParagraphsWithInArticleAd } from "@/components/ads/article-paragraphs-with-in-article-ad";
import { LISTENING_GUIDE } from "@/lib/editorial-content";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Listening guide — Shirwell Music",
  description:
    "How to explore Shirwell Bancan's original music — where to start, Black Horse album order, and links to discography and streaming.",
  alternates: { canonical: "/listening-guide" },
  openGraph: {
    title: `Listening guide | ${SITE_NAME}`,
    description: "Curated path through 45 years of Shirwell originals.",
    url: "/listening-guide",
  },
};

export default function ListeningGuidePage() {
  const firstSection = LISTENING_GUIDE.sections[0];
  const restSections = LISTENING_GUIDE.sections.slice(1);

  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <header className={`${glassCard} p-6 sm:p-8`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Catalogue guide
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#FFC107] sm:text-4xl">
            {LISTENING_GUIDE.title}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-base">
            {LISTENING_GUIDE.intro}
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            <Link href="/music" className="text-[#FFC107] hover:underline">
              Open the player
            </Link>
            {" · "}
            <Link href="/discography" className="text-[#FFC107] hover:underline">
              Discography
            </Link>
            {" · "}
            <Link href="/newsletter/2024-05-26" className="text-[#FFC107] hover:underline">
              Newsletter listening issue
            </Link>
          </p>
        </header>

        <ContentPageAdTop className="mt-8 px-0 py-4" />

        <section className={`${glassCard} mt-8 p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107]">
            {firstSection.heading}
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <ArticleParagraphsWithInArticleAd
              paragraphs={firstSection.paragraphs}
              instanceId="listening-first"
            />
          </div>
        </section>

        {restSections.map((section) => (
          <section key={section.heading} className={`${glassCard} mt-6 p-6 sm:p-8`}>
            <h2 className="font-serif text-xl font-semibold text-[#FFC107]">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <ContentPageAds className="px-0 py-6" placement="both" />
      </main>
      <BottomNav />
    </div>
  );
}
