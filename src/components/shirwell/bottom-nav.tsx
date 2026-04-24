"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disc3, Home, Newspaper, Search } from "lucide-react";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/search", label: "Search", Icon: Search },
  { href: "/newsletter", label: "Newsletter", Icon: Newspaper },
  { href: "/music", label: "Music", Icon: Disc3 },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] bg-black/40 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-around px-6 py-3">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-1 text-xs ${
                active ? "text-[#FFC107]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon
                className="h-6 w-6"
                strokeWidth={active ? 2.25 : 1.75}
                aria-hidden
              />
              <span className="sr-only">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
