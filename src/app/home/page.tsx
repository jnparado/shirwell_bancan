import type { Metadata } from "next";
import { BrandSeoSection } from "@/components/seo/brand-seo-section";
import { HomeContent } from "@/components/shirwell/home-content";
import { getSongs } from "@/lib/songs";
import {
  getHomePageJsonLd,
  HOME_DESCRIPTION,
  HOME_TITLE,
  PRIMARY_SEARCH_TERMS,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  keywords: [...PRIMARY_SEARCH_TERMS, "Shirwell songs", "Shirwell official"],
  alternates: { canonical: "/home" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/home",
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default async function HomePage() {
  const songs = await getSongs();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomePageJsonLd(songs)),
        }}
      />
      <HomeContent songs={songs}>
        <BrandSeoSection />
      </HomeContent>
    </>
  );
}

