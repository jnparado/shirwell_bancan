import { NextResponse } from "next/server";
import { isStripeServerConfigured } from "@/config/stripe";
import { getStoreProduct } from "@/lib/products";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getOrCreateStripeCustomerId } from "@/lib/stripe/customer";
import { stripeProductLineItem } from "@/lib/stripe/product-checkout";
import { getStripe } from "@/lib/stripe/server";
import { absoluteUrl } from "@/lib/seo";
import { loginUrl } from "@/config/auth-routes";

type BuyBody = {
  slug?: string;
  /** `embedded` = card form in modal; `hosted` = redirect to Stripe (default). */
  uiMode?: "embedded" | "hosted";
};

/** One-time product purchase — requires signed-in user. */
export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Sign-in is not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let body: BuyBody = {};
  try {
    body = (await request.json()) as BuyBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const slug = String(body.slug ?? "").trim();
  const product = getStoreProduct(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const productPath = `/products/${product.slug}`;

  if (!user) {
    return NextResponse.json(
      {
        error: "Sign in or create an account to buy.",
        signInUrl: loginUrl({ redirect: productPath }),
        signUpUrl: loginUrl({ redirect: productPath, mode: "signup" }),
      },
      { status: 401 },
    );
  }

  if (product.availability === "OutOfStock") {
    return NextResponse.json({ error: "This product is out of stock." }, { status: 409 });
  }

  if (!isStripeServerConfigured()) {
    return NextResponse.json(
      { error: "Card payments are not configured yet. Add STRIPE_SECRET_KEY on the server." },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payment service unavailable." }, { status: 503 });
  }

  const customerId = await getOrCreateStripeCustomerId(
    stripe,
    supabase,
    user.id,
    user.email,
  );

  const embedded = body.uiMode === "embedded";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: embedded ? "embedded" : undefined,
    customer: customerId,
    client_reference_id: user.id,
    line_items: [stripeProductLineItem(product)],
    payment_method_types: ["card"],
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["AU", "NZ", "US", "GB"] },
    ...(embedded
      ? {
          return_url: absoluteUrl(
            `${productPath}?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
          ),
        }
      : {
          success_url: absoluteUrl(`${productPath}?purchase=success`),
          cancel_url: absoluteUrl(`${productPath}?purchase=cancel`),
        }),
    metadata: {
      supabase_user_id: user.id,
      product_slug: product.slug,
      product_sku: product.sku,
      product_name: product.name,
    },
  });

  if (embedded) {
    if (!session.client_secret) {
      return NextResponse.json({ error: "Could not start payment." }, { status: 500 });
    }
    return NextResponse.json({ clientSecret: session.client_secret });
  }

  if (!session.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
