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

/** Production hosts where SwG / RRM is registered in Publisher Center. */
const SWG_ALLOWED_HOSTS = new Set([
  "shirwell-bancan.vercel.app",
  "www.shirwell-bancan.vercel.app",
]);

function hostFromSiteUrlEnv(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw.startsWith("http") ? raw : `https://${raw}`).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * SwG XHR calls fail on localhost (CORS / 4xx) — Google requires an approved domain.
 * Set NEXT_PUBLIC_SWG_ENABLED=true to force-load locally (still may fail without PC setup).
 */
export function isSwgHostAllowed(host?: string | null): boolean {
  if (process.env.NEXT_PUBLIC_SWG_ENABLED === "true") return true;

  const h = host?.trim().toLowerCase();
  if (h) {
    if (h.startsWith("localhost") || h.startsWith("127.0.0.1") || h.endsWith(".local")) {
      return false;
    }
    if (SWG_ALLOWED_HOSTS.has(h)) return true;
    const envHost = hostFromSiteUrlEnv();
    if (envHost && h === envHost) return true;
    return process.env.NODE_ENV === "production";
  }

  return process.env.NODE_ENV === "production";
}

export function isSwgConfigured(): boolean {
  return SWG_OPEN_ACCESS_PRODUCT_ID.length > 0;
}

export function isSwgEnabled(host?: string | null): boolean {
  return isSwgConfigured() && isSwgHostAllowed(host);
}

export function isSwgPremiumConfigured(): boolean {
  return SWG_PREMIUM_PRODUCT_ID.length > 0;
}

export function isSwgPremiumEnabled(host?: string | null): boolean {
  return isSwgPremiumConfigured() && isSwgHostAllowed(host);
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
