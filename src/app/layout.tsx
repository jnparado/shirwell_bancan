import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/contexts/player-context";
import { SiteFooter } from "@/components/shirwell/site-footer";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { GoogleAnalyticsScripts } from "@/components/analytics/google-analytics";
import { GoogleAnalyticsPageViews } from "@/components/analytics/google-analytics-page-views";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from "@/components/analytics/google-tag-manager";
import { SiteMarks } from "@/components/legal/site-marks";
import { AiSupportChat } from "@/components/support/ai-support-chat";
import { AppleMusicMiniPlayer } from "@/components/shirwell/apple-music-mini-player";
import { isAdSenseAllowedPath } from "@/config/ads";
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
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  const showAdSense = isAdSenseAllowedPath(pathname);

  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <GoogleTagManagerHead />
        <GoogleAnalyticsScripts />
        {showAdSense ? <AdSenseScript /> : null}
      </head>
      <body className="min-h-full font-sans">
        <GoogleTagManagerNoScript />
        <GoogleAnalyticsPageViews />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationWebsiteJsonLd()),
          }}
        />
        <PlayerProvider>
          <div className="flex min-h-full flex-col">
            <SiteMarks />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <AppleMusicMiniPlayer />
            <AiSupportChat />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
