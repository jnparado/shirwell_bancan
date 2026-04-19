import type { Metadata } from "next";
import { MusicPageContent } from "@/components/shirwell/music-page-content";
import { getSongs } from "@/lib/songs";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Listen — Shirwell music",
  description:
    "Shirwell music player — stream Shirwell Bancan songs online with artwork, progress ring, and lyrics. Official Shirwell Bancan listening experience.",
  alternates: { canonical: "/music" },
  openGraph: {
    title: `Shirwell music | ${SITE_NAME}`,
    description:
      "Listen to Shirwell Bancan music in the full-screen player — Shirwell songs, streaming, and controls.",
    url: "/music",
  },
};

export default async function MusicPage() {
  const songs = await getSongs();

  return <MusicPageContent songs={songs} />;
}
