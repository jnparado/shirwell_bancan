"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ADMIN_NAV, type AdminNavItem } from "@/lib/admin/navigation";
import { iconForNavItem } from "@/lib/admin/icons";

function isActive(pathname: string, href: string | undefined): boolean {
  if (!href) return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isSectionOpen(pathname: string, item: AdminNavItem): boolean {
  if (item.href && isActive(pathname, item.href)) return true;
  return item.children?.some((child) => isSectionOpen(pathname, child)) ?? false;
}

function NavBranch({
  item,
  depth = 0,
  pathname,
  onNavigate,
}: {
  item: AdminNavItem;
  depth?: number;
  pathname: string;
  onNavigate?: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);
  const open = isSectionOpen(pathname, item);
  const [manualOpen, setManualOpen] = useState(open);
  const expanded = open || manualOpen;
  const Icon = iconForNavItem(item);
  const pad = depth === 0 ? "px-3" : "pl-8 pr-3";

  if (!hasChildren && item.href) {
    const active = isActive(pathname, item.href);
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className={`flex items-center gap-2 rounded-lg py-2 text-sm transition ${pad} ${
          active
            ? "bg-[rgba(255,193,7,0.12)] text-[var(--shirwell-gold)]"
            : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
        }`}
      >
        {depth === 0 ? <Icon className="h-4 w-4 shrink-0 opacity-80" /> : null}
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setManualOpen((v) => !v)}
        className={`flex w-full items-center gap-2 rounded-lg py-2 text-left text-sm transition ${pad} ${
          open ? "text-[var(--shirwell-gold)]" : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
        }`}
      >
        {depth === 0 ? <Icon className="h-4 w-4 shrink-0 opacity-80" /> : null}
        <span className="flex-1 truncate font-medium">{item.label}</span>
        {expanded ? (
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
        )}
      </button>
      {expanded && item.children ? (
        <div className="space-y-0.5 pb-1">
          {item.children.map((child) => (
            <NavBranch
              key={`${item.label}-${child.label}-${child.href ?? "group"}`}
              item={child}
              depth={depth + 1}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = useMemo(() => ADMIN_NAV, []);

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0c0a08]/90 text-zinc-200 backdrop-blur md:hidden"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close admin menu" : "Open admin menu"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close menu overlay"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/[0.06] bg-[#0a0908]/95 backdrop-blur-xl transition-transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/[0.06] px-4 py-5">
          <Link href="/admin" className="block" onClick={() => setMobileOpen(false)}>
            <p className="font-serif text-lg text-[var(--shirwell-gold)]">Shirwell Admin</p>
            <p className="text-xs text-zinc-500">Store & content dashboard</p>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4" aria-label="Admin navigation">
          {nav.map((item) => (
            <NavBranch
              key={item.label}
              item={item}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        <div className="border-t border-white/[0.06] p-4">
          <Link
            href="/"
            className="text-sm text-zinc-400 transition hover:text-[var(--shirwell-gold)]"
            onClick={() => setMobileOpen(false)}
          >
            ← Back to site
          </Link>
        </div>
      </aside>
    </>
  );
}
