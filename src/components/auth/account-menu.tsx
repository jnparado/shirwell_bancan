"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  HelpCircle,
  Library,
  Lock,
  Settings,
  UserRound,
} from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";

export type AccountMenuUser = {
  id: string;
  email: string | null;
  name: string;
  avatarUrl: string | null;
  role: string;
};

type MenuItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    href: "/profile",
    label: "Profile",
    icon: <UserRound className="h-4 w-4" strokeWidth={2} />,
  },
  {
    href: "/library",
    label: "My playlist",
    icon: <Library className="h-4 w-4" strokeWidth={2} />,
  },
  {
    href: "/profile",
    label: "Settings",
    icon: <Settings className="h-4 w-4" strokeWidth={2} />,
  },
  {
    href: "/support",
    label: "Help",
    icon: <HelpCircle className="h-4 w-4" strokeWidth={2} />,
  },
  {
    href: "/privacy",
    label: "Privacy Center",
    icon: <Lock className="h-4 w-4" strokeWidth={2} />,
  },
];

type Props = {
  user: AccountMenuUser;
  supabase: SupabaseClient | null;
};

function displayInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function AccountMenu({ user, supabase }: Props) {
  const router = useRouter();
  const menuId = useId();
  const notifId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    if (!supabase) return;

    let mounted = true;
    supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!mounted || !data?.role) return;
        setRole(String(data.role));
      });

    return () => {
      mounted = false;
    };
  }, [supabase, user.id]);

  useEffect(() => {
    if (!accountOpen && !notifOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setAccountOpen(false);
        setNotifOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAccountOpen(false);
        setNotifOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [accountOpen, notifOpen]);

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    setBusy(false);
    if (!error) {
      setAccountOpen(false);
      setNotifOpen(false);
      router.refresh();
    }
  }

  const initials = displayInitials(user.name);

  return (
    <div ref={rootRef} className="relative flex items-center gap-3">
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setNotifOpen((value) => !value);
            setAccountOpen(false);
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]/40"
          aria-expanded={notifOpen}
          aria-haspopup="menu"
          aria-controls={notifId}
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
        </button>

        {notifOpen ? (
          <div
            id={notifId}
            role="menu"
            aria-label="Notifications"
            className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] w-[min(100vw-2rem,18rem)] overflow-hidden rounded-xl border border-[#dadce0] bg-white py-2 shadow-[0_4px_16px_rgba(60,64,67,0.28)]"
          >
            <div className="border-b border-[#e8eaed] px-4 py-3">
              <p className="text-sm font-medium text-[#202124]">Notifications</p>
            </div>
            <div className="px-4 py-5 text-center">
              <p className="text-sm text-[#5f6368]">You&apos;re all caught up.</p>
              <p className="mt-1 text-xs text-[#80868b]">No new alerts right now.</p>
            </div>
            <div className="border-t border-[#e8eaed] px-4 py-3">
              <Link
                href="/newsletter"
                role="menuitem"
                onClick={() => setNotifOpen(false)}
                className="block text-center text-sm font-medium text-[#1a73e8] hover:underline"
              >
                View newsletter updates
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setAccountOpen((value) => !value);
            setNotifOpen(false);
          }}
          className="flex max-w-[min(100vw-10rem,220px)] items-center gap-2.5 rounded-xl border border-white/[0.10] bg-[#161d2f]/90 px-2 py-1.5 text-left transition hover:border-white/[0.18] hover:bg-[#1b2438] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]/40"
          aria-expanded={accountOpen}
          aria-haspopup="menu"
          aria-controls={menuId}
          aria-label={`${user.name} account menu`}
          title={user.name}
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0f3d3a] text-sm font-semibold text-[#5eead4]">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              initials.slice(0, 1)
            )}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">
              {initials}
            </span>
            <span className="block truncate text-xs capitalize text-zinc-400">
              {role}
            </span>
          </span>
        </button>

        {accountOpen ? (
          <div
            id={menuId}
            role="menu"
            aria-label="Account menu"
            className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] w-[min(100vw-2rem,18rem)] overflow-hidden rounded-xl border border-[#dadce0] bg-white py-2 shadow-[0_4px_16px_rgba(60,64,67,0.28)]"
          >
            <div className="border-b border-[#e8eaed] px-4 py-3">
              <p className="truncate text-sm font-medium text-[#202124]">
                {user.email ?? user.name}
              </p>
            </div>

            <div className="py-1">
              {menuItems.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3c4043] transition hover:bg-[#f1f3f4]"
                >
                  <span className="text-[#5f6368]">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-[#e8eaed] px-4 py-3">
              <button
                type="button"
                role="menuitem"
                onClick={() => void signOut()}
                disabled={busy}
                className="w-full text-center text-sm font-medium text-[#1a73e8] transition hover:underline disabled:cursor-not-allowed disabled:opacity-70"
              >
                {busy ? "Signing out…" : "Sign out"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function userToAccountMenuUser(user: {
  id?: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
} | null): AccountMenuUser | null {
  if (!user?.id) return null;
  const meta = user.user_metadata ?? {};
  const fullName = typeof meta.full_name === "string" ? meta.full_name.trim() : "";
  const nameMeta = typeof meta.name === "string" ? meta.name.trim() : "";
  const preferred =
    typeof meta.preferred_username === "string" ? meta.preferred_username.trim() : "";
  const roleMeta = typeof meta.role === "string" ? meta.role.trim() : "";
  const name =
    fullName ||
    nameMeta ||
    preferred ||
    (user.email?.includes("@") ? user.email.split("@")[0] : null)?.trim() ||
    "Account";
  const avatarRaw = meta.avatar_url ?? meta.picture;
  const avatarUrl =
    typeof avatarRaw === "string" && avatarRaw.startsWith("http") ? avatarRaw : null;
  return {
    id: user.id,
    email: user.email ?? null,
    name,
    avatarUrl,
    role: roleMeta || "user",
  };
}
