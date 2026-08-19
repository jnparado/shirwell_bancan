import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAdTop, ContentPageAds } from "@/components/ads/content-page-ads";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { FAQ_ITEMS } from "@/lib/faq-content";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "FAQ — Shirwell Music",
  description:
    "Frequently asked questions about Shirwell Bancan music, streaming, Black Horse, Premium, flowers, and this official website.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ | ${SITE_NAME}`,
    description: "Answers about streaming, releases, Premium, ads, and contact.",
    url: "/faq",
  },
};

function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function FaqPage() {
  return (
    <>
      <JsonLdScript data={getFaqJsonLd()} />
      <div className="page-shell">
        <MarketingHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
          <header className={`${glassCard} p-6 sm:p-8`}>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#FFC107] sm:text-4xl">
              Frequently asked questions
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
              Answers about {SITE_NAME}, the official Shirwell music site, and how to
              stream, subscribe, and get support.
            </p>
          </header>

          <ContentPageAdTop className="mt-8 px-0 py-4" />

          <div className="mt-8 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <section key={item.question} className={`${glassCard} p-6 sm:p-8`}>
                <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
                  {item.question}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                  {item.answer}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-zinc-400">
            Still need help?{" "}
            <Link href="/support" className="text-[#FFC107] hover:underline">
              Support
            </Link>{" "}
            ·{" "}
            <Link href="/contact" className="text-[#FFC107] hover:underline">
              Contact
            </Link>
          </p>

          <ContentPageAds className="px-0 py-6" />
        </main>
        <BottomNav />
      </div>
    </>
  );
}
