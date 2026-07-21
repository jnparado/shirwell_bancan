import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import {
  BUSINESS_LOCATION,
  BUSINESS_NAME,
  SUPPORT_EMAIL,
  formatSupportPhoneDisplay,
  hasSupportPhone,
  supportMailto,
  supportTelHref,
} from "@/config/contact";
import { CustomerSupportBlock } from "@/components/shirwell/customer-support-block";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} — email ${SUPPORT_EMAIL} for bookings, enquiries, and support.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: `Get in touch with ${SITE_NAME} and ${BUSINESS_NAME}.`,
    url: "/contact",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Contact {SITE_NAME}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            {BUSINESS_NAME} publishes the official {SITE_NAME} website and Shirwell
            music catalogue. Use the details below for bookings, licensing questions,
            press enquiries, or help with your account.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className={`${glassCard} p-5`}>
              <h2 className="font-serif text-lg font-semibold text-[#FFC107]">Email</h2>
              <a
                href={supportMailto("Shirwell enquiry")}
                className="mt-3 inline-flex rounded-lg border border-[#FFC107]/25 bg-black/30 px-3 py-2 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/45 hover:bg-black/40"
              >
                {SUPPORT_EMAIL}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                We aim to reply within a few business days. Include your name, topic,
                and the best way to reach you.
              </p>
            </div>

            <div className={`${glassCard} p-5`}>
              <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
                {hasSupportPhone() ? "Phone" : "Location"}
              </h2>
              {hasSupportPhone() && supportTelHref() ? (
                <>
                  <a
                    href={supportTelHref()!}
                    className="mt-3 inline-flex rounded-lg border border-[#FFC107]/25 bg-black/30 px-3 py-2 text-sm font-semibold text-[#FFC107] transition hover:border-[#FFC107]/45 hover:bg-black/40"
                  >
                    {formatSupportPhoneDisplay()}
                  </a>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                    {BUSINESS_LOCATION}
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-3 text-sm text-zinc-300">{BUSINESS_LOCATION}</p>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                    Shirwell Bancan is an Australian singer-songwriter with more than 45
                    years of original music.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-8">
            <CustomerSupportBlock />
          </div>

          <section className="mt-8 space-y-3 text-sm text-zinc-300 sm:text-[15px]">
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
              Before you write
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                For playback or sign-in issues, try{" "}
                <Link href="/support" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Support
                </Link>{" "}
                or the AI chat on any page.
              </li>
              <li>
                For copyright or ownership questions, see{" "}
                <Link href="/music-owner" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Music Owner
                </Link>
                .
              </li>
              <li>
                For privacy or advertising disclosures, read our{" "}
                <Link href="/privacy" className="text-[#FFC107] underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
                .
              </li>
            </ul>
          </section>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}
