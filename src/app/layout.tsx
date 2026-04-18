import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/contexts/player-context";
import { SiteFooter } from "@/components/shirwell/site-footer";
import { AdSenseScript } from "@/components/ads/adsense-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-shirwell-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shirwell",
  description: "Music player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <AdSenseScript />
        <PlayerProvider>
          <div className="flex min-h-full flex-col">
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
