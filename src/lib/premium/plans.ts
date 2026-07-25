import { STRIPE_PREMIUM_PLANS, type PremiumPlanId, type StripePremiumPlan } from "@/config/stripe";

const BASE_FEATURES = [
  "Unlimited music streaming",
  "Ad-free listening",
  "High quality audio",
  "Unique products",
] as const;

const PLAN_META: Record<
  PremiumPlanId,
  {
    features: readonly string[];
    billingNote: string;
    subscribeLabel: string;
    badge?: string;
    savingsNote?: string;
    highlighted?: boolean;
  }
> = {
  weekly: {
    features: BASE_FEATURES,
    billingNote: "per week",
    subscribeLabel: "Subscribe Weekly",
  },
  monthly: {
    features: [...BASE_FEATURES, "Priority customer support"],
    billingNote: "per month",
    subscribeLabel: "Subscribe Monthly",
    badge: "Most Popular",
    highlighted: true,
  },
  yearly: {
    features: [...BASE_FEATURES, "Priority customer support", "Exclusive content access"],
    billingNote: "per year",
    subscribeLabel: "Subscribe Yearly",
    badge: "Best Value",
    savingsNote: "Save $20",
  },
};

export type PremiumPlanPublic = StripePremiumPlan & {
  features: readonly string[];
  billingNote: string;
  subscribeLabel: string;
  badge?: string;
  savingsNote?: string;
  highlighted?: boolean;
};

export function getPremiumPlansPublic(): PremiumPlanPublic[] {
  return STRIPE_PREMIUM_PLANS.map((plan) => ({
    ...plan,
    ...PLAN_META[plan.id],
  }));
}

export function getPremiumPlanById(planId: string): PremiumPlanPublic | undefined {
  return getPremiumPlansPublic().find((plan) => plan.id === planId);
}

/** @deprecated use plan-specific features on PremiumPlanPublic */
export const PREMIUM_FEATURES = BASE_FEATURES;
