import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { profileInitials } from "@/lib/auth/profile";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

type AdminHeaderProps = {
  user: User;
  role: string;
  title: string;
  description?: string;
  isStaticAdmin?: boolean;
};

export function AdminHeader({ user, role, title, description, isStaticAdmin }: AdminHeaderProps) {
  const email = user.email ?? "Admin";
  const name =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : null;

  return (
    <header className="mb-6 flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 pt-12 md:pt-0">
        <h1 className="font-serif text-2xl text-white sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-zinc-400">{description}</p> : null}
      </div>

      <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,193,7,0.15)] text-sm font-semibold text-[var(--shirwell-gold)]">
          {profileInitials(name, email)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-100">{name ?? email}</p>
          <p className="text-xs capitalize text-zinc-500">{role}</p>
        </div>
        {isStaticAdmin ? (
          <AdminLogoutButton />
        ) : (
          <Link
            href="/profile"
            className="ml-1 text-xs text-zinc-400 underline-offset-2 hover:text-[var(--shirwell-gold)] hover:underline"
          >
            Profile
          </Link>
        )}
      </div>
    </header>
  );
}
