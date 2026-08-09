import type { MetadataRoute } from "next";
import {
  APP_NAME,
  DEFAULT_DESCRIPTION,
  HOME_PATH,
  SITE_FAVICON_PATH,
  SITE_NAME_SHORT,
} from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${APP_NAME} — ${SITE_NAME_SHORT} music`,
    short_name: APP_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: HOME_PATH,
    display: "standalone",
    background_color: "#080706",
    theme_color: "#080706",
    lang: "en-AU",
    categories: ["music", "entertainment"],
    icons: [
      {
        src: SITE_FAVICON_PATH,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/shirwell-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
