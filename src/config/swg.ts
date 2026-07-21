/**
 * Subscribe with Google — Basic subscriptions (Publisher Center CMS sync)
 *
 * Env:
 *   NEXT_PUBLIC_SWG_OPEN_ACCESS_PRODUCT_ID=CAow5KfHDA:openaccess
 *   NEXT_PUBLIC_SWG_PREMIUM_PRODUCT_ID=CAow5KfHDA:premium
 *
 * @see https://developers.google.com/news/subscribe/subscription-linking
 */

/** Publication prefix from Publisher Center (same for open access + paywall plans). */
export const SWG_PUBLICATION_PREFIX = "CAow5KfHDA";

export const DEFAULT_SWG_OPEN_ACCESS_PRODUCT_ID = `${SWG_PUBLICATION_PREFIX}:openaccess`;

export const DEFAULT_SWG_PREMIUM_PRODUCT_ID = `${SWG_PUBLICATION_PREFIX}:premium`;

export const SWG_OPEN_ACCESS_PRODUCT_ID =
  process.env.NEXT_PUBLIC_SWG_OPEN_ACCESS_PRODUCT_ID?.trim() ||
  DEFAULT_SWG_OPEN_ACCESS_PRODUCT_ID;

/** Paywall / Premium plan — create in Publisher Center and set plan to Live. */
export const SWG_PREMIUM_PRODUCT_ID =
  process.env.NEXT_PUBLIC_SWG_PREMIUM_PRODUCT_ID?.trim() ||
  DEFAULT_SWG_PREMIUM_PRODUCT_ID;

export const SWG_BASIC_SCRIPT_URL =
  "https://news.google.com/swg/js/v1/swg-basic.js";

export function isSwgConfigured(): boolean {
  return SWG_OPEN_ACCESS_PRODUCT_ID.length > 0;
}

export function isSwgPremiumConfigured(): boolean {
  return SWG_PREMIUM_PRODUCT_ID.length > 0;
}

/** Escape product id for safe inline script injection. */
export function escapeSwgProductId(productId: string): string {
  return productId.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export type SwgContentType = "NewsArticle";

export type SwgBasicInitOptions = {
  type?: SwgContentType;
  productId?: string;
  theme?: "light" | "dark";
  lang?: string;
};

export function buildSwgBasicInitScript({
  type = "NewsArticle",
  productId = SWG_OPEN_ACCESS_PRODUCT_ID,
  theme = "light",
  lang = "en",
}: SwgBasicInitOptions = {}): string {
  const safeId = escapeSwgProductId(productId);
  return `(self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
  basicSubscriptions.init({
    type: "${type}",
    isPartOfType: ["Product"],
    isPartOfProductId: "${safeId}",
    clientOptions: { theme: "${theme}", lang: "${lang}" },
  });
});`;
}
