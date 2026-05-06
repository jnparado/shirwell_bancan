"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createBrowserSupabaseClientFromEnv(url: string, key: string) {
  const u = url.trim();
  const k = key.trim();
  if (!u || !k) {
    throw new Error("Missing Supabase URL or anon key");
  }
  return createBrowserClient(u, k);
}

export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  return createBrowserSupabaseClientFromEnv(url, key);
}

export async function createBrowserSupabaseClientAsync() {
  // 1) Try build-time public env first
  try {
    return createBrowserSupabaseClient();
  } catch {
    // 2) Fallback: runtime fetch from the server (works even if env wasn't inlined)
    const res = await fetch("/api/public-env", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Auth is not configured yet. Add Supabase env values.");
    }
    const data = (await res.json()) as {
      supabaseUrl?: string;
      supabaseAnonKey?: string;
    };
    if (!data.supabaseUrl || !data.supabaseAnonKey) {
      throw new Error(
        "Auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      );
    }
    return createBrowserSupabaseClientFromEnv(data.supabaseUrl, data.supabaseAnonKey);
  }
}
