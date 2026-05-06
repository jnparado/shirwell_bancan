import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ??
    process.env.SUPABASE_URL?.trim() ??
    "";

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ??
    process.env.SUPABASE_ANON_KEY?.trim() ??
    "";

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

