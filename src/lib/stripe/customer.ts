import type { SupabaseClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";

export async function getOrCreateStripeCustomerId(
  stripe: Stripe,
  supabase: SupabaseClient,
  userId: string,
  email?: string | null,
): Promise<string> {
  const adminSupabase = createServiceRoleSupabaseClient() ?? supabase;
  const { data: existing } = await adminSupabase
    .from("user_entitlements")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .maybeSingle();

  const existingId = existing?.stripe_customer_id as string | null | undefined;
  if (existingId) return existingId;

  const customer = await stripe.customers.create({
    email: email ?? undefined,
    metadata: { supabase_user_id: userId },
  });

  return customer.id;
}
