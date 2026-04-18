import Image from "next/image";
import Link from "next/link";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

const navLinkClass = `${glassCard} px-3 py-2 text-sm font-medium text-[#FFC107] transition hover:border-[#FFC107]/25 hover:bg-[rgba(255,255,255,0.08)]`;

const navDisabledClass = `${glassCard} cursor-not-allowed px-3 py-2 text-sm font-medium text-[#FFC107]/35`;

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#FFC107]/15 bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
        <Link
          href="/"
          className={`flex min-w-0 items-center gap-3 ${glassCard} px-2.5 py-2 pr-4`}
        >
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-black/50 ring-1 ring-[#FFC107]/25 sm:h-11 sm:w-11">
            <Image
              src="/shirwell-logo.png"
              alt=""
              fill
              className="object-cover object-[center_22%]"
              sizes="44px"
              priority
            />
          </span>
          <span className="truncate font-serif text-lg font-semibold tracking-tight text-[#FFC107] sm:text-xl">
            Shirwell Bancan
          </span>
        </Link>

        <nav
          className="hidden items-center gap-2 md:flex md:gap-2.5 lg:gap-3"
          aria-label="Main"
        >
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/#featured" className={navLinkClass}>
            Music
          </Link>
          <Link href="/flowers" className={navLinkClass}>
            Flowers
          </Link>
          <span className={navDisabledClass}>Premium</span>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            className={`${glassCard} rounded-full border-[#FFC107]/30 px-3 py-2 text-sm font-medium text-[#FFC107] transition hover:border-[#FFC107]/50 hover:bg-[rgba(255,255,255,0.08)] sm:px-4`}
          >
            Log In
          </button>
          <button
            type="button"
            className="rounded-full border border-[#FFC107]/40 bg-[#FFC107] px-3 py-2 text-sm font-semibold text-stone-950 shadow-[0_0_28px_rgba(255,193,7,0.28)] transition hover:bg-[#e6ae06] sm:px-4"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile: glass nav strip */}
      <nav
        className="flex gap-2 overflow-x-auto border-t border-[#FFC107]/10 bg-[rgba(255,255,255,0.03)] px-4 py-2.5 backdrop-blur-md md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Main mobile"
      >
        <Link href="/" className={`${navLinkClass} shrink-0`}>
          Home
        </Link>
        <Link href="/#featured" className={`${navLinkClass} shrink-0`}>
          Music
        </Link>
        <Link href="/flowers" className={`${navLinkClass} shrink-0`}>
          Flowers
        </Link>
        <span className={`${navDisabledClass} shrink-0`}>Premium</span>
      </nav>
    </header>
  );
}
