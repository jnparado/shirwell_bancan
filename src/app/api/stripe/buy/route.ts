import { NextResponse } from "next/server";
import { isStripeConfigured } from "@/config/stripe";
import { getStoreProduct } from "@/lib/products";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getOrCreateStripeCustomerId } from "@/lib/stripe/customer";
import { stripeProductLineItem } from "@/lib/stripe/product-checkout";
import { getStripe } from "@/lib/stripe/server";
import { absoluteUrl } from "@/lib/seo";

type BuyBody = {
  slug?: string;
};

/** One-time product purchase — requires signed-in user. */
export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Online checkout is not available yet. Contact us to order." },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payment service unavailable." }, { status: 503 });
  }

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
        signInUrl: `/auth/login?redirect=${encodeURIComponent(productPath)}`,
        signUpUrl: `/auth/login?mode=signup&redirect=${encodeURIComponent(productPath)}`,
      },
      { status: 401 },
    );
  }

  if (product.availability === "OutOfStock") {
    return NextResponse.json({ error: "This product is out of stock." }, { status: 409 });
  }

  const customerId = await getOrCreateStripeCustomerId(
    stripe,
    supabase,
    user.id,
    user.email,
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [stripeProductLineItem(product)],
    payment_method_types: ["card"],
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["AU", "NZ", "US", "GB"] },
    success_url: absoluteUrl(`${productPath}?purchase=success`),
    cancel_url: absoluteUrl(`${productPath}?purchase=cancel`),
    metadata: {
      supabase_user_id: user.id,
      product_slug: product.slug,
      product_sku: product.sku,
      product_name: product.name,
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
