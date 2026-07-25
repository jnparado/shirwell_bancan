import { NextResponse } from "next/server";
import { isStripeConfigured } from "@/config/stripe";
import { getStoreProduct } from "@/lib/products";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getOrCreateStripeCustomerId } from "@/lib/stripe/customer";
import { stripeProductLineItem } from "@/lib/stripe/product-checkout";
import { getStripe } from "@/lib/stripe/server";
import { absoluteUrl } from "@/lib/seo";

type CartCheckoutBody = {
  items?: { slug: string; quantity: number }[];
};

/** Checkout cart items — requires signed-in user. */
export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Checkout is not available yet." }, { status: 503 });
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

  if (!user) {
    return NextResponse.json(
      {
        error: "Sign in to checkout.",
        signInUrl: `/auth/login?redirect=${encodeURIComponent("/products/cart")}`,
      },
      { status: 401 },
    );
  }

  let body: CartCheckoutBody = {};
  try {
    body = (await request.json()) as CartCheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawItems = body.items ?? [];
  if (rawItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const lineItems: ReturnType<typeof stripeProductLineItem>[] = [];
  const slugs: string[] = [];

  for (const item of rawItems) {
    const product = getStoreProduct(item.slug);
    if (!product || product.availability === "OutOfStock") continue;
    const qty = Math.min(Math.max(Math.floor(item.quantity), 1), 10);
    slugs.push(product.slug);
    lineItems.push({
      ...stripeProductLineItem(product),
      quantity: qty,
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
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
    line_items: lineItems,
    payment_method_types: ["card"],
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["AU", "NZ", "US", "GB"] },
    success_url: absoluteUrl("/products/cart?purchase=success"),
    cancel_url: absoluteUrl("/products/cart?purchase=cancel"),
    metadata: {
      supabase_user_id: user.id,
      cart_slugs: slugs.join(","),
      order_type: "cart",
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
