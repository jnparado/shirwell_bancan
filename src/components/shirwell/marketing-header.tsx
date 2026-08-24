"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AuthModalLauncher } from "@/components/auth/auth-modal";
import { CartLink } from "@/components/shirwell/cart-link";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

/** Compact pills so all links stay on one row. */
const navLinkClass =
  "whitespace-nowrap rounded-lg border border-white/[0.06] bg-[rgba(255,255,255,0.05)] px-2.5 py-2 text-sm font-medium text-[#FFC107] backdrop-blur-md transition hover:border-[#FFC107]/25 hover:bg-[rgba(255,255,255,0.08)]";

/** Full site nav — Flowers omitted for now. */
const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/discography", label: "Discography" },
  { href: "/faq", label: "FAQ" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/journal", label: "Journal" },
  { href: "/products", label: "Products" },
  { href: "/cds", label: "CD's" },
  { href: "/premium", label: "Premium" },
] as const;

function linkIsActive(pathname: string, href: string): boolean {
  if (href === "/home") return pathname === "/" || pathname === "/home";
  if (pathname === href) return true;
  if (href === "/products") return pathname.startsWith("/products");
  if (href === "/journal") return pathname.startsWith("/journal");
  if (href === "/newsletter") return pathname.startsWith("/newsletter");
  if (href === "/music") return pathname.startsWith("/music");
  return false;
}

export function MarketingHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (href: string) =>
    `${navLinkClass} ${
      linkIsActive(pathname, href) ? "ring-1 ring-[#FFC107]/35 border-[#FFC107]/40" : ""
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#FFC107]/15 bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[90rem] items-center gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-3.5 lg:gap-3 lg:px-5 xl:px-6">
        <Link
          href="/home"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Shirwell Bancan — home"
        >
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black ring-1 ring-[#FFC107]/50 sm:h-11 sm:w-11">
            <Image
              src="/shirwell-logo-emblem.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="44px"
              priority
            />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-[#FFC107] sm:text-2xl">
            Shirwell
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-1.5 lg:flex xl:gap-2"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <CartLink />
          <div className="hidden sm:block">
            <AuthModalLauncher />
          </div>
          <button
            type="button"
            className={`${glassCard} flex h-10 w-10 items-center justify-center text-[#FFC107] lg:hidden`}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            aria-label="Close menu overlay"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            className="absolute inset-x-0 top-full z-50 border-b border-[#FFC107]/15 bg-black/95 px-4 py-4 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1.5" aria-label="Main mobile">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${linkClass(href)} block w-full text-left`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-3 border-t border-white/[0.08] pt-3 sm:hidden">
                <AuthModalLauncher />
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
