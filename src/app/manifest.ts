import type { MetadataRoute } from "next";
import { HOME_TITLE, SITE_NAME, SITE_NAME_SHORT } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: HOME_TITLE,
    short_name: SITE_NAME_SHORT,
    description: `Official Shirwell music by ${SITE_NAME}. Stream songs online.`,
    start_url: "/home",
    display: "standalone",
    background_color: "#080706",
    theme_color: "#080706",
    icons: [
      {
        src: "/shirwell-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
