import type { Metadata } from "next";
import { MusicArtistPageContent } from "@/components/shirwell/music-artist-page-content";
import { getSongs } from "@/lib/songs";
import { ARTIST_HERO_POSTER, ARTIST_FULL_NAME } from "@/lib/music-app";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shirwell — Listen",
  description:
    "Stream Shirwell Bancan — 45 years of original songs. Official artist page with popular tracks and full catalogue.",
  alternates: { canonical: "/music" },
  openGraph: {
    title: `${ARTIST_FULL_NAME} | ${SITE_NAME}`,
    description:
      "Official Shirwell artist page — stream original songs, play the catalogue, and explore 45 years of music.",
    url: "/music",
    images: [
      {
        url: ARTIST_HERO_POSTER,
        alt: `${ARTIST_FULL_NAME} — 45 years of original songs`,
      },
    ],
  },
};

export default async function MusicPage() {
  const songs = await getSongs();

  return <MusicArtistPageContent songs={songs} />;
}
