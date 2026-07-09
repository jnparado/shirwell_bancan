import type { SupabaseClient } from "@supabase/supabase-js";
import { isPremiumActive, type AppleEntitlementRow } from "@/lib/apple/iap";

export async function getUserPremiumStatus(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ premium: boolean; entitlement: AppleEntitlementRow | null }> {
  const { data } = await supabase
    .from("user_entitlements")
    .select("user_id,premium,source,product_id,apple_original_transaction_id,apple_expires_at,updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  const entitlement = (data as AppleEntitlementRow | null) ?? null;
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
