import { STRIPE_PREMIUM_PLANS, type StripePremiumPlan } from "@/config/stripe";

export const PREMIUM_FEATURES = [
  "Unlimited streaming of premium songs",
  "Early access to new releases",
  "Member pricing on select flowers & bundles",
  "Ad-light listening in the mobile app",
  "Premium badge on your Shirwell profile",
  "Cancel anytime — no lock-in",
] as const;

export type PremiumPlanPublic = StripePremiumPlan & {
  features: readonly string[];
  billingNote: string;
  popular?: boolean;
};

export function getPremiumPlansPublic(): PremiumPlanPublic[] {
  return STRIPE_PREMIUM_PLANS.map((plan) => ({
    ...plan,
    features: PREMIUM_FEATURES,
    billingNote:
      plan.id === "yearly"
        ? "Billed once per year · save vs monthly"
        : "Billed monthly · cancel anytime",
    popular: plan.id === "yearly",
  }));
}

export function getPremiumPlanById(planId: string): PremiumPlanPublic | undefined {
  return getPremiumPlansPublic().find((plan) => plan.id === planId);
}
