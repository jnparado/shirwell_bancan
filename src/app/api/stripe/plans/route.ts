import { NextResponse } from "next/server";
import { isStripeConfigured } from "@/config/stripe";
import { getPremiumPlansPublic, PREMIUM_FEATURES } from "@/lib/premium/plans";

/** Public plan catalog — prices and features served from the backend. */
export async function GET() {
  return NextResponse.json({
    plans: getPremiumPlansPublic(),
    features: PREMIUM_FEATURES,
    stripeConfigured: isStripeConfigured(),
    paymentMethods: ["card"],
    currency: "AUD",
  });
}
