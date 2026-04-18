"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const glassItem =
  "rounded-xl border border-white/[0.08] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm font-medium text-[#FFC107] backdrop-blur-md transition hover:bg-[rgba(255,255,255,0.08)]";

export function FlowershopHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#FFC107]/15 bg-black/45 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#FFC107]/40"
        >
          <Image
            src="/shirwell-logo.png"
            alt="Shirwell Bancan"
            fill
            className="object-cover object-[center_22%]"
            sizes="48px"
            priority
          />
        </Link>

        <p className="pointer-events-none absolute left-1/2 top-1/2 max-w-[55%] -translate-x-1/2 -translate-y-1/2 text-center font-serif text-base font-bold tracking-tight text-[#FFC107] sm:text-lg">
          Shirwell Bancan
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#FFC107] transition hover:bg-[rgba(255,255,255,0.06)]"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#FFC107]/10 bg-black/80 px-4 py-4 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-lg flex-col gap-2" aria-label="Menu">
            <Link href="/" className={glassItem} onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/#featured" className={glassItem} onClick={() => setOpen(false)}>
              Music
            </Link>
            <span className={`${glassItem} cursor-default text-[#FFC107]/50`}>Flowers</span>
            <span className={`${glassItem} cursor-default text-[#FFC107]/50`}>Premium</span>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
