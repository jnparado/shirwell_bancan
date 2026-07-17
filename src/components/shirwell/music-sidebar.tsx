"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Download,
  Home,
  Library,
  Plus,
  Search,
} from "lucide-react";
import {
  ARTIST_FULL_NAME,
  ARTIST_HERO_POSTER,
  FEATURED_PLAYLISTS,
} from "@/lib/music-app";
import { getPlayerArtworkSrc } from "@/lib/player-artwork";
import type { Song } from "@/types/song";

const navLink =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/10";

function NavItem({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${navLink} relative ${
        active ? "bg-white/10 text-white" : "text-zinc-400"
      }`}
    >
      {active ? (
        <span
          className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-[#FFC107]"
          aria-hidden
        />
      ) : null}
      <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.25 : 2} />
      {label}
    </Link>
  );
}

interface MusicSidebarProps {
  songs: Song[];
}

export function MusicSidebar({ songs }: MusicSidebarProps) {
  const pathname = usePathname();
  const onMusicHome = pathname === "/music";

  return (
    <aside className="hidden w-[var(--sidebar-w)] shrink-0 flex-col border-r border-white/[0.06] bg-black px-3 py-5 lg:flex">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2">
        <Image
          src="/shirwell-logo-emblem.png"
          alt="Shirwell"
          width={36}
          height={36}
          className="rounded-md"
        />
        <span className="font-serif text-lg font-bold tracking-wide text-[#FFC107]">
          SHIRWELL
        </span>
      </Link>

      <nav className="space-y-1" aria-label="Music app">
        <NavItem href="/music" label="Home" Icon={Home} active={onMusicHome} />
        <NavItem
          href="/search"
          label="Search"
          Icon={Search}
          active={pathname === "/search"}
        />
        <NavItem
          href="/music"
          label="Your Library"
          Icon={Library}
          active={pathname.startsWith("/music/")}
        />
      </nav>

      <div className="mt-8 min-h-0 flex-1">
        <div className="mb-3 flex items-center justify-between px-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Playlists
          </span>
          <button
            type="button"
            className="rounded-md p-1 text-zinc-500 hover:bg-white/10 hover:text-white"
            aria-label="Create playlist"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <ul className="space-y-0.5 overflow-y-auto">
          {FEATURED_PLAYLISTS.map((playlist, index) => {
            const song = songs[index];
            return (
              <li key={playlist.id}>
                <Link
                  href="/music"
                  className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-zinc-800">
                    {song ? (
                      <Image
                        src={getPlayerArtworkSrc(song)}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="40px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate">{playlist.name}</p>
                    <p className="truncate text-xs text-zinc-600">{playlist.subtitle}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
        <Link href="/about" className={`${navLink} text-zinc-400`}>
          <Download className="h-5 w-5" />
          Install App
        </Link>
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-zinc-900 ring-2 ring-[#FFC107]/30">
            <Image
              src={ARTIST_HERO_POSTER}
              alt=""
              fill
              className="object-cover object-center"
              sizes="36px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{ARTIST_FULL_NAME}</p>
            <p className="truncate text-xs text-zinc-500">Premium</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
