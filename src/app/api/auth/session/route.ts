import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/** Lightweight session check for client buy/checkout flows. */
export async function GET() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ signedIn: false, configured: false });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return NextResponse.json({
    signedIn: Boolean(user),
    configured: true,
    email: user?.email ?? null,
  });
}
