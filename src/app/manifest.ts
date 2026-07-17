import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, HOME_PATH, SITE_NAME, SITE_NAME_SHORT, SOCIAL_TITLE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SOCIAL_TITLE} — ${SITE_NAME}`,
    short_name: SITE_NAME_SHORT,
    description: DEFAULT_DESCRIPTION,
    start_url: HOME_PATH,
    display: "standalone",
    background_color: "#080706",
    theme_color: "#080706",
    lang: "en-AU",
    categories: ["music", "entertainment"],
    icons: [
      {
        src: "/shirwell-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
