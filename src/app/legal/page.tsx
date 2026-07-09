import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Legal",
  description: `Terms, copyright, and legal information for ${SITE_NAME} — official website and music services.`,
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `Legal | ${SITE_NAME}`,
    description: `Legal terms and intellectual property information for ${SITE_NAME}.`,
    url: "/legal",
  },
};

export default function LegalPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col pb-28">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Legal
          </h1>
          <p className="mt-2 text-sm text-zinc-400">Last updated: 9 July 2026</p>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <p>
              These terms and notices apply to your use of the website, music player, and
              related services operated by or on behalf of{" "}
              <strong className="text-zinc-200">{SITE_NAME}</strong> (“Shirwell”, “we”, “us”).
              By accessing or using our services (the “Services”), you agree to this page. If
              you do not agree, please do not use the Services.
            </p>
            <p>
              Our{" "}
              <Link href="/privacy" className="text-[#FFC107] underline-offset-2 hover:underline">
                Privacy Policy
              </Link>{" "}
              explains how we handle personal information and works together with this legal
              page.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              1. The Services
            </h2>
            <p>
              The Services include the {SITE_NAME} website (including pages at{" "}
              <strong className="text-zinc-200">shirwell.com</strong> and related domains),
              streaming and playback of original music, newsletters, product information
              (such as CDs and vinyl), promotional content, account features, and support
              tools. We may add, change, or discontinue features at any time.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              2. Intellectual property
            </h2>
            <p>
              Unless stated otherwise, all content on the Services — including songs, recordings,
              lyrics, artwork, photographs, logos, video, text, and design — is owned by or
              licensed to {SITE_NAME} and is protected by copyright, trademark, and other
              intellectual property laws.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                You may listen to music and view content through the Services for personal,
                non-commercial use only, unless we give you written permission for another use.
              </li>
              <li>
                You may not copy, download (except where we explicitly allow it), redistribute,
                sell, publicly perform, remix, sample, or create derivative works from our
                content without our prior written consent.
              </li>
              <li>
                The names <strong className="text-zinc-200">Shirwell</strong>,{" "}
                <strong className="text-zinc-200">Shirwell Bancan</strong>, and related logos
                and branding may not be used in a way that suggests endorsement or affiliation
                without permission.
              </li>
            </ul>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              3. User accounts
            </h2>
            <p>
              If you create an account, you are responsible for keeping your sign-in details
              secure and for activity under your account. You agree to provide accurate
              information and to update your profile when it changes. We may suspend or close
              accounts that violate these terms or that we reasonably believe are fraudulent or
              abusive.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              4. Acceptable use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the Services for any unlawful purpose or in violation of applicable law;</li>
              <li>Attempt to access systems, accounts, or data you are not authorised to use;</li>
              <li>Interfere with or disrupt the Services, including by automated scraping or overload;</li>
              <li>Upload malware or content that infringes others’ rights or is harmful;</li>
              <li>Misrepresent your identity or relationship with Shirwell;</li>
              <li>Circumvent technical measures that protect content or the Services.</li>
            </ul>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              5. Third-party services and links
            </h2>
            <p>
              The Services may link to or integrate third parties (for example Google sign-in,
              Apple sign-in, advertising partners, flower or product partners, or external
              stores). Those services have their own terms and policies. We are not responsible
              for third-party websites, products, or practices.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              6. Apple In-App Purchase (iOS)
            </h2>
            <p>
              Premium subscriptions in the Shirwell Music iOS app are sold through{" "}
              <strong className="text-zinc-200">Apple In-App Purchase</strong>. Payment,
              billing, renewal, cancellation, and refunds for those subscriptions are handled
              by Apple under its terms. To manage or cancel, use your Apple ID subscription
              settings. Restore purchases in the app while signed in to the same Shirwell
              account you use on this website.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              7. Products and promotions
            </h2>
            <p>
              Descriptions of CDs, vinyl, merchandise, flowers, or other offerings are for
              general information. Availability, pricing, and fulfilment may vary. Any purchase
              terms presented at checkout or by a partner seller apply to that transaction.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              8. Disclaimers
            </h2>
            <p>
              The Services are provided on an “as is” and “as available” basis. To the fullest
              extent permitted by law, we disclaim warranties of merchantability, fitness for a
              particular purpose, and non-infringement. We do not guarantee uninterrupted or
              error-free operation.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              9. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, {SITE_NAME} and its operators will not be
              liable for indirect, incidental, special, consequential, or punitive damages, or
              for loss of profits, data, or goodwill, arising from your use of the Services.
              Where liability cannot be excluded, our total liability for any claim relating to
              the Services is limited to the greater of (a) amounts you paid us for the
              relevant service in the twelve months before the claim, or (b) one hundred
              Australian dollars (AUD $100), except where applicable law requires otherwise.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              10. Indemnity
            </h2>
            <p>
              You agree to indemnify and hold harmless {SITE_NAME} and its operators from
              claims, losses, and expenses (including reasonable legal fees) arising from your
              misuse of the Services or breach of these terms.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              11. Governing law
            </h2>
            <p>
              These terms are governed by the laws of Australia, without regard to conflict-of-law
              rules. You submit to the non-exclusive jurisdiction of courts in Australia for
              disputes relating to the Services, subject to any rights you may have under
              mandatory consumer protection laws in your country of residence.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              12. Changes
            </h2>
            <p>
              We may update this legal page from time to time. The “Last updated” date will
              change when we do. Continued use of the Services after changes means you accept
              the updated terms.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              13. Contact
            </h2>
            <p>
              Legal or rights enquiries:{" "}
              <a
                href="mailto:shirwellentertainment@gmail.com"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                shirwellentertainment@gmail.com
              </a>
              . For general help, visit our{" "}
              <Link href="/support" className="text-[#FFC107] underline-offset-2 hover:underline">
                Support
              </Link>{" "}
              page.
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
