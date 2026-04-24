"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type NewsletterIssue = {
  id: string;
  dateLabel: string;
  src: string;
  alt: string;
};

const glassCard =
  "rounded-2xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

const issues: NewsletterIssue[] = [
  {
    id: "2024-05-22",
    dateLabel: "May 22, 2024",
    src: "/newsletters/2024-05-22.png",
    alt: "Shirwell Newsletter — May 22, 2024",
  },
  {
    id: "2024-05-23",
    dateLabel: "May 23, 2024",
    src: "/newsletters/2024-05-23.png",
    alt: "Shirwell Newsletter — May 23, 2024",
  },
  {
    id: "2024-05-24",
    dateLabel: "May 24, 2024",
    src: "/newsletters/2024-05-24.png",
    alt: "Shirwell Newsletter — May 24, 2024",
  },
];

export function NewsletterPageContent() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = useMemo(
    () => issues.find((x) => x.id === activeId) ?? null,
    [activeId],
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Updates & Stories
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#FFC107] sm:text-4xl">
          Newsletter
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
          Read recent newsletter issues and open each page in full size.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <button
            key={issue.id}
            type="button"
            onClick={() => setActiveId(issue.id)}
            className={`${glassCard} group overflow-hidden text-left shadow-[0_0_60px_rgba(255,193,7,0.06)] transition hover:border-[#FFC107]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]/50`}
            aria-label={`Open newsletter for ${issue.dateLabel}`}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={issue.src}
                alt={issue.alt}
                fill
                className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                <p className="text-xs font-semibold tracking-wide text-[#FFC107]">
                  {issue.dateLabel}
                </p>
                <p className="mt-1 text-sm text-zinc-200">Tap to view</p>
              </div>
            </div>
          </button>
        ))}
      </section>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Newsletter issue ${active.dateLabel}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveId(null)}
        >
          <div
            className={`${glassCard} relative max-h-[90vh] w-full max-w-4xl overflow-hidden border-[#FFC107]/20`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <p className="font-serif text-base font-semibold text-[#FFC107]">
                {active.dateLabel}
              </p>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-sm font-semibold text-zinc-200 transition hover:border-[#FFC107]/30 hover:text-[#FFC107] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]/50"
              >
                Close
              </button>
            </div>
            <div className="relative h-[78vh] w-full bg-black/30">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 900px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

