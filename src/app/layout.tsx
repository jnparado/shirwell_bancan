import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/contexts/player-context";
import { SiteFooter } from "@/components/shirwell/site-footer";
import { AdSenseScriptLoader } from "@/components/ads/adsense-script-loader";
import { GoogleAdsPageViewConversion } from "@/components/analytics/google-ads-page-view-conversion";
import { GoogleAdsTag } from "@/components/analytics/google-ads-tag";
import { GoogleAnalyticsScripts } from "@/components/analytics/google-analytics";
import { GoogleAnalyticsPageViews } from "@/components/analytics/google-analytics-page-views";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from "@/components/analytics/google-tag-manager";
import { SiteMarks } from "@/components/legal/site-marks";
import { LazyAiSupportChat } from "@/components/support/lazy-ai-support-chat";
import { AppleMusicMiniPlayer } from "@/components/shirwell/apple-music-mini-player";
import {
  createRootMetadata,
  getOrganizationWebsiteJsonLd,
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
  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <GoogleAdsTag />
        <GoogleTagManagerHead />
        <GoogleAnalyticsScripts />
      </head>
      <body className="min-h-full font-sans">
        <AdSenseScriptLoader />
        <GoogleTagManagerNoScript />
        <GoogleAnalyticsPageViews />
        <GoogleAdsPageViewConversion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationWebsiteJsonLd()),
          }}
        />
        <PlayerProvider>
          <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
            <SiteMarks />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <AppleMusicMiniPlayer />
            <LazyAiSupportChat />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
