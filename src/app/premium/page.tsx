import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { PremiumCheckoutSection } from "@/components/subscriptions/premium-checkout-section";
import { ContentPageAdTop } from "@/components/ads/content-page-ads";
import { PREMIUM_EDITORIAL } from "@/lib/editorial-content";
import { SwgProductInit } from "@/components/subscriptions/swg-product-init";
import {
  APPLE_APP_STORE_URL,
  SWG_PREMIUM_PRODUCT_ID,
  isSwgPremiumEnabled,
} from "@/config/premium";
import { STRIPE_PUBLISHABLE_KEY } from "@/config/stripe";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getPremiumPlansPublic } from "@/lib/premium/plans";
import { getPremiumOfferJsonLd } from "@/lib/swg-jsonld";
import { isStripeServerConfigured } from "@/config/stripe";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Premium",
  description: `Shirwell Premium — plan details and secure card checkout. Unlimited streaming and member benefits.`,
  alternates: { canonical: "/premium" },
};

type PremiumPageProps = {
  searchParams: Promise<{ checkout?: string }>;
};

export default async function PremiumPage({ searchParams }: PremiumPageProps) {
  const headerStore = await headers();
  const host = headerStore.get("host");
  const swgPremium = isSwgPremiumEnabled(host);
  const stripeReady = isStripeServerConfigured();
  const plans = getPremiumPlansPublic();
  const { checkout } = await searchParams;
  const checkoutStatus =
    checkout === "success" ? "success" : checkout === "cancel" ? "cancel" : null;

  return (
    <div className="page-shell">
      {swgPremium ? <SwgProductInit productId={SWG_PREMIUM_PRODUCT_ID} /> : null}
      <JsonLdScript data={getPremiumOfferJsonLd()} />
      <MarketingHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className={`${glassCard} mb-8 p-6 sm:p-8`}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
            {PREMIUM_EDITORIAL.title}
          </h1>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            {PREMIUM_EDITORIAL.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          <p className="mt-5 text-sm text-zinc-400">
            Public tracks remain free on{" "}
            <Link href="/music" className="text-[#FFC107] hover:underline">
              Music
            </Link>
            . Read{" "}
            <Link href="/faq" className="text-[#FFC107] hover:underline">
              FAQ
            </Link>{" "}
            for ads and account questions.
          </p>
        </article>

        <ContentPageAdTop className="mb-8 px-0 py-4" />

        <div className="space-y-10 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
          <PremiumCheckoutSection
            checkoutStatus={checkoutStatus}
            publishableKey={STRIPE_PUBLISHABLE_KEY}
            initialPlans={plans}
            stripeReady={stripeReady}
          />

          <details className="rounded-xl border border-white/[0.06] bg-[#1a1b1e] p-4 sm:p-5">
              <summary className="cursor-pointer font-serif text-base font-semibold text-zinc-200">
                Other ways to subscribe
              </summary>
              <div className="mt-4 space-y-6 border-t border-white/[0.06] pt-4">
                {swgPremium ? (
                  <div>
                    <h3 className="font-medium text-[#FFC107]">Subscribe with Google</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      On desktop and Android, use{" "}
                      <strong className="text-zinc-300">Subscribe with Google</strong> when the
                      paywall prompt is live in Publisher Center.
                    </p>
                  </div>
                ) : null}

                <div>
                  <h3 className="font-medium text-[#FFC107]">Apple (iOS app)</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    iPhone and iPad subscriptions use{" "}
                    <strong className="text-zinc-300">Apple In-App Purchase</strong> in the
                    Shirwell Music app. Sign in with the same account as this website.
                  </p>
                  {APPLE_APP_STORE_URL ? (
                    <a
                      href={APPLE_APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex rounded-full border border-[#FFC107]/35 px-5 py-2 text-sm font-semibold text-[#FFC107] transition hover:bg-[rgba(255,193,7,0.08)]"
                    >
                      App Store
                    </a>
                  ) : null}
                </div>

                <div>
                  <h3 className="font-medium text-[#FFC107]">Restore purchases</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Subscribed on iOS? In the Shirwell Music app, tap{" "}
                    <strong className="text-zinc-300">Restore purchases</strong> while signed in.
                  </p>
                </div>
              </div>
            </details>

            <p className="text-xs text-zinc-500">
              Questions?{" "}
              <Link href="/support" className="text-[#FFC107] hover:underline">
                Support
              </Link>
              {" · "}
              <Link href="/terms" className="text-[#FFC107] hover:underline">
                Terms
              </Link>
              {" · "}
              <Link href="/privacy" className="text-[#FFC107] hover:underline">
                Privacy
              </Link>
              . {SITE_NAME} Premium — cancel anytime from your billing portal.
            </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
