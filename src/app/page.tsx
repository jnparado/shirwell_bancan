import { HomeContent } from "@/components/shirwell/home-content";
import { getSongs } from "@/lib/songs";

export default async function Home() {
  const songs = await getSongs();

  return <HomeContent songs={songs} />;
}
