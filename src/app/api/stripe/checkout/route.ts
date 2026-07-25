import { NextResponse } from "next/server";
import {
  getStripePlanById,
  isStripeConfigured,
  stripeCheckoutLineItem,
} from "@/config/stripe";
import { createServerSupabaseClient, createServiceRoleSupabaseClient } from "@/lib/supabase/server";
import { getUserPremiumStatus } from "@/lib/auth/premium";
import { getStripe } from "@/lib/stripe/server";
import { absoluteUrl } from "@/lib/seo";

type CheckoutBody = {
  planId?: string;
  /** `embedded` = card form on /premium; `hosted` = redirect to Stripe (default). */
  uiMode?: "embedded" | "hosted";
};

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY." },
      { status: 503 },
    );
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
      { error: "Sign in to subscribe.", signInUrl: "/auth/login?next=/premium" },
      { status: 401 },
    );
  }

  let body: CheckoutBody = {};
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const plan = getStripePlanById(String(body.planId ?? ""));
  if (!plan) {
    return NextResponse.json({ error: "Choose a valid plan." }, { status: 400 });
  }

  const status = await getUserPremiumStatus(supabase, user.id);
  if (status.premium && status.entitlement?.stripe_subscription_id) {
    return NextResponse.json(
      { error: "You already have an active Premium subscription.", manage: true },
      { status: 409 },
    );
  }

  const adminSupabase = createServiceRoleSupabaseClient() ?? supabase;
  const { data: existing } = await adminSupabase
    .from("user_entitlements")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  let customerId = existing?.stripe_customer_id as string | null | undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
  }

  const embedded = body.uiMode === "embedded";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    ui_mode: embedded ? "embedded" : undefined,
    customer: customerId,
    client_reference_id: user.id,
    line_items: [stripeCheckoutLineItem(plan)],
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    ...(embedded
      ? {
          return_url: absoluteUrl(
            "/premium?checkout=success&session_id={CHECKOUT_SESSION_ID}",
          ),
        }
      : {
          success_url: absoluteUrl("/premium?checkout=success"),
          cancel_url: absoluteUrl("/premium?checkout=cancel"),
        }),
    metadata: {
      supabase_user_id: user.id,
      plan_id: plan.id,
    },
    subscription_data: {
      metadata: {
        supabase_user_id: user.id,
        plan_id: plan.id,
      },
    },
  });

  if (embedded) {
    if (!session.client_secret) {
      return NextResponse.json({ error: "Could not start embedded checkout." }, { status: 500 });
    }
    return NextResponse.json({ clientSecret: session.client_secret, planId: plan.id });
  }

  if (!session.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
