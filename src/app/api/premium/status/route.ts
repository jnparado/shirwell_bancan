import { NextResponse } from "next/server";
import { isStripeConfigured } from "@/config/stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUserPremiumStatus } from "@/lib/auth/premium";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({
      premium: false,
      configured: false,
      stripeConfigured: isStripeConfigured(),
    }, { status: 503 });
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) {
    return NextResponse.json({
      premium: false,
      signedIn: false,
      stripeConfigured: isStripeConfigured(),
    });
  }

  const status = await getUserPremiumStatus(supabase, user.id);
  const entitlement = status.entitlement;

  return NextResponse.json({
    premium: status.premium,
    signedIn: true,
    source: entitlement?.source ?? null,
    productId: entitlement?.product_id ?? null,
    expiresAt:
      entitlement?.stripe_current_period_end ??
      entitlement?.apple_expires_at ??
      null,
    stripeConfigured: isStripeConfigured(),
  });
}
