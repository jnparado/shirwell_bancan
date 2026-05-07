import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Flower",
  description:
    "Shirwell Bancan recommends Nati Roses for weddings, funerals, and special occasions.",
  alternates: { canonical: "/flower" },
  openGraph: {
    title: `Flower | ${SITE_NAME}`,
    description:
      "Contact Nati Roses for weddings, funerals, and special occasions. Middle Dural NSW.",
    url: "/flower",
  },
};

export default function FlowerPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 text-pretty">
      <div className="space-y-6 text-base leading-relaxed">
        <p>
          If you need a florist for weddings funerals special occasions contact the
          link nati Roses.shirwell has been dealing with them for over 40 years
          highly recommends At middle Dural NSW just 45 to 50 minutes drive with no
          traffic from Sydney the heart To the beautiful Farm nati family.
        </p>

        <p>
          Or you can just call{" "}
          <a
            href="tel:+61296511375"
            className="font-semibold underline underline-offset-2"
          >
            0296511375
          </a>{" "}
          Professional florists ready to go this link :{" "}
          <a
            href="https://natiroses.com.au/?srsltid=AfmBOopX1wDZUL2vd7bKZ-IyjA1tId5qxx5Fz65SngNS0JkvZgxrX6HH"
            target="_blank"
            rel="noopener noreferrer"
            className="break-words underline underline-offset-2"
          >
            https://natiroses.com.au/?srsltid=AfmBOopX1wDZUL2vd7bKZ-IyjA1tId5qxx5Fz65SngNS0JkvZgxrX6HH
          </a>
        </p>

        <p>
          For weddings Aventis and funeral .Shirwell if you like to get his cheap
          bunches of roses $10 or $ 20 Friday at Double Bay cosmopolitan next to
          fruit shop 5pm or round the Bay you see him. Saturday at Sidney horse
          races at 3pm on to finish times Other day you see him around castle Hill
          shops About 5pm
        </p>
      </div>
    </main>
  );
}

