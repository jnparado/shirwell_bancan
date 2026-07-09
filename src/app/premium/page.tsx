import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import {
  APPLE_APP_STORE_URL,
  APPLE_IAP_PRODUCT_PREMIUM_MONTHLY,
  APPLE_IAP_PRODUCT_PREMIUM_YEARLY,
} from "@/lib/apple/iap";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Premium",
  description: `Shirwell Premium — unlimited streaming and member benefits via Apple In-App Purchase on iOS.`,
  alternates: { canonical: "/premium" },
};

export default function PremiumPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            Shirwell Premium
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Unlimited streaming, early releases, and member perks
          </p>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <p>
              <strong className="text-zinc-200">Premium</strong> unlocks the full {SITE_NAME}{" "}
              listening experience — including premium tracks, early releases, and special
              member offers. On iPhone and iPad, subscriptions are sold through{" "}
              <strong className="text-zinc-200">Apple In-App Purchase</strong> (StoreKit) in
              the Shirwell Music app, as required by Apple for digital subscriptions.
            </p>

            <h2 className="mt-8 font-serif text-lg font-semibold text-[#FFC107]">
              What you get
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Unlimited streaming of premium songs</li>
              <li>Early access to new releases</li>
              <li>Member pricing on select flowers and bundles (where offered)</li>
              <li>Ad-light listening in the mobile app (where enabled)</li>
            </ul>

            <h2 className="mt-8 font-serif text-lg font-semibold text-[#FFC107]">
              Subscribe on Apple (iOS)
            </h2>
            <p>
              Open the <strong className="text-zinc-200">Shirwell Music</strong> app on your
              iPhone or iPad, sign in with the same account you use on this website, then
              choose Premium. Payment is handled securely by Apple. Your subscription renews
              automatically until you cancel in{" "}
              <strong className="text-zinc-200">Settings → Apple ID → Subscriptions</strong>.
            </p>

            {APPLE_APP_STORE_URL ? (
              <p>
                <a
                  href={APPLE_APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06]"
                >
                  Get the app on the App Store
                </a>
              </p>
            ) : (
              <p className="text-zinc-400">
                App Store link coming soon. Set{" "}
                <code className="text-zinc-300">NEXT_PUBLIC_APPLE_APP_STORE_URL</code> when the
                iOS app is live.
              </p>
            )}

            <h2 className="mt-8 font-serif text-lg font-semibold text-[#FFC107]">
              Restore purchases
            </h2>
            <p>
              Already subscribed? In the iOS app, tap <strong className="text-zinc-200">Restore
              purchases</strong> while signed in. We sync your Apple subscription to your Shirwell
              account automatically.
            </p>

            <h2 className="mt-8 font-serif text-lg font-semibold text-[#FFC107]">
              Product IDs (developers)
            </h2>
            <ul className="list-disc space-y-1 pl-5 font-mono text-xs text-zinc-400">
              <li>{APPLE_IAP_PRODUCT_PREMIUM_MONTHLY}</li>
              <li>{APPLE_IAP_PRODUCT_PREMIUM_YEARLY}</li>
            </ul>

            <p className="mt-8 text-xs text-zinc-500">
              Questions? See{" "}
              <Link href="/legal" className="text-[#FFC107] hover:underline">
                Legal
              </Link>
              ,{" "}
              <Link href="/privacy" className="text-[#FFC107] hover:underline">
                Privacy
              </Link>
              , or{" "}
              <Link href="/support" className="text-[#FFC107] hover:underline">
                Support
              </Link>
              .
            </p>
          </div>
        </article>
      </main>
      <BottomNav />
    </div>
  );
}
