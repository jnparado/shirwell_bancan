import { NextResponse } from "next/server";
import { getSupabasePublicApiKey, getSupabaseUrl } from "@/lib/supabase/env";
import { methodNotAllowed } from "@/lib/security/api";

/**
 * Fallback when NEXT_PUBLIC_* Supabase vars were not baked into the client bundle.
 * Disabled in production when build-time env is already configured.
 */
export async function GET() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabasePublicApiKey();

  const hasBuildTimeConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()),
  );

  if (process.env.NODE_ENV === "production" && hasBuildTimeConfig) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: "Supabase public configuration is not available." },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { supabaseUrl, supabaseAnonKey },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export function POST() {
  return methodNotAllowed();
}
