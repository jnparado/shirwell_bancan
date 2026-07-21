import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SUPPORT_EMAIL } from "@/config/contact";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME} — website, music player, newsletter, and Shirwell Music app.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description: `Terms of Service for using ${SITE_NAME} and related services.`,
    url: "/terms",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-zinc-400">Last updated: 21 July 2026</p>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <p>
              These Terms of Service (“Terms”) apply to your use of the website, music player,
              newsletter, and related services operated by or on behalf of{" "}
              <strong className="text-zinc-200">{SITE_NAME}</strong> (“Shirwell”, “we”, “us”).
              By accessing or using our services (the “Services”), you agree to these Terms. If
              you do not agree, please do not use the Services.
            </p>
            <p>
              Our{" "}
              <Link href="/privacy" className="text-[#FFC107] underline-offset-2 hover:underline">
                Privacy Policy
              </Link>{" "}
              explains how we handle personal information. See{" "}
              <Link href="/policies" className="text-[#FFC107] underline-offset-2 hover:underline">
                Publication Policies
              </Link>{" "}
              for official policy URLs.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              1. The Services
            </h2>
            <p>
              The Services include the {SITE_NAME} website, streaming and playback of original
              music, newsletters and published news, product information (such as CDs and vinyl),
              account features, premium subscriptions (where offered), and support tools. We may
              add, change, or discontinue features at any time.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              2. Intellectual property
            </h2>
            <p>
              Unless stated otherwise, all content on the Services — including songs, recordings,
              lyrics, artwork, photographs, logos, newsletters, text, and design — is owned by or
              licensed to {SITE_NAME} and is protected by copyright, trademark, and other laws.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                You may listen to music and view content for personal, non-commercial use only,
                unless we give you written permission for another use.
              </li>
              <li>
                You may not copy, redistribute, sell, publicly perform, remix, sample, or create
                derivative works from our content without our prior written consent.
              </li>
            </ul>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              3. User accounts
            </h2>
            <p>
              If you create an account, you are responsible for keeping your sign-in details
              secure and for activity under your account. You agree to provide accurate
              information. We may suspend or close accounts that violate these Terms or that we
              reasonably believe are fraudulent or abusive.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              4. Acceptable use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the Services for any unlawful purpose;</li>
              <li>Access systems, accounts, or data you are not authorised to use;</li>
              <li>Interfere with or disrupt the Services, including by automated scraping;</li>
              <li>Upload malware or content that infringes others’ rights;</li>
              <li>Misrepresent your identity or relationship with Shirwell;</li>
              <li>Circumvent technical measures that protect content or the Services.</li>
            </ul>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              5. Third-party services
            </h2>
            <p>
              The Services may link to or integrate third parties (for example Google sign-in,
              Apple sign-in, advertising partners, Subscribe with Google, or external stores).
              Those services have their own terms and policies. We are not responsible for
              third-party websites or practices.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              6. Reader Revenue Manager &amp; Google subscriptions
            </h2>
            <p>
              Newsletter and reader offers may use{" "}
              <strong className="text-zinc-200">Google Reader Revenue Manager</strong> and{" "}
              <strong className="text-zinc-200">Subscribe with Google</strong>. When you
              subscribe or contribute through Google, billing and payment are handled by Google
              under its terms. You can manage or cancel Google-billed subscriptions in your
              Google Account settings.
            </p>
            <p>
              Open-access newsletter articles on this site are marked with structured data
              and the SwG CMS sync snippet so Google can verify access levels. Paid or
              registration-gated content (if added later) will be clearly labelled and will
              not show different content to users and crawlers (no cloaking).
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              7. Subscriptions (Apple In-App Purchase)
            </h2>
            <p>
              Premium subscriptions in the Shirwell Music iOS app are sold through Apple In-App
              Purchase. Payment, billing, renewal, cancellation, and refunds are handled by
              Apple under its terms.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              8. Disclaimers and liability
            </h2>
            <p>
              The Services are provided “as is” and “as available”. To the fullest extent
              permitted by law, we disclaim warranties of merchantability, fitness for a
              particular purpose, and non-infringement. Our total liability for any claim
              relating to the Services is limited to the greater of amounts you paid us in the
              twelve months before the claim or AUD $100, except where applicable law requires
              otherwise.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              9. Governing law
            </h2>
            <p>
              These Terms are governed by the laws of Australia. You submit to the
              non-exclusive jurisdiction of courts in Australia for disputes relating to the
              Services, subject to mandatory consumer protection laws in your country of
              residence.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              10. Changes
            </h2>
            <p>
              We may update these Terms from time to time. The “Last updated” date will change
              when we do. Continued use of the Services after changes means you accept the
              updated Terms.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              11. Contact
            </h2>
            <p>
              Questions about these Terms:{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
              . For help using the site, visit{" "}
              <Link href="/support" className="text-[#FFC107] underline-offset-2 hover:underline">
                Support
              </Link>
              .
            </p>

            <p className="mt-8 border-t border-white/[0.08] pt-6 text-xs text-zinc-500">
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>
          </div>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}
