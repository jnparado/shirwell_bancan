import type { Metadata } from "next";
import { MusicPageContent } from "@/components/shirwell/music-page-content";
import { getSongs } from "@/lib/songs";
import {
  getMusicPageJsonLd,
  MUSIC_PAGE_DESCRIPTION,
  MUSIC_PAGE_TITLE,
  PRIMARY_SEARCH_TERMS,
  SITE_NAME,
} from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: MUSIC_PAGE_TITLE,
  },
  description: MUSIC_PAGE_DESCRIPTION,
  alternates: { canonical: "/music" },
  keywords: [...PRIMARY_SEARCH_TERMS, "Shirwell songs", "stream Shirwell"],
  openGraph: {
    title: `Shirwell Music | ${SITE_NAME}`,
    description: MUSIC_PAGE_DESCRIPTION,
    url: "/music",
    images: [
      {
        url: "/about/shirwell-bancan-poster.png",
        alt: "Shirwell Bancan — Experience 45 Years of Original Songs",
      },
    ],
  },
  twitter: {
    title: MUSIC_PAGE_TITLE,
    description: MUSIC_PAGE_DESCRIPTION,
  },
};

export default async function MusicPage() {
  const songs = await getSongs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getMusicPageJsonLd(songs)),
        }}
      />
      <MusicPageContent songs={songs} />
    </>
  );
}
