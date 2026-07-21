"use client";

import Image from "next/image";
import Link from "next/link";
import { ContentPageAds } from "@/components/ads/content-page-ads";
import { NEWSLETTER_ISSUES } from "@/lib/newsletter-issues";

const glassCard =
  "rounded-2xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export function NewsletterPageContent() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Updates & Stories
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#FFC107] sm:text-4xl">
          Newsletter
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
          Read recent newsletter issues from Shirwell Bancan — news, releases, and stories
          from 45 years of original music. Each issue opens as a full article page.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {NEWSLETTER_ISSUES.map((issue) => (
          <Link
            key={issue.id}
            href={`/newsletter/${issue.id}`}
            className={`${glassCard} group overflow-hidden text-left shadow-[0_0_60px_rgba(255,193,7,0.06)] transition hover:border-[#FFC107]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]/50`}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={issue.src}
                alt={issue.alt}
                fill
                className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                <p className="text-xs font-semibold tracking-wide text-[#FFC107]">
                  {issue.dateLabel}
                </p>
                <p className="mt-1 font-serif text-sm font-semibold text-zinc-100">
                  {issue.headline}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-300">{issue.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className={`${glassCard} mx-auto mt-10 max-w-3xl p-6 sm:p-8`}>
        <h2 className="font-serif text-lg font-semibold text-[#FFC107]">About this newsletter</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
          The Shirwell newsletter covers new songs, vinyl and CD releases, live appearances,
          and community news. Each issue is published by Shirwell Entertainment, marked as
          open-access NewsArticle content for Google Reader Revenue Manager, and reflects
          original work — not syndicated or auto-generated material.
        </p>
        <p className="mt-4 text-sm text-zinc-400">
          Policies:{" "}
          <Link href="/terms" className="text-[#FFC107] hover:underline">
            Terms of Service
          </Link>
          {" · "}
          <Link href="/privacy" className="text-[#FFC107] hover:underline">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/policies" className="text-[#FFC107] hover:underline">
            Publication Policies
          </Link>
        </p>
      </section>

      <ContentPageAds />
    </main>
  );
}
