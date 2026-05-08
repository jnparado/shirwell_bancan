import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return (
      <div className="relative flex min-h-full flex-1 flex-col pb-36">
        <MarketingHeader />
        <main className="mx-auto w-full max-w-2xl px-4 py-10">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
            Profile
          </h1>
          <p className="mt-4 text-sm text-[#FFC107]/80">
            Supabase is not configured. Set `NEXT_PUBLIC_SUPABASE_URL` and
            `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
          </p>
        </main>
        <BottomNav />
      </div>
    );
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return (
      <div className="relative flex min-h-full flex-1 flex-col pb-36">
        <MarketingHeader />
        <main className="mx-auto w-full max-w-2xl px-4 py-10">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
            Profile
          </h1>
          <p className="mt-4 text-sm text-[#FFC107]/80">
            You’re not logged in yet. Use the Log In button in the header.
          </p>
          <p className="mt-3 text-sm">
            <Link href="/home" className="text-[#FFC107] underline underline-offset-2">
              Go to Home
            </Link>
          </p>
        </main>
        <BottomNav />
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,full_name,username,avatar_url,role,phone")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="relative flex min-h-full flex-1 flex-col pb-36">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          Profile
        </h1>

        <div className="mt-6 space-y-2 rounded-2xl border border-white/[0.06] bg-black/30 p-5 text-sm text-zinc-200 backdrop-blur-md">
          <div>
            <span className="text-zinc-400">Email: </span>
            <span>{profile?.email ?? user.email ?? "-"}</span>
          </div>
          <div>
            <span className="text-zinc-400">Full name: </span>
            <span>{profile?.full_name ?? "-"}</span>
          </div>
          <div>
            <span className="text-zinc-400">Username: </span>
            <span>{profile?.username ?? "-"}</span>
          </div>
          <div>
            <span className="text-zinc-400">Phone: </span>
            <span>{profile?.phone ?? "-"}</span>
          </div>
          <div>
            <span className="text-zinc-400">Role: </span>
            <span>{profile?.role ?? "user"}</span>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

