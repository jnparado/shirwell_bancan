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
          href="/"
          className={`flex min-w-0 items-center ${glassCard} px-3 py-2`}
          aria-label="Shirwell Bancan — home"
        >
          <Image
            src="/shirwell-wordmark.png"
            alt="Shirwell"
            width={160}
            height={44}
            className="h-9 w-auto max-w-[min(160px,42vw)] object-contain object-left sm:h-10"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-2 md:flex md:gap-2.5 lg:gap-3"
          aria-label="Main"
        >
          <Link href="/home" className={linkClass(isHome)}>
            Home
          </Link>
          <Link href="/music" className={linkClass(pathname === "/music")}>
            Music
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
          <span className={navDisabledClass}>Premium</span>
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
        <Link href="/music" className={`${linkClass(pathname === "/music")} shrink-0`}>
          Music
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
        <span className={`${navDisabledClass} shrink-0`}>Premium</span>
      </nav>
    </header>
  );
}
