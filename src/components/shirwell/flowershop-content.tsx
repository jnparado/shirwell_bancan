"use client";

import Image from "next/image";
import { MarketingHeader } from "./marketing-header";
import { BottomNav } from "./bottom-nav";
import { AdSenseUnit } from "@/components/ads/adsense-unit";

const cardClass =
  "overflow-hidden rounded-xl border border-white/[0.1] bg-[rgba(255,255,255,0.05)] shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md";

export function FlowershopContent() {
  return (
    <div className="flowers-sparkle-page relative flex min-h-full flex-1 flex-col pb-36">
      <MarketingHeader />

      <main className="relative mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <h1 className="mb-8 text-center font-serif text-4xl font-bold tracking-tight text-[#FFC107] sm:text-5xl">
          Weekly
        </h1>

        <article className={cardClass}>
          <div className="relative aspect-[4/5] w-full bg-black/50">
            <Image
              src="/flowershop-card.png"
              alt="Nati Roses — florals for special occasions"
              fill
              className="object-cover object-center"
              sizes="(max-width: 512px) 100vw, 512px"
              priority
            />
          </div>

          <div className="space-y-5 p-5 text-left text-sm leading-relaxed text-[#FFC107] sm:p-6 sm:text-[15px]">
            <p>
              If you need a florist for weddings funerals special occasions contact
              the link nati Roses. Shirwell has been dealing with them for over 40
              years highly recommends At middle Dural NSW just 45 to 50 minutes
              drive with no traffic from Sydney the heart To the beautiful Farm
              nati family.
            </p>

            <p>
              Or you can just call{" "}
              <a
                href="tel:+61296511375"
                className="font-semibold text-[#FFD54F] underline decoration-[#FFC107]/50 underline-offset-2"
              >
                02 9651 1375
              </a>{" "}
              Professional florists ready to go this link:{" "}
              <a
                href="https://natiroses.com.au/?srsltid=AfmBOopX1wDZUL2vd7bKZ-IyjA1tId5qxx5Fz65SngNS0JkvZgxrX6HH"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[#3366ff] underline underline-offset-2 hover:text-[#5599ff]"
              >
                https://natiroses.com.au/?srsltid=AfmBOopX1wDZUL2vd7bKZ-IyjA1tId5qxx5Fz65SngNS0JkvZgxrX6HH
              </a>
            </p>

            <p>
              For weddings Aventis and funeral. Shirwell if you like to get his cheap
              bunches of roses $10 or $20 Friday at Double Bay cosmopolitan next to
              fruit shop 5pm or round the Bay you see him. Saturday at Sidney horse
              races at 3pm on to finish times Other day you see him around castle
              Hill shops About 5pm
            </p>
          </div>
        </article>

        <div className="mt-8">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-[#FFC107]/50">
            Advertisement
          </p>
          <AdSenseUnit className="rounded-xl border border-[#FFC107]/15 bg-black/30 p-2" />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
