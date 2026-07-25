/**
 * Apple In-App Purchase (StoreKit) — for the native Shirwell Music iOS app.
 *
 * Apple IAP does **not** run inside this Next.js website. Digital subscriptions
 * sold in an iOS app must use StoreKit. This module holds product IDs and server
 * helpers so the iOS app + API routes can grant premium access in Supabase.
 *
 * Setup (App Store Connect):
 * 1. Create a subscription group (e.g. "Shirwell Premium").
 * 2. Add products — IDs must match env vars below.
 * 3. Generate an In-App Purchase key + App Store Connect API key for server notifications.
 * 4. Set Server Notification URL to: https://your-domain.com/api/apple/iap/webhook
 * 5. In the iOS app, use StoreKit 2; after purchase, call POST /api/apple/iap/sync.
 *
 * @see https://developer.apple.com/documentation/storekit
 * @see https://developer.apple.com/documentation/appstoreservernotifications
 */

/** Monthly premium subscription (example product id — set in App Store Connect). */
export const APPLE_IAP_PRODUCT_PREMIUM_MONTHLY =
  process.env.APPLE_IAP_PRODUCT_PREMIUM_MONTHLY?.trim() ||
  "com.shirwell.premium.monthly";

/** Yearly premium subscription (optional). */
export const APPLE_IAP_PRODUCT_PREMIUM_YEARLY =
  process.env.APPLE_IAP_PRODUCT_PREMIUM_YEARLY?.trim() ||
  "com.shirwell.premium.yearly";

export const APPLE_IAP_PRODUCT_IDS = [
  APPLE_IAP_PRODUCT_PREMIUM_MONTHLY,
  APPLE_IAP_PRODUCT_PREMIUM_YEARLY,
] as const;

/** App Store listing URL (optional — shown on /premium). */
export const APPLE_APP_STORE_URL =
  process.env.NEXT_PUBLIC_APPLE_APP_STORE_URL?.trim() || "";

/** Enable when App Store Server JWS verification is wired in sync/webhook routes. */
export function isAppleJwsVerificationEnabled(): boolean {
  return process.env.APPLE_IAP_JWS_VERIFICATION_ENABLED === "true";
}

export function isAppleIapConfigured(): boolean {
  return Boolean(
    process.env.APPLE_APP_STORE_ISSUER_ID?.trim() &&
      process.env.APPLE_APP_STORE_KEY_ID?.trim() &&
      process.env.APPLE_APP_STORE_PRIVATE_KEY?.trim(),
  );
}

export type AppleEntitlementRow = {
  user_id: string;
  premium: boolean;
  source: string | null;
  product_id: string | null;
  apple_original_transaction_id: string | null;
  apple_expires_at: string | null;
  updated_at: string | null;
};

export { isPremiumActive, type UserEntitlementRow } from "@/lib/entitlements";
