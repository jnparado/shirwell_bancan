import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAds } from "@/components/ads/content-page-ads";
import { ArticleParagraphsWithInArticleAd } from "@/components/ads/article-paragraphs-with-in-article-ad";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { BUSINESS_NAME, SUPPORT_EMAIL } from "@/config/contact";
import {
  getJournalArticle,
  JOURNAL_ARTICLES,
} from "@/lib/journal-articles";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return { title: "Journal" };

  return {
    title: `${article.title} | Journal`,
    description: article.summary,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title: `${article.title} | ${SITE_NAME}`,
      description: article.summary,
      url: `/journal/${article.slug}`,
      type: "article",
      publishedTime: `${article.dateIso}T08:00:00+10:00`,
    },
  };
}

function articleJsonLd(article: NonNullable<ReturnType<typeof getJournalArticle>>) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: `${article.dateIso}T08:00:00+10:00`,
    author: { "@type": "Person", name: SITE_NAME },
    publisher: { "@type": "Organization", name: BUSINESS_NAME },
    mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`, siteUrl),
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLdScript data={articleJsonLd(article)} />
      <div className="page-shell">
        <MarketingHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
          <nav className="text-sm text-zinc-400">
            <Link href="/journal" className="text-[#FFC107] hover:underline">
              Journal
            </Link>
            <span className="mx-2">/</span>
            <span>{article.dateLabel}</span>
          </nav>

          <article className={`${glassCard} mt-6 p-6 sm:p-8`}>
            <header>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {article.dateLabel} · Essay
              </p>
              <h1 className="mt-3 font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
                {article.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                {article.summary}
              </p>
            </header>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              <ArticleParagraphsWithInArticleAd
                paragraphs={article.body}
                instanceId={`journal-${article.slug}`}
              />
            </div>
            <p className="mt-8 text-xs text-zinc-500">
              By {SITE_NAME} · {BUSINESS_NAME} · Questions:{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#FFC107] hover:underline">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </article>

          <p className="mt-8 text-center text-sm text-zinc-400">
            <Link href="/journal" className="text-[#FFC107] hover:underline">
              All journal essays
            </Link>
            {" · "}
            <Link href="/discography" className="text-[#FFC107] hover:underline">
              Discography
            </Link>
            {" · "}
            <Link href="/music" className="text-[#FFC107] hover:underline">
              Music player
            </Link>
          </p>

          <ContentPageAds className="mt-8 px-0 py-4" />
        </main>
        <BottomNav />
      </div>
    </>
  );
}
