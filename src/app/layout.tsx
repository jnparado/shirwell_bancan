import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/contexts/player-context";
import { CartProvider } from "@/contexts/cart-context";
import { SiteChrome } from "@/components/layout/site-chrome";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { AdSenseHeadScript } from "@/components/ads/adsense-head-script";
import { AdSenseRouteFill } from "@/components/ads/adsense-route-fill";
import { AdSenseScriptWatcher } from "@/components/ads/adsense-script-watcher";
import { GoogleAdsPageViewConversion } from "@/components/analytics/google-ads-page-view-conversion";
import { GoogleAdsTag } from "@/components/analytics/google-ads-tag";
import { GoogleAnalyticsScripts } from "@/components/analytics/google-analytics";
import { GoogleAnalyticsPageViews } from "@/components/analytics/google-analytics-page-views";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from "@/components/analytics/google-tag-manager";
import { LazyAiSupportChat } from "@/components/support/lazy-ai-support-chat";
import { SwgHeadScript } from "@/components/subscriptions/swg-head-script";
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
        <AdSenseHeadScript />
      </head>
      <body className="min-h-full font-sans">
        {(await SwgHeadScript()) ?? null}
        <GoogleAdsTag />
        <GoogleTagManagerHead />
        <GoogleAnalyticsScripts />
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
