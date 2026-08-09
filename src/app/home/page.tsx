import type { Metadata } from "next";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { BrandSeoSection } from "@/components/seo/brand-seo-section";
import { HomeContent } from "@/components/shirwell/home-content";
import { getSongs } from "@/lib/songs";
import {
  createSocialMetadata,
  getHomePageJsonLd,
  GOOGLE_SITE_VERIFICATION_TOKEN,
  HOME_DESCRIPTION,
  HOME_TITLE,
  DEFAULT_TITLE,
  PRIMARY_SEARCH_TERMS,
} from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  keywords: [...PRIMARY_SEARCH_TERMS, "Shirwell songs", "Shirwell official"],
  alternates: { canonical: "/home" },
  verification: {
    google: GOOGLE_SITE_VERIFICATION_TOKEN,
  },
  ...createSocialMetadata({
    title: DEFAULT_TITLE,
    description: HOME_DESCRIPTION,
    url: "/home",
  }),
};

export default async function HomePage() {
  const songs = await getSongs();
  return (
    <>
      <JsonLdScript data={getHomePageJsonLd(songs)} />
      <HomeContent songs={songs}>
        <BrandSeoSection />
      </HomeContent>
    </>
  );
}

