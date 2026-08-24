import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  CustomerSupportBlock,
  getCustomerSupportJsonLd,
} from "@/components/shirwell/customer-support-block";
import { SUPPORT_GUIDES } from "@/lib/editorial-content";
import { SUPPORT_EMAIL } from "@/config/contact";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Support",
  description: `Customer support for ${SITE_NAME} — email ${SUPPORT_EMAIL}, help with music, newsletter, and subscriptions.`,
  alternates: { canonical: "/support" },
  openGraph: {
    title: `Support | ${SITE_NAME}`,
    description: `Customer support and contact information for ${SITE_NAME} and the Shirwell Music app.`,
    url: "/support",
  },
  robots: { index: true, follow: true },
};

export default function SupportPage() {
  return (
    <div className="page-shell">
      <JsonLdScript data={getCustomerSupportJsonLd()} />
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Customer support
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            Need help with the website or the Shirwell Music app? Use the contact details
            below, chat with our AI support assistant (gold button at the bottom-right of
            any page), or email us. Include your device type (iPhone/Android), app version,
            and what you were doing when the issue happened.
          </p>

          <div className="mt-6">
            <CustomerSupportBlock />
          </div>

          <div className={`${glassCard} mt-6 p-5`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              AI support chat
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Tap the chat button on any page for instant help with music playback,
              CDs &amp; vinyl, flowers, signing in, and common questions. For complex
              issues, the assistant will point you to email support.
            </p>
          </div>

          <div className={`${glassCard} mt-6 p-5`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              Quick checks
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Update the app to the latest version.</li>
              <li>Restart the app if audio won&apos;t play.</li>
              <li>Check your network connection (Wi‑Fi / mobile data).</li>
              <li>Try again later if you see a temporary loading error.</li>
            </ul>
          </div>

          <div className={`${glassCard} mt-6 p-5`}>
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              {SUPPORT_GUIDES.title}
            </h2>
            <div className="mt-4 space-y-5">
              {SUPPORT_GUIDES.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-sm font-semibold text-zinc-200">{section.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{section.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-3 text-sm text-zinc-300 sm:text-[15px]">
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              Helpful links
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/contact"
                className="rounded-full border border-[#FFC107]/20 bg-black/30 px-4 py-2 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/45 hover:bg-black/40"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="rounded-full border border-[#FFC107]/20 bg-black/30 px-4 py-2 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/45 hover:bg-black/40"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal"
                className="rounded-full border border-[#FFC107]/20 bg-black/30 px-4 py-2 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/45 hover:bg-black/40"
              >
                Legal
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
