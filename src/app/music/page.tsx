import { MusicPageContent } from "@/components/shirwell/music-page-content";
import { getSongs } from "@/lib/songs";

export default async function MusicPage() {
  const songs = await getSongs();

  return <MusicPageContent songs={songs} />;
}
