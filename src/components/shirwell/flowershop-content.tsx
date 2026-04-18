"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FlowershopHeader } from "./flowershop-header";
import { BottomNav } from "./bottom-nav";
import { AdSenseUnit } from "@/components/ads/adsense-unit";

const cardClass =
  "overflow-hidden rounded-xl border border-white/[0.1] bg-[rgba(255,255,255,0.05)] shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md";

export function FlowershopContent() {
  return (
    <div className="flowers-sparkle-page relative flex min-h-full flex-1 flex-col pb-36">
      <FlowershopHeader />

      <main className="relative mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <h1 className="mb-8 text-center font-serif text-4xl font-bold tracking-tight text-[#FFC107] sm:text-5xl">
          Weekly
        </h1>

        <article className={cardClass}>
          <div className="relative aspect-[4/5] w-full bg-black/50">
            <Image
              src="/flowershop-card.png"
              alt=""
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 512px) 100vw, 512px"
              priority
            />
          </div>

          <div className="space-y-5 p-5 text-left text-sm leading-relaxed text-[#FFC107] sm:p-6 sm:text-[15px]">
            <p>
              If you need a florist for weddings, funerals, or special occasions,
              contact the link Nati Roses. Shirwell has been dealing with them for
              over 40 years—highly recommends. At Middle Dural NSW, just 45 to 50
              minutes drive with no traffic from Sydney—the heart—to the beautiful
              farm Nati family.
            </p>

            <p className="flex flex-wrap items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[#FFC107]" strokeWidth={2} aria-hidden />
              <span>
                You can just call{" "}
                <a
                  href="tel:+61296511375"
                  className="font-semibold text-[#FFD54F] underline decoration-[#FFC107]/50 underline-offset-2"
                >
                  02 9651 1375
                </a>
              </span>
            </p>

            <p>
              Professional florists ready—go to this link:{" "}
              <Link
                href="https://natiroses.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sky-400 underline underline-offset-2 hover:text-sky-300"
              >
                https://natiroses.com.au/
              </Link>
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
