import { NextResponse } from "next/server";
import { isStripeServerConfigured } from "@/config/stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";
import { getUserPremiumStatus } from "@/lib/auth/premium";
import { getStripe } from "@/lib/stripe/server";
import { absoluteUrl } from "@/lib/seo";
import { loginUrl } from "@/config/auth-routes";

export async function POST() {
  if (!isStripeServerConfigured()) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe unavailable." }, { status: 503 });
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Auth is not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Sign in required.", signInUrl: loginUrl({ redirect: "/premium" }) },
      { status: 401 },
    );
  }

  const status = await getUserPremiumStatus(supabase, user.id);
  const customerId = status.entitlement?.stripe_customer_id;

  if (!customerId) {
    return NextResponse.json(
      { error: "No Stripe subscription found for this account." },
      { status: 404 },
    );
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: absoluteUrl("/premium"),
  });

  return NextResponse.json({ url: portal.url });
}
