import type { Metadata } from "next";
import { HomeContent } from "@/components/shirwell/home-content";
import { getSongs } from "@/lib/songs";
import { HOME_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} singer songwriter producer`,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/home" },
  openGraph: {
    title: `${SITE_NAME} singer songwriter producer`,
    description: HOME_DESCRIPTION,
    url: "/home",
  },
};

export default async function HomePage() {
  const songs = await getSongs();
  return <HomeContent songs={songs} />;
}

