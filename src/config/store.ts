/** When true, products are visible but checkout / cart adds are disabled. */
export function isStoreComingSoon(): boolean {
  const env = process.env.NEXT_PUBLIC_STORE_COMING_SOON?.trim().toLowerCase();
  if (env === "false") return false;
  if (env === "true") return true;
  return true;
}

export function isStorePurchasingEnabled(): boolean {
  return !isStoreComingSoon();
}

export const STORE_COMING_SOON_LABEL = "Catalogue preview";

export const STORE_COMING_SOON_HEADLINE =
  "Browse official Shirwell products, photography, and estimated pricing. Checkout opens when each batch is ready to ship. This page is a permanent catalogue with product stories — not an empty shop under construction.";

export const STORE_PRICE_ESTIMATE_NOTE =
  "Prices shown are rough estimates only. Final prices will change according to the quality of each product.";
