import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${SITE_NAME} and the Shirwell Music app.`,
  alternates: { canonical: "/support" },
  openGraph: {
    title: `Support | ${SITE_NAME}`,
    description: `Support and contact information for ${SITE_NAME} and the Shirwell Music app.`,
    url: "/support",
  },
};

export default function SupportPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col pb-28">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Support
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            Need help with the website or the Shirwell Music app? Use the contact option below
            and include your device type (iPhone/Android), app version, and what you were doing
            when the issue happened.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className={`${glassCard} p-5`}>
              <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
                Contact
              </h2>
              <p className="mt-2 text-sm text-zinc-300">
                Email:
              </p>
              <a
                href="mailto:hello@shirwell.example"
                className="mt-2 inline-flex rounded-lg border border-[#FFC107]/25 bg-black/30 px-3 py-2 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/45 hover:bg-black/40"
              >
                hello@shirwell.example
              </a>
              <p className="mt-3 text-xs text-zinc-500">
                Replace this email with your real support inbox when ready.
              </p>
            </div>

            <div className={`${glassCard} p-5`}>
              <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
                Quick checks
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                <li>Update the app to the latest version.</li>
                <li>Restart the app if audio won’t play.</li>
                <li>Check your network connection (Wi‑Fi / mobile data).</li>
                <li>Try again later if you see a temporary loading error.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 space-y-3 text-sm text-zinc-300 sm:text-[15px]">
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              Helpful links
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/privacy"
                className="rounded-full border border-[#FFC107]/20 bg-black/30 px-4 py-2 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/45 hover:bg-black/40"
              >
                Privacy Policy
              </Link>
              <Link
                href="/music"
                className="rounded-full border border-white/[0.08] bg-black/30 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-white/[0.14] hover:bg-black/40"
              >
                Music
              </Link>
              <Link
                href="/newsletter"
                className="rounded-full border border-white/[0.08] bg-black/30 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-white/[0.14] hover:bg-black/40"
              >
                Newsletter
              </Link>
            </div>
          </div>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}

