import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/contexts/player-context";
import { CartProvider } from "@/contexts/cart-context";
import { SiteChrome } from "@/components/layout/site-chrome";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { GoogleSiteVerificationMeta } from "@/components/seo/google-site-verification-meta";
import { AdMobNativeProvider } from "@/components/ads/admob-native-provider";
import { AdSenseAccountMeta } from "@/components/ads/adsense-account-meta";
import { AdSenseHeadScript } from "@/components/ads/adsense-head-script";
import { AdSenseRouteFill } from "@/components/ads/adsense-route-fill";
import { AdSenseScriptWatcher } from "@/components/ads/adsense-script-watcher";
import { GoogleAdsPageViewConversion } from "@/components/analytics/google-ads-page-view-conversion";
import { GoogleAnalyticsPageViews } from "@/components/analytics/google-analytics-page-views";
import { GoogleTagManagerNoScript } from "@/components/analytics/google-tag-manager";
import { ThirdPartyScripts } from "@/components/third-party/third-party-scripts";
import { LazyAiSupportChat } from "@/components/support/lazy-ai-support-chat";
import { AppleMusicMiniPlayer } from "@/components/shirwell/apple-music-mini-player";
import { SiteFooter } from "@/components/shirwell/site-footer";
import {
  createRootMetadata,
  getOrganizationWebsiteJsonLd,
  getSiteUrl,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-shirwell-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = createRootMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080706",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const siteUrl = getSiteUrl({ host: headerStore.get("host") });

  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <GoogleSiteVerificationMeta />
        <AdSenseAccountMeta />
        <AdSenseHeadScript />
      </head>
      <body className="min-h-full font-sans">
        <ThirdPartyScripts />
        <AdMobNativeProvider />
        <AdSenseScriptWatcher />
        <AdSenseRouteFill />
        <GoogleTagManagerNoScript />
        <GoogleAnalyticsPageViews />
        <GoogleAdsPageViewConversion />
        <JsonLdScript data={getOrganizationWebsiteJsonLd(siteUrl)} />
        <PlayerProvider>
          <CartProvider>
          <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
            <div className="flex-1">{children}</div>
            <SiteChrome>
              <SiteFooter />
              <AppleMusicMiniPlayer />
              <LazyAiSupportChat />
            </SiteChrome>
          </div>
          </CartProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
