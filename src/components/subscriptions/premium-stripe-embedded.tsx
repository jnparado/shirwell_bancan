"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useMemo } from "react";

type PremiumStripeEmbeddedCheckoutProps = {
  publishableKey: string;
  clientSecret: string;
};

let stripePromise: Promise<Stripe | null> | null = null;

function getStripe(publishableKey: string): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

export function PremiumStripeEmbeddedCheckout({
  publishableKey,
  clientSecret,
}: PremiumStripeEmbeddedCheckoutProps) {
  const stripe = useMemo(() => getStripe(publishableKey), [publishableKey]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white">
      <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
