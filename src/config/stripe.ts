/**
 * Stripe Premium subscriptions (card payments on web).
 *
 * Minimum setup — only API keys required (prices are created at checkout):
 *   STRIPE_SECRET_KEY=sk_test_...
 *   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
 *   STRIPE_WEBHOOK_SECRET=whsec_...
 *
 * Optional — use pre-created Dashboard prices instead of dynamic price_data:
 *   STRIPE_PRICE_PREMIUM_MONTHLY=price_...
 *   STRIPE_PRICE_PREMIUM_YEARLY=price_...
 */

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "";

export const STRIPE_PRICE_PREMIUM_MONTHLY =
  process.env.STRIPE_PRICE_PREMIUM_MONTHLY?.trim() ?? "";

export const STRIPE_PRICE_PREMIUM_YEARLY =
  process.env.STRIPE_PRICE_PREMIUM_YEARLY?.trim() ?? "";

export type StripePremiumPlan = {
  id: "monthly" | "yearly";
  label: string;
  description: string;
  displayAmount: string;
  currency: "aud";
  unitAmountCents: number;
  interval: "month" | "year";
  priceId: string;
};

export const STRIPE_PREMIUM_PLANS: StripePremiumPlan[] = [
  {
    id: "monthly",
    label: "Monthly",
    description: "Billed every month. Cancel anytime.",
    displayAmount: "A$9.99",
    currency: "aud",
    unitAmountCents: 999,
    interval: "month",
    priceId: STRIPE_PRICE_PREMIUM_MONTHLY,
  },
  {
    id: "yearly",
    label: "Yearly",
    description: "Best value — two months free vs monthly.",
    displayAmount: "A$99.99",
    currency: "aud",
    unitAmountCents: 9999,
    interval: "year",
    priceId: STRIPE_PRICE_PREMIUM_YEARLY,
  },
];

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY?.trim() &&
      STRIPE_PUBLISHABLE_KEY.startsWith("pk_"),
  );
}

export function isStripePublishableConfigured(): boolean {
  return STRIPE_PUBLISHABLE_KEY.startsWith("pk_");
}

export function getStripePlanById(planId: string): StripePremiumPlan | undefined {
  return STRIPE_PREMIUM_PLANS.find((plan) => plan.id === planId);
}

export function getStripePlanByPriceId(priceId: string): StripePremiumPlan | undefined {
  return STRIPE_PREMIUM_PLANS.find((plan) => plan.priceId === priceId);
}

/** Stripe Checkout line item — Dashboard price or dynamic price_data. */
export function stripeCheckoutLineItem(plan: StripePremiumPlan): {
  price?: string;
  quantity: number;
  price_data?: {
    currency: string;
    unit_amount: number;
    product_data: { name: string; description?: string };
    recurring: { interval: "month" | "year" };
  };
} {
  if (plan.priceId.startsWith("price_")) {
    return { price: plan.priceId, quantity: 1 };
  }

  return {
    quantity: 1,
    price_data: {
      currency: plan.currency,
      unit_amount: plan.unitAmountCents,
      product_data: {
        name: `Shirwell Premium — ${plan.label}`,
        description: plan.description,
      },
      recurring: { interval: plan.interval },
    },
  };
}
