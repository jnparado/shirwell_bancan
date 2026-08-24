"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disc3, Home, Newspaper, Package } from "lucide-react";

const items = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/music", label: "Shirwell Music", Icon: Disc3 },
  { href: "/newsletter", label: "Newsletter", Icon: Newspaper },
  { href: "/products", label: "Products", Icon: Package },
  { href: "/cds", label: "CD's", Icon: Disc3 },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === "/music" && pathname.startsWith("/music")) return true;
  return false;
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-black/40 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around gap-0.5 px-2 py-2 sm:px-4">
        {items.map(({ href, label, Icon }) => {
          const active = isNavActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[48px] min-w-0 flex-1 touch-manipulation flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 transition-colors ${
                active ? "text-[#FFC107]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon
                className="h-6 w-6 shrink-0"
                strokeWidth={active ? 2.25 : 1.75}
                aria-hidden
              />
              <span className="line-clamp-2 w-full max-w-[4.5rem] text-center text-[9px] font-medium leading-tight sm:max-w-[5rem] sm:text-[10px]">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
