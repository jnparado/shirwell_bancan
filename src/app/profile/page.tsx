import type { ReactNode } from "react";
import Link from "next/link";
import { SUPABASE_AUTH_SETUP_MESSAGE } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ProfileContent } from "@/components/profile/profile-content";
import type { ProfileRecord } from "@/lib/auth/profile";
import { loginUrl } from "@/config/auth-routes";

function profileShell(children: ReactNode) {
  return (
    <div className="page-shell relative">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-2xl px-4 py-10">{children}</main>
      <BottomNav />
    </div>
  );
}

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return profileShell(
      <>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          Profile
        </h1>
        <p className="mt-4 text-sm text-[#FFC107]/80">{SUPABASE_AUTH_SETUP_MESSAGE}</p>
      </>,
    );
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return profileShell(
      <>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          Profile
        </h1>
        <p className="mt-4 text-sm text-[#FFC107]/80">
          You&apos;re not logged in yet. Use Log In in the header, or open the sign-in page
          directly.
        </p>
        <p className="mt-3 flex flex-wrap gap-4 text-sm">
          <Link
            href={loginUrl({ redirect: "/profile" })}
            className="text-[#FFC107] underline underline-offset-2"
          >
            Sign in
          </Link>
          <Link href="/home" className="text-zinc-400 underline underline-offset-2">
            Go to Home
          </Link>
        </p>
      </>,
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,full_name,username,avatar_url,role,phone,location")
    .eq("id", user.id)
    .maybeSingle();

  const meta = user.user_metadata ?? {};
  const record: ProfileRecord = {
    id: user.id,
    email: profile?.email ?? user.email ?? null,
    full_name:
      profile?.full_name ??
      (typeof meta.full_name === "string" ? meta.full_name : null),
    username: profile?.username ?? null,
    avatar_url:
      profile?.avatar_url ??
      (typeof meta.avatar_url === "string"
        ? meta.avatar_url
        : typeof meta.picture === "string"
          ? meta.picture
          : null),
    role: profile?.role ?? (typeof meta.role === "string" ? meta.role : "user"),
    phone:
      profile?.phone ?? (typeof meta.phone === "string" ? meta.phone : null),
    location:
      profile?.location ?? (typeof meta.location === "string" ? meta.location : null),
  };

  return profileShell(
    <>
      <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
        Profile
      </h1>
      <ProfileContent profile={record} />
    </>,
  );
}
