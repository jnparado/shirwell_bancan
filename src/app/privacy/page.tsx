import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} and Shirwell Music collect, use, and protect your information.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Privacy policy for ${SITE_NAME}, the website, and the Shirwell Music app.`,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Last updated: 25 April 2026
          </p>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <p>
              This policy describes how <strong className="text-zinc-200">{SITE_NAME}</strong>{" "}
              (“we”, “us”) handles personal information when you use our website (including
              pages served at{" "}
              <strong className="text-zinc-200">shirwell-bancan.vercel.app</strong>,{" "}
              <strong className="text-zinc-200">shirwell.com</strong>, and related Shirwell
              domains when applicable) and the{" "}
              <strong className="text-zinc-200">Shirwell Music</strong> mobile application
              (the “Services”).
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              1. Information we collect
            </h2>
            <p>Depending on how you use the Services, we may collect:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-zinc-200">Contact details</strong> you choose to
                provide (for example, an email address if you sign up for a newsletter or
                contact us).
              </li>
              <li>
                <strong className="text-zinc-200">Usage and technical data</strong> such as
                pages or screens viewed, approximate region, device type, operating system,
                app version, and diagnostic or performance data needed to operate and improve
                the Services.
              </li>
              <li>
                <strong className="text-zinc-200">Audio playback</strong> occurs on your
                device; we do not require access to your microphone for normal listening.
              </li>
            </ul>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              2. How we use information
            </h2>
            <p>We use the information above to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide, maintain, and secure the Services;</li>
              <li>Understand how the Services are used and improve them;</li>
              <li>Send optional communications you have agreed to receive;</li>
              <li>Comply with law and protect our rights and users.</li>
            </ul>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              3. Advertising
            </h2>
            <p>
              Our website may use <strong className="text-zinc-200">Google AdSense</strong> to
              show ads. Google uses cookies and similar technologies to serve and measure
              ads. How Google uses data from sites that use its services is described in{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                Google’s Partner Sites policy
              </a>
              . You can manage ad personalisation in{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                Google Ads Settings
              </a>
              .
            </p>
            <p>
              The Shirwell Music app may use <strong className="text-zinc-200">Google AdMob</strong>{" "}
              or other ad partners. Those partners may collect device and advertising
              identifiers to deliver and measure ads. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                Google’s Privacy Policy
              </a>{" "}
              for more on how Google handles data in ads products.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              4. Reader Revenue Manager &amp; Subscribe with Google
            </h2>
            <p>
              If you subscribe, contribute, or register through{" "}
              <strong className="text-zinc-200">Google Reader Revenue Manager</strong> or{" "}
              <strong className="text-zinc-200">Subscribe with Google</strong>, Google processes
              payment and account information according to{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                Google&apos;s Privacy Policy
              </a>
              . We receive information needed to grant access to newsletter or premium content
              (such as subscription status), not your full payment card details.
            </p>
            <p>
              To manage or cancel a subscription purchased through Google, use your Google
              Account subscription settings or the options provided in Subscribe with Google.
              For help, contact us at{" "}
              <a
                href="mailto:shirwellentertainment@gmail.com"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                shirwellentertainment@gmail.com
              </a>
              .
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              5. Cookies and local storage
            </h2>
            <p>
              The website may set cookies or use browser storage for essential functionality,
              preferences, analytics, or advertising (such as AdSense where enabled). You can
              control cookies through your browser settings.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">6. Sharing</h2>
            <p>
              We share information with service providers who help us host, deliver, and
              analyse the Services (for example, hosting and infrastructure providers and
              Google for ads or analytics where used). We do not sell your personal
              information for money. We may disclose information if required by law or to
              protect the safety and integrity of the Services.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              7. Storage and security
            </h2>
            <p>
              We use reasonable measures to protect information. No method of transmission over
              the internet is completely secure.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">8. Retention</h2>
            <p>
              We keep information only as long as needed for the purposes above, unless a
              longer period is required or permitted by law.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              9. Your choices and rights
            </h2>
            <p>
              Where applicable law gives you rights (including under the Australian Privacy Act
              1988 or other privacy laws), you may request access to or correction of your
              personal information, or object to or restrict certain processing. To make a
              request, contact us using the details below.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">10. Children</h2>
            <p>
              The Services are not directed at children under 13, and we do not knowingly collect
              personal information from them. If you believe we have collected such information,
              please contact us so we can delete it.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">
              11. International transfers
            </h2>
            <p>
              Our service providers may process data in countries other than Australia. When we
              disclose personal information overseas, we take steps consistent with applicable
              law.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">12. Changes</h2>
            <p>
              We may update this policy from time to time. The “Last updated” date at the top will
              change when we do. Continued use of the Services after changes means you accept the
              updated policy.
            </p>

            <h2 className="mt-10 font-serif text-lg font-semibold text-[#FFC107]">13. Contact</h2>
            <p>
              Questions about this policy:{" "}
              <a
                href="mailto:shirwellentertainment@gmail.com"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
              shirwellentertainment@gmail.com
              </a>
              , or our{" "}
              <Link href="/support" className="text-[#FFC107] underline-offset-2 hover:underline">
                Support
              </Link>{" "}
              page.
            </p>
          </div>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}
