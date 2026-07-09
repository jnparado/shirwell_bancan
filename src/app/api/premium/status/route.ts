import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUserPremiumStatus } from "@/lib/auth/premium";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ premium: false, configured: false }, { status: 503 });
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) {
    return NextResponse.json({ premium: false, signedIn: false });
  }

  const status = await getUserPremiumStatus(supabase, user.id);
  return NextResponse.json({
    premium: status.premium,
    signedIn: true,
    productId: status.entitlement?.product_id ?? null,
    expiresAt: status.entitlement?.apple_expires_at ?? null,
  });
}
