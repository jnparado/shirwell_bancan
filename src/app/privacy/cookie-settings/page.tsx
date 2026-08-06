import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { PrivacyCookieSettingsControl } from "@/components/consent/privacy-cookie-settings-control";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Privacy and cookie settings",
  description: `Change ad and cookie choices for ${SITE_NAME} (Google Privacy & messaging).`,
  alternates: { canonical: "/privacy/cookie-settings" },
  robots: { index: true, follow: true },
};

export default function PrivacyCookieSettingsPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10 sm:px-6">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107]">
            Privacy and cookie settings
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            If you are in the EEA, UK, or Switzerland, you can change your choices about
            ads and cookies on this website. Select the button below to open Google&apos;s
            consent message again.
          </p>
          <div className="mt-6">
            <PrivacyCookieSettingsControl variant="button" />
          </div>
          <p className="mt-6 text-xs text-zinc-500">
            In the <strong className="text-zinc-400">Shirwell Music</strong> app, open
            Settings → Privacy and cookie settings (or the equivalent menu item) to change
            choices managed by Google AdMob.
          </p>
          <p className="mt-4 text-xs text-zinc-500">
            <Link href="/privacy" className="text-[#FFC107] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}
