import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAds } from "@/components/ads/content-page-ads";
import { ArticleParagraphsWithInArticleAd } from "@/components/ads/article-paragraphs-with-in-article-ad";
import { BUSINESS_NAME, SUPPORT_EMAIL } from "@/config/contact";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  getNewsletterIssue,
  NEWSLETTER_ISSUES,
} from "@/lib/newsletter-issues";
import { getNewsArticleJsonLd } from "@/lib/swg-jsonld";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

type Props = {
  params: Promise<{ issueId: string }>;
};

export async function generateStaticParams() {
  return NEWSLETTER_ISSUES.map((issue) => ({ issueId: issue.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { issueId } = await params;
  const issue = getNewsletterIssue(issueId);
  if (!issue) return { title: "Newsletter issue" };

  return {
    title: `${issue.headline} | Newsletter`,
    description: issue.summary,
    alternates: {
      canonical: `/newsletter/${issue.id}`,
      types: {
        "application/amp+html": `/newsletter/${issue.id}/amp`,
      },
    },
    openGraph: {
      title: `${issue.headline} | ${SITE_NAME}`,
      description: issue.summary,
      url: `/newsletter/${issue.id}`,
      images: [{ url: issue.src, alt: issue.alt }],
      type: "article",
      publishedTime: `${issue.id}T08:00:00+10:00`,
    },
  };
}

export default async function NewsletterIssuePage({ params }: Props) {
  const { issueId } = await params;
  const issue = getNewsletterIssue(issueId);
  if (!issue) notFound();

  const path = `/newsletter/${issue.id}`;

  return (
    <>
      <JsonLdScript data={getNewsArticleJsonLd(issue, path)} />
      <div className="page-shell">
        <MarketingHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
          <nav className="text-sm text-zinc-400">
            <Link href="/newsletter" className="text-[#FFC107] hover:underline">
              Newsletter
            </Link>
            <span className="mx-2">/</span>
            <span>{issue.dateLabel}</span>
          </nav>

          <ContentPageAds className="mt-6 px-0 py-4" placement="standard" />

          <article className={`${glassCard} swg-news-article mt-6 overflow-hidden`}>
            <header className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {issue.dateLabel}
              </p>
              <h1 className="mt-3 font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
                {issue.headline}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                {issue.summary}
              </p>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                <ArticleParagraphsWithInArticleAd
                  paragraphs={issue.body}
                  instanceId={`newsletter-${issue.id}`}
                  paragraphClassName=""
                />
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                By {SITE_NAME} · {BUSINESS_NAME} · Open access
              </p>
            </header>

            <div className="relative aspect-[4/5] w-full max-h-[720px] bg-black/40">
              <Image
                src={issue.src}
                alt={issue.alt}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>

            <footer className="space-y-4 border-t border-white/[0.06] p-6 text-sm text-zinc-400 sm:p-8">
              <p>
                This newsletter issue is published by {BUSINESS_NAME} and is free to read.
                Subscription and reader revenue features are managed through Google Reader
                Revenue Manager and Subscribe with Google. See our{" "}
                <Link href="/terms" className="text-[#FFC107] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#FFC107] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                Questions:{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-[#FFC107] hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </footer>
          </article>

          <ContentPageAds className="mt-8 px-0 py-4" placement="standard" />
        </main>
        <BottomNav />
      </div>
    </>
  );
}
