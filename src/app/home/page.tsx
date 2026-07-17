import type { Metadata } from "next";
import { HomeContent } from "@/components/shirwell/home-content";
import { getSongs } from "@/lib/songs";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/home" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/home",
  },
};

export default async function HomePage() {
  const songs = await getSongs();
  return <HomeContent songs={songs} />;
}

