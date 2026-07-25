import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { PremiumStripePlans } from "@/components/subscriptions/premium-stripe-plans";
import { SwgProductInit } from "@/components/subscriptions/swg-product-init";
import {
  APPLE_APP_STORE_URL,
  SWG_PREMIUM_PRODUCT_ID,
  isSwgPremiumConfigured,
  isSwgPremiumEnabled,
} from "@/config/premium";
import { isStripeConfigured, STRIPE_PREMIUM_PLANS, STRIPE_PUBLISHABLE_KEY } from "@/config/stripe";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getPremiumOfferJsonLd } from "@/lib/swg-jsonld";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Premium",
  description: `Shirwell Premium — unlimited streaming and member benefits. Subscribe with card (Stripe), Google, or Apple In-App Purchase.`,
  alternates: { canonical: "/premium" },
};

type PremiumPageProps = {
  searchParams: Promise<{ checkout?: string }>;
};

export default async function PremiumPage({ searchParams }: PremiumPageProps) {
  const headerStore = await headers();
  const host = headerStore.get("host");
  const swgPremium = isSwgPremiumEnabled(host);
  const stripeReady = isStripeConfigured();
  const stripePlans = STRIPE_PREMIUM_PLANS;
  const { checkout } = await searchParams;
  const checkoutStatus =
    checkout === "success" ? "success" : checkout === "cancel" ? "cancel" : null;

  return (
    <div className="page-shell">
      {swgPremium ? <SwgProductInit productId={SWG_PREMIUM_PRODUCT_ID} /> : null}
      <JsonLdScript data={getPremiumOfferJsonLd()} />
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
              member offers.
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
              Subscribe with card
            </h2>
            <p>
              Pay securely with <strong className="text-zinc-200">Visa, Mastercard, or Amex</strong>{" "}
              via Stripe. Choose monthly or yearly — cancel anytime from your billing portal.
            </p>
            <PremiumStripePlans
              checkoutStatus={checkoutStatus}
              stripeReady={stripeReady}
              publishableKey={STRIPE_PUBLISHABLE_KEY}
              plans={stripePlans}
            />

            {swgPremium ? (
              <>
                <h2 className="mt-8 font-serif text-lg font-semibold text-[#FFC107]">
                  Subscribe with Google
                </h2>
                <p>
                  On desktop and Android, you can also subscribe with{" "}
                  <strong className="text-zinc-200">Subscribe with Google</strong> (Reader
                  Revenue Manager). A subscription prompt may appear when your paywall is live
                  in Publisher Center.
                </p>
                <p className="font-mono text-xs text-zinc-500">
                  Product ID: {SWG_PREMIUM_PRODUCT_ID}
                </p>
              </>
            ) : null}

            <h2 className="mt-8 font-serif text-lg font-semibold text-[#FFC107]">
              Subscribe on Apple (iOS)
            </h2>
            <p>
              On iPhone and iPad, subscriptions are sold through{" "}
              <strong className="text-zinc-200">Apple In-App Purchase</strong> (StoreKit) in
              the Shirwell Music app, as required by Apple for digital subscriptions. Open the{" "}
              <strong className="text-zinc-200">Shirwell Music</strong> app, sign in with the
              same account you use on this website, then choose Premium. Payment is handled
              securely by Apple. Your subscription renews automatically until you cancel in{" "}
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
              <p className="text-zinc-300">
                Open the <strong className="text-zinc-200">App Store</strong> on your
                iPhone or iPad and search for{" "}
                <strong className="text-zinc-200">Shirwell Music</strong> to subscribe with
                Apple In-App Purchase.
              </p>
            )}

            <h2 className="mt-8 font-serif text-lg font-semibold text-[#FFC107]">
              Restore purchases
            </h2>
            <p>
              Already subscribed on iOS? In the Shirwell Music app, tap{" "}
              <strong className="text-zinc-200">Restore purchases</strong> while signed in. We
              sync your Apple subscription to your Shirwell account automatically.
            </p>

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
