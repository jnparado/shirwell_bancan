import type Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getEntitlementByStripeCustomerId,
  getEntitlementByStripeSubscriptionId,
  upsertStripeEntitlement,
} from "@/lib/auth/premium";

const ACTIVE_STATUSES = new Set<Stripe.Subscription.Status>([
  "active",
  "trialing",
  "past_due",
]);

function periodEnd(subscription: Stripe.Subscription): Date | null {
  const end = subscription.current_period_end;
  return end ? new Date(end * 1000) : null;
}

function priceIdFromSubscription(subscription: Stripe.Subscription): string | null {
  const item = subscription.items.data[0];
  return item?.price?.id ?? null;
}

async function resolveUserId(
  supabase: SupabaseClient,
  subscription: Stripe.Subscription,
  customerId: string,
): Promise<string | null> {
  const fromMeta = subscription.metadata?.supabase_user_id?.trim();
  if (fromMeta) return fromMeta;

  const bySub = await getEntitlementByStripeSubscriptionId(supabase, subscription.id);
  if (bySub?.user_id) return bySub.user_id;

  const byCustomer = await getEntitlementByStripeCustomerId(supabase, customerId);
  if (byCustomer?.user_id) return byCustomer.user_id;

  return null;
}

export async function syncStripeSubscription(
  supabase: SupabaseClient,
  subscription: Stripe.Subscription,
): Promise<void> {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!customerId) return;

  const userId = await resolveUserId(supabase, subscription, customerId);
  if (!userId) return;

  const premium = ACTIVE_STATUSES.has(subscription.status);

  await upsertStripeEntitlement(supabase, {
    userId,
    premium,
    customerId,
    subscriptionId: subscription.id,
    priceId: priceIdFromSubscription(subscription),
    currentPeriodEnd: premium ? periodEnd(subscription) : null,
  });
}

export async function handleCheckoutCompleted(
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session,
  retrieveSubscription: (id: string) => Promise<Stripe.Subscription>,
): Promise<void> {
  const userId =
    session.client_reference_id?.trim() ||
    session.metadata?.supabase_user_id?.trim() ||
    null;

  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

  if (!userId || !subscriptionId) return;

  const subscription = await retrieveSubscription(subscriptionId);
  await syncStripeSubscription(supabase, subscription);
}

export async function handleSubscriptionDeleted(
  supabase: SupabaseClient,
  subscription: Stripe.Subscription,
): Promise<void> {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!customerId) return;

  const userId = await resolveUserId(supabase, subscription, customerId);
  if (!userId) return;

  await upsertStripeEntitlement(supabase, {
    userId,
    premium: false,
    customerId,
    subscriptionId: subscription.id,
    priceId: priceIdFromSubscription(subscription),
    currentPeriodEnd: null,
  });
}

export async function handleProductCheckoutCompleted(
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session,
): Promise<void> {
  if (session.mode !== "payment") return;

  const userId =
    session.client_reference_id?.trim() ||
    session.metadata?.supabase_user_id?.trim() ||
    null;

  const productSlug = session.metadata?.product_slug?.trim();
  if (!userId || !productSlug) return;

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const amountCents = session.amount_total ?? null;
  const currency = session.currency ?? "aud";

  await supabase.from("store_orders").upsert(
    {
      user_id: userId,
      product_slug: productSlug,
      product_name: session.metadata?.product_name ?? null,
      product_sku: session.metadata?.product_sku ?? null,
      amount_cents: amountCents,
      currency,
      stripe_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId,
      status: "paid",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_session_id" },
  );
}
