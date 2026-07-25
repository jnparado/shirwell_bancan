import { NextResponse } from "next/server";
import {
  getStripePublishableKey,
  isStripeConfigured,
  isStripeServerConfigured,
} from "@/config/stripe";

/** Public Stripe client config — publishable key served at runtime from server env. */
export async function GET() {
  const publishableKey = getStripePublishableKey();

  return NextResponse.json({
    stripeConfigured: isStripeConfigured(),
    paymentsEnabled: isStripeServerConfigured(),
    publishableKey: publishableKey.startsWith("pk_") ? publishableKey : null,
  });
}
