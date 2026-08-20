/**
 * AdMob paid display ads — **Capacitor native shell only** (iOS/Android app).
 * Web browsers use AdSense (`src/config/ads.ts`).
 */

import {
  getAdmobBannerUnitIdForPlatform,
  getAdmobTestingDevices,
  isAdmobConfigured,
  isAdmobPaidAdsEnabled,
  isAdmobTestMode,
} from "@/lib/admob";

let initStarted = false;
let initComplete = false;

export function isCapacitorNativeApp(): boolean {
  if (typeof window === "undefined") return false;
  const cap = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } })
    .Capacitor;
  return Boolean(cap?.isNativePlatform?.());
}

/** Native app uses AdMob paid banners instead of web AdSense units. */
export function shouldUseAdMobNativeAds(): boolean {
  return isCapacitorNativeApp() && isAdmobConfigured();
}

/** Hide AdSense `<ins>` units when native AdMob banner is active. */
export function shouldShowAdSenseOnWeb(): boolean {
  if (typeof window === "undefined") return true;
  return !shouldUseAdMobNativeAds();
}

/** Initialize UMP + show paid AdMob adaptive banner at bottom of native WebView shell. */
export async function initAdMobNativePaidAds(): Promise<void> {
  if (typeof window === "undefined") return;
  if (!shouldUseAdMobNativeAds()) return;
  if (initStarted) return;
  initStarted = true;

  try {
    const { Capacitor } = await import("@capacitor/core");
    if (!Capacitor.isNativePlatform()) {
      initStarted = false;
      return;
    }

    const {
      AdMob,
      AdmobConsentStatus,
      BannerAdPosition,
      BannerAdSize,
    } = await import("@capacitor-community/admob");

    const testingDevices = getAdmobTestingDevices();
    await AdMob.initialize({
      testingDevices,
      initializeForTesting: isAdmobTestMode(),
      ...(Capacitor.getPlatform() === "ios"
        ? { requestTrackingAuthorization: true }
        : {}),
    });

    const [trackingInfo, consentInfo] = await Promise.all([
      Capacitor.getPlatform() === "ios"
        ? AdMob.trackingAuthorizationStatus()
        : Promise.resolve(null),
      AdMob.requestConsentInfo(),
    ]);

    if (
      Capacitor.getPlatform() === "ios" &&
      trackingInfo?.status === "notDetermined"
    ) {
      await AdMob.requestTrackingAuthorization();
    }

    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      await AdMob.showConsentForm();
    }

    const platform = Capacitor.getPlatform() === "ios" ? "ios" : "android";
    const adId = getAdmobBannerUnitIdForPlatform(platform);

    const options = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: isAdmobTestMode(),
    };

    await AdMob.showBanner(options);
    initComplete = true;

    document.documentElement.dataset.admobNative = "1";
    if (isAdmobPaidAdsEnabled()) {
      document.documentElement.dataset.admobPaid = "1";
    }
  } catch (error) {
    initStarted = false;
    console.warn("[AdMob] Native paid ads failed to initialize:", error);
  }
}

export function isAdMobNativeInitialized(): boolean {
  return initComplete;
}
