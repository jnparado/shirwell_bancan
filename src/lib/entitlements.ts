export type UserEntitlementRow = {
  user_id: string;
  premium: boolean;
  source: string | null;
  product_id: string | null;
  apple_original_transaction_id: string | null;
  apple_expires_at: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  stripe_current_period_end: string | null;
  updated_at: string | null;
};

/** @deprecated Use UserEntitlementRow */
export type AppleEntitlementRow = UserEntitlementRow;

export function isPremiumActive(row: UserEntitlementRow | null | undefined): boolean {
  if (!row?.premium) return false;

  const now = Date.now();

  if (row.stripe_current_period_end) {
    return new Date(row.stripe_current_period_end).getTime() > now;
  }

  if (row.apple_expires_at) {
    return new Date(row.apple_expires_at).getTime() > now;
  }

  return true;
}

export function isStripeSubscriptionActive(row: UserEntitlementRow | null | undefined): boolean {
  if (!row?.stripe_subscription_id) return false;
  if (!row.stripe_current_period_end) return Boolean(row.premium);
  return new Date(row.stripe_current_period_end).getTime() > Date.now();
}
