"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Home, Library, Search } from "lucide-react";

const items = [
  { href: "/music", label: "Home", Icon: Home, match: (p: string) => p === "/music" },
  {
    href: "/search",
    label: "Search",
    Icon: Search,
    match: (p: string) => p === "/search" || p.startsWith("/search/"),
  },
  {
    href: "/music",
    label: "Library",
    Icon: Library,
    match: (p: string) => p.startsWith("/music/"),
  },
  { href: "/newsletter", label: "Premium", Icon: Crown, match: (p: string) => p.startsWith("/newsletter") },
] as const;

export function MusicBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Music app"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 py-2">
        {items.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[48px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 transition-colors ${
                active ? "text-[#FFC107]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon className="h-6 w-6 shrink-0" strokeWidth={active ? 2.25 : 1.75} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
