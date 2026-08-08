"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AccountMenu, userToAccountMenuUser } from "@/components/auth/account-menu";
import { loginUrl, signupUrl } from "@/config/auth-routes";
import { createBrowserSupabaseClientAsync } from "@/lib/supabase/client";

/** Header Log in / Sign up links (full pages) or account menu when signed in. */
export function AuthModalLauncher() {
  const [userChip, setUserChip] = useState<ReturnType<typeof userToAccountMenuUser>>(null);
  const [supabase, setSupabase] = useState<Awaited<
    ReturnType<typeof createBrowserSupabaseClientAsync>
  > | null>(null);

  useEffect(() => {
    let mounted = true;
    createBrowserSupabaseClientAsync()
      .then((client) => {
        if (mounted) setSupabase(client);
      })
      .catch(() => {
        if (mounted) setSupabase(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!supabase) return;

    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUserChip(userToAccountMenuUser(data.user));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserChip(userToAccountMenuUser(session?.user ?? null));
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
      {userChip ? (
        <AccountMenu user={userChip} supabase={supabase} />
      ) : (
        <>
          <Link
            href={loginUrl()}
            className="rounded-full border border-[#FFC107]/30 bg-[rgba(255,255,255,0.05)] px-2.5 py-1.5 text-xs font-medium text-[#FFC107] backdrop-blur-md transition hover:border-[#FFC107]/50 hover:bg-[rgba(255,255,255,0.08)] sm:px-4 sm:py-2 sm:text-sm"
          >
            Log In
          </Link>
          <Link
            href={signupUrl()}
            className="rounded-full border border-[#FFC107]/40 bg-[#FFC107] px-2.5 py-1.5 text-xs font-semibold text-stone-950 shadow-[0_0_28px_rgba(255,193,7,0.28)] transition hover:bg-[#e6ae06] sm:px-4 sm:py-2 sm:text-sm"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}
