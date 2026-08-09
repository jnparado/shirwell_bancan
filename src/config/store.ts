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

export const STORE_COMING_SOON_LABEL = "Coming soon";

export const STORE_COMING_SOON_HEADLINE =
  "Our product shop is coming soon. You can browse photos and sample pricing below — ordering is not open yet.";

export const STORE_PRICE_ESTIMATE_NOTE =
  "Prices shown are rough estimates only. Final prices will change according to the quality of each product.";
