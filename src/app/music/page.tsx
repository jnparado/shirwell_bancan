import type { Metadata } from "next";
import { MusicPageContent } from "@/components/shirwell/music-page-content";
import { getSongs } from "@/lib/songs";
import {
  getMusicPageJsonLd,
  MUSIC_PAGE_DESCRIPTION,
  MUSIC_PAGE_TITLE,
  SITE_NAME,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: MUSIC_PAGE_TITLE,
  description: MUSIC_PAGE_DESCRIPTION,
  alternates: { canonical: "/music" },
  keywords: ["shirwell music", "shirwell", "shirwell bancan", "Shirwell songs", "stream Shirwell"],
  openGraph: {
    title: `Shirwell Music | ${SITE_NAME}`,
    description: MUSIC_PAGE_DESCRIPTION,
    url: "/music",
    images: [
      {
        url: "/about/shirwell-music-hero.png",
        alt: "Shirwell Music — Shirwell Bancan",
      },
    ],
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
