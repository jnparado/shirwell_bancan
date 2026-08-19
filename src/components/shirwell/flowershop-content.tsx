import Image from "next/image";
import Link from "next/link";
import { MarketingHeader } from "./marketing-header";
import { BottomNav } from "./bottom-nav";
import { AdSenseBoxUnit, AdSenseEnterprisesUnit } from "@/components/ads/adsense-unit";
import { FLOWERS_EDITORIAL } from "@/lib/editorial-content";

const cardClass =
  "overflow-hidden rounded-xl border border-white/[0.1] bg-[rgba(255,255,255,0.05)] shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md";

const NATI_ROSES_URL =
  "https://natiroses.com.au/?srsltid=AfmBOopX1wDZUL2vd7bKZ-IyjA1tId5qxx5Fz65SngNS0JkvZgxrX6HH";

export function FlowershopContent() {
  return (
    <div className="flowers-sparkle-page page-shell relative">
      <MarketingHeader />

      <main className="relative mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <h1 className="mb-4 text-center font-serif text-3xl font-bold tracking-tight text-[#FFC107] sm:text-4xl md:text-5xl">
          Flowers
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed text-zinc-400 sm:text-base">
          Nati Roses and Shirwell Bancan — weddings, memorials, and pop-up rose bunches
          across Sydney. Original editorial content from Shirwell Entertainment.
        </p>

        <article className={`${cardClass} mb-8 p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107]">
            {FLOWERS_EDITORIAL.title}
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            {FLOWERS_EDITORIAL.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </article>

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

          <div className="space-y-5 p-5 text-left text-sm leading-relaxed text-zinc-300 sm:p-6 sm:text-[15px]">
            <p>
              Shirwell Bancan recommends{" "}
              <a
                href={NATI_ROSES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#FFC107] underline decoration-[#FFC107]/50 underline-offset-2 hover:text-[#FFD54F]"
              >
                Nati Roses
              </a>{" "}
              for weddings, funerals, and special occasions. Shirwell has worked with the
              Nati family for more than 40 years — professional florists based in Middle
              Dural, NSW, about 45–50 minutes from Sydney when traffic is light.
            </p>

            <div className="space-y-5 border-t border-white/[0.08] pt-5">
              <p>
                Call{" "}
                <a
                  href="tel:+61296511375"
                  className="font-semibold text-[#FFC107] underline decoration-[#FFC107]/50 underline-offset-2"
                >
                  (02) 9651 1375
                </a>{" "}
                or visit{" "}
                <a
                  href={NATI_ROSES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#FFC107] underline underline-offset-2 hover:text-[#FFD54F]"
                >
                  Nati Roses online
                </a>{" "}
                for custom arrangements and event florals.
              </p>

              <p>
                Shirwell also sells affordable rose bunches ($10–$20) at select Sydney
                locations — including Friday evenings near Double Bay and Saturday
                race-day spots. See the{" "}
                <Link
                  href="/flower"
                  className="font-semibold text-[#FFC107] underline-offset-2 hover:underline"
                >
                  Flower
                </Link>{" "}
                page for details.
              </p>
            </div>
          </div>
        </article>

        <div className={`${cardClass} mt-8 space-y-6 p-6 sm:p-8`}>
          {FLOWERS_EDITORIAL.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-lg font-semibold text-[#FFC107]">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                {section.text}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-[#FFC107]/50">
            Advertisement
          </p>
          <AdSenseEnterprisesUnit className="rounded-xl border border-[#FFC107]/15 bg-black/30 p-2" />
          <div className="mt-4">
            <AdSenseBoxUnit className="rounded-xl border border-[#FFC107]/15 bg-black/30 p-2" />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
