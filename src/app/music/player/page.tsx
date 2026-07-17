import type { Metadata } from "next";
import { MusicPageContent } from "@/components/shirwell/music-page-content";
import { getSongs } from "@/lib/songs";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Now Playing",
  description: `Full-screen music player — ${SITE_NAME} songs with artwork, queue, and controls.`,
  alternates: { canonical: "/music/player" },
  robots: { index: false, follow: true },
};

export default async function MusicPlayerPage() {
  const songs = await getSongs();

  return <MusicPageContent songs={songs} />;
}
