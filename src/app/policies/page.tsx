import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { BUSINESS_NAME, SUPPORT_EMAIL } from "@/config/contact";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Publication Policies",
  description: `Official publication policies for ${SITE_NAME} — Terms of Service and Privacy Policy.`,
  alternates: { canonical: "/policies" },
  openGraph: {
    title: `Publication Policies | ${SITE_NAME}`,
    description: `Terms of Service and Privacy Policy URLs for ${SITE_NAME}.`,
    url: "/policies",
  },
  robots: { index: true, follow: true },
};

export default function PoliciesPage() {
  const termsUrl = absoluteUrl("/terms");
  const privacyUrl = absoluteUrl("/privacy");

  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Publication Policies
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            {BUSINESS_NAME} publishes {SITE_NAME} — original music, newsletters, and official
            news. Use the policy URLs below for Google Publisher Center, Subscribe with Google,
            and other platform registrations.
          </p>

          <section className="mt-8 space-y-4">
            <div className={`${glassCard} p-5 sm:p-6`}>
              <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
                Terms of Service
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                Rules for using the {SITE_NAME} website, music player, newsletter, and mobile app.
              </p>
              <p className="mt-3 break-all font-mono text-xs text-zinc-400">{termsUrl}</p>
              <Link
                href="/terms"
                className="mt-4 inline-flex rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06]"
              >
                Read Terms of Service
              </Link>
            </div>

            <div className={`${glassCard} p-5 sm:p-6`}>
              <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
                Privacy Policy
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                How we collect, use, and protect personal information — including cookies,
                analytics, and advertising (Google AdSense where enabled).
              </p>
              <p className="mt-3 break-all font-mono text-xs text-zinc-400">{privacyUrl}</p>
              <Link
                href="/privacy"
                className="mt-4 inline-flex rounded-full border border-[#FFC107]/35 px-5 py-2.5 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/55 hover:bg-black/30"
              >
                Read Privacy Policy
              </Link>
            </div>
          </section>

          <section className="mt-8 space-y-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              Reader Revenue Manager (Google)
            </h2>
            <p>
              {SITE_NAME} uses Google Reader Revenue Manager and Subscribe with Google for
              newsletter and reader offers. Google&apos;s compliance review checks that these
              policy URLs are public, that published articles include matching structured
              data (<code className="text-zinc-400">NewsArticle</code> +{" "}
              <code className="text-zinc-400">isPartOf</code> product ID), and that the SwG
              CMS sync snippet is present on article pages under{" "}
              <Link href="/newsletter" className="text-[#FFC107] hover:underline">
                /newsletter
              </Link>
              .
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">Publisher details</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-zinc-200">Publisher:</strong> {BUSINESS_NAME}
              </li>
              <li>
                <strong className="text-zinc-200">Publication:</strong> {SITE_NAME}
              </li>
              <li>
                <strong className="text-zinc-200">Contact:</strong>{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-[#FFC107] underline-offset-2 hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
              </li>
            </ul>
            <p className="pt-2 text-zinc-400">
              Related pages:{" "}
              <Link href="/legal" className="text-[#FFC107] underline-offset-2 hover:underline">
                Legal &amp; copyright
              </Link>
              ,{" "}
              <Link href="/contact" className="text-[#FFC107] underline-offset-2 hover:underline">
                Contact
              </Link>
              ,{" "}
              <Link href="/newsletter" className="text-[#FFC107] underline-offset-2 hover:underline">
                Newsletter
              </Link>
              .
            </p>
          </section>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}
