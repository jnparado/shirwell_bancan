"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthModalLauncher } from "@/components/auth/auth-modal";
import { CartLink } from "@/components/shirwell/cart-link";

const navLinkClass =
  "rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#FFC107]/90 transition hover:bg-white/[0.06] hover:text-[#FFC107]";

const PRIMARY_LINKS = [
  { href: "/music", label: "Music" },
  { href: "/discography", label: "Discography" },
  { href: "/journal", label: "Journal" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/products", label: "Products" },
  { href: "/cds", label: "CD's" },
  { href: "/premium", label: "Premium" },
] as const;

function linkIsActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === "/products") return pathname.startsWith("/products");
  if (href === "/journal") return pathname.startsWith("/journal");
  if (href === "/newsletter") return pathname.startsWith("/newsletter");
  if (href === "/music") return pathname.startsWith("/music");
  return false;
}

export function MarketingHeader() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `${navLinkClass} ${
      linkIsActive(pathname, href)
        ? "bg-white/[0.08] text-[#FFC107] ring-1 ring-[#FFC107]/35"
        : ""
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#FFC107]/15 bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <Link
          href="/home"
          className="relative z-10 shrink-0 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC107]"
          aria-label="Shirwell Bancan — home"
        >
          <span className="relative block h-11 w-11 overflow-hidden rounded-full bg-black ring-1 ring-[#FFC107]/50 sm:h-12 sm:w-12">
            <Image
              src="/shirwell-logo-emblem.png"
              alt="Shirwell"
              fill
              className="object-cover object-center"
              sizes="48px"
              priority
            />
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
          aria-label="Main"
        >
          {PRIMARY_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <CartLink />
          <AuthModalLauncher />
        </div>
      </div>

      <nav
        className="flex gap-1.5 overflow-x-auto border-t border-[#FFC107]/10 bg-[rgba(255,255,255,0.03)] px-4 py-2 backdrop-blur-md lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Main mobile"
      >
        {PRIMARY_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className={`${linkClass(href)} shrink-0`}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
