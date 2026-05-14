import { NextResponse } from "next/server";
import { getSupabasePublicApiKey, getSupabaseUrl } from "@/lib/supabase/env";

export async function GET() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabasePublicApiKey();

  return NextResponse.json(
    {
      supabaseUrl,
      supabaseAnonKey,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

