"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthModalLauncher } from "@/components/auth/auth-modal";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

const navLinkClass = `${glassCard} px-3 py-2 text-sm font-medium text-[#FFC107] transition hover:border-[#FFC107]/25 hover:bg-[rgba(255,255,255,0.08)]`;

const navDisabledClass = `${glassCard} cursor-not-allowed px-3 py-2 text-sm font-medium text-[#FFC107]/35`;

export function MarketingHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home";

  const linkClass = (active: boolean) =>
    `${navLinkClass} ${active ? "ring-1 ring-[#FFC107]/35 border-[#FFC107]/40" : ""}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#FFC107]/15 bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
        <Link
          href="/home"
          className={`flex min-w-0 items-center gap-3 ${glassCard} px-2.5 py-2 pr-4`}
          aria-label="Shirwell Bancan — home"
        >
          <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full bg-black/60 ring-2 ring-[#FFC107]/40 shadow-[0_0_20px_rgba(255,193,7,0.15)] sm:h-12 sm:w-12">
            <Image
              src="/shirwell-logo-emblem.png"
              alt="Shirwell Bancan — Shirwell music logo"
              fill
              className="object-cover object-[center_32%] scale-[1.08]"
              sizes="48px"
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
          <Link href="/home" className={linkClass(isHome)}>
            Home
          </Link>
          <Link href="/music" className={linkClass(pathname === "/music")} title="Shirwell Music">
            Shirwell Music
          </Link>
          <Link href="/flowers" className={linkClass(pathname === "/flowers")}>
            Flowers
          </Link>
          <Link href="/newsletter" className={linkClass(pathname === "/newsletter")}>
            Newsletter
          </Link>
          <Link href="/products" className={linkClass(pathname === "/products")}>
            Products
          </Link>
          <Link href="/cds" className={linkClass(pathname === "/cds")}>
            CD&apos;s
          </Link>
          <Link href="/premium" className={linkClass(pathname === "/premium")}>
            Premium
          </Link>
        </nav>

        <AuthModalLauncher />
      </div>

      {/* Mobile: glass nav strip */}
      <nav
        className="flex gap-2 overflow-x-auto border-t border-[#FFC107]/10 bg-[rgba(255,255,255,0.03)] px-4 py-2.5 backdrop-blur-md md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Main mobile"
      >
        <Link href="/home" className={`${linkClass(isHome)} shrink-0`}>
          Home
        </Link>
        <Link href="/music" className={`${linkClass(pathname === "/music")} shrink-0`} title="Shirwell Music">
          Shirwell Music
        </Link>
        <Link
          href="/flowers"
          className={`${linkClass(pathname === "/flowers")} shrink-0`}
        >
          Flowers
        </Link>
        <Link
          href="/newsletter"
          className={`${linkClass(pathname === "/newsletter")} shrink-0`}
        >
          Newsletter
        </Link>
        <Link
          href="/products"
          className={`${linkClass(pathname === "/products")} shrink-0`}
        >
          Products
        </Link>
        <Link href="/cds" className={`${linkClass(pathname === "/cds")} shrink-0`}>
          CD&apos;s
        </Link>
        <Link href="/premium" className={`${linkClass(pathname === "/premium")} shrink-0`}>
          Premium
        </Link>
      </nav>
    </header>
  );
}
