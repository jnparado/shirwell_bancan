import type { Metadata } from "next";
import { MusicPageContent } from "@/components/shirwell/music-page-content";
import { getSongs } from "@/lib/songs";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Listen",
  description:
    "Play Shirwell Bancan tracks in the built-in music player — artwork, progress, and lyrics.",
  alternates: { canonical: "/music" },
  openGraph: {
    title: `Listen | ${SITE_NAME}`,
    description:
      "Stream Shirwell Bancan music with the full-screen player — featured songs and playback controls.",
    url: "/music",
  },
};

export default async function MusicPage() {
  const songs = await getSongs();

  return <MusicPageContent songs={songs} />;
}
