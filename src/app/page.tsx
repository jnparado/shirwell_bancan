import type { Metadata } from "next";
import { HomeContent } from "@/components/shirwell/home-content";
import { getSongs } from "@/lib/songs";
import { HOME_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — Music & Flowers`,
    description: HOME_DESCRIPTION,
    url: "/",
  },
};

export default async function Home() {
  const songs = await getSongs();

  return <HomeContent songs={songs} />;
}
