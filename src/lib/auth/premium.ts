import type { SupabaseClient } from "@supabase/supabase-js";
import { isPremiumActive, type UserEntitlementRow } from "@/lib/entitlements";

export async function getUserPremiumStatus(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ premium: boolean; entitlement: UserEntitlementRow | null }> {
  const { data } = await supabase
    .from("user_entitlements")
    .select(
      "user_id,premium,source,product_id,apple_original_transaction_id,apple_expires_at,stripe_customer_id,stripe_subscription_id,stripe_price_id,stripe_current_period_end,updated_at",
    )
    .eq("user_id", userId)
    .maybeSingle();

  const entitlement = (data as UserEntitlementRow | null) ?? null;
  return { premium: isPremiumActive(entitlement), entitlement };
}

export async function upsertAppleEntitlement(
  supabase: SupabaseClient,
  input: {
    userId: string;
    premium: boolean;
    productId?: string | null;
    originalTransactionId?: string | null;
    expiresAt?: string | null;
  },
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("user_entitlements").upsert(
    {
      user_id: input.userId,
      premium: input.premium,
      source: "apple",
      product_id: input.productId ?? null,
      apple_original_transaction_id: input.originalTransactionId ?? null,
      apple_expires_at: input.expiresAt ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  return { error: error?.message ?? null };
}

export async function upsertStripeEntitlement(
  supabase: SupabaseClient,
  input: {
    userId: string;
    premium: boolean;
    customerId?: string | null;
    subscriptionId?: string | null;
    priceId?: string | null;
    currentPeriodEnd?: Date | null;
  },
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("user_entitlements").upsert(
    {
      user_id: input.userId,
      premium: input.premium,
      source: "stripe",
      product_id: input.priceId ?? null,
      stripe_customer_id: input.customerId ?? null,
      stripe_subscription_id: input.subscriptionId ?? null,
      stripe_price_id: input.priceId ?? null,
      stripe_current_period_end: input.currentPeriodEnd
        ? input.currentPeriodEnd.toISOString()
        : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  return { error: error?.message ?? null };
}

export async function getEntitlementByStripeCustomerId(
  supabase: SupabaseClient,
  customerId: string,
): Promise<UserEntitlementRow | null> {
  const { data } = await supabase
    .from("user_entitlements")
    .select(
      "user_id,premium,source,product_id,apple_original_transaction_id,apple_expires_at,stripe_customer_id,stripe_subscription_id,stripe_price_id,stripe_current_period_end,updated_at",
    )
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  return (data as UserEntitlementRow | null) ?? null;
}

export async function getEntitlementByStripeSubscriptionId(
  supabase: SupabaseClient,
  subscriptionId: string,
): Promise<UserEntitlementRow | null> {
  const { data } = await supabase
    .from("user_entitlements")
    .select(
      "user_id,premium,source,product_id,apple_original_transaction_id,apple_expires_at,stripe_customer_id,stripe_subscription_id,stripe_price_id,stripe_current_period_end,updated_at",
    )
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle();

  return (data as UserEntitlementRow | null) ?? null;
}
