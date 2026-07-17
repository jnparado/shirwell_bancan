import type { Metadata } from "next";
import { HomeContent } from "@/components/shirwell/home-content";
import { getSongs } from "@/lib/songs";
import {
  getBrandFaqJsonLd,
  getHomeCatalogueJsonLd,
  HOME_DESCRIPTION,
  HOME_TITLE,
  PRIMARY_KEYWORDS,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: [...PRIMARY_KEYWORDS, "Shirwell songs", "Shirwell official", "stream Shirwell"],
  alternates: { canonical: "/home" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/home",
  },
};

export default async function HomePage() {
  const songs = await getSongs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBrandFaqJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomeCatalogueJsonLd(songs)),
        }}
      />
      <HomeContent songs={songs} />
    </>
  );
}

