/**
 * Shirwell Premium — product identifiers for web (SwG/RRM) and iOS (StoreKit).
 *
 * Google (Publisher Center → Reader Revenue Manager → Paywall):
 *   1. Content access → Paywall → +Select & proceed
 *   2. Add plan name, billing period, price → Next
 *   3. Product ID: e.g. `premium` → full id becomes `CAow5KfHDA:premium`
 *   4. Set pricing plan to **Live**, copy snippet product id into env below
 *
 * Apple (App Store Connect → Subscriptions):
 *   Create products matching APPLE_IAP_PRODUCT_* in src/lib/apple/iap.ts
 */

export {
  SWG_PREMIUM_PRODUCT_ID,
  isSwgPremiumConfigured,
} from "@/config/swg";

export {
  APPLE_IAP_PRODUCT_PREMIUM_MONTHLY,
  APPLE_IAP_PRODUCT_PREMIUM_YEARLY,
  APPLE_IAP_PRODUCT_IDS,
  APPLE_APP_STORE_URL,
} from "@/lib/apple/iap";
