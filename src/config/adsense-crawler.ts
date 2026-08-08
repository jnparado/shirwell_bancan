import { PRODUCTION_SITE_URL } from "@/lib/seo";

/** HTML form field names (AdMob crawler access → Login parameters). */
export const ADSENSE_CRAWLER_USERNAME_FIELD = "username";
export const ADSENSE_CRAWLER_PASSWORD_FIELD = "password";

export const ADSENSE_CRAWLER_LOGIN_PATH = "/adsense/crawler-login";

/** Login-gated area the crawler should reach after POST (no ads required here). */
export const ADSENSE_CRAWLER_RESTRICTED_PATH =
  process.env.ADSENSE_CRAWLER_RESTRICTED_PATH?.trim() || "/profile";

export function getAdsenseCrawlerLoginUrl(siteOrigin?: string): string {
  const base =
    siteOrigin?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    PRODUCTION_SITE_URL;
  return `${base}${ADSENSE_CRAWLER_LOGIN_PATH}`;
}

export function getAdsenseCrawlerRestrictedUrl(siteOrigin?: string): string {
  const base =
    siteOrigin?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    PRODUCTION_SITE_URL;
  const path = ADSENSE_CRAWLER_RESTRICTED_PATH.startsWith("/")
    ? ADSENSE_CRAWLER_RESTRICTED_PATH
    : `/${ADSENSE_CRAWLER_RESTRICTED_PATH}`;
  return `${base}${path}`;
}

export function isAdsenseCrawlerLoginConfigured(): boolean {
  return Boolean(
    process.env.ADSENSE_CRAWLER_EMAIL?.trim() &&
      process.env.ADSENSE_CRAWLER_PASSWORD?.trim(),
  );
}
