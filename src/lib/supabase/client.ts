"use client";

import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabasePublicApiKey,
  getSupabaseUrl,
  SUPABASE_AUTH_SETUP_MESSAGE,
} from "@/lib/supabase/env";

export function createBrowserSupabaseClientFromEnv(url: string, key: string) {
  const u = url.trim();
  const k = key.trim();
  if (!u || !k) {
    throw new Error("Missing Supabase URL or public API key");
  }
  return createBrowserClient(u, k);
}

export function createBrowserSupabaseClient() {
  return createBrowserSupabaseClientFromEnv(getSupabaseUrl(), getSupabasePublicApiKey());
}

export async function createBrowserSupabaseClientAsync() {
  // 1) Try build-time public env first
  try {
    return createBrowserSupabaseClient();
  } catch {
    // 2) Fallback: runtime fetch from the server (works even if env wasn't inlined)
    const res = await fetch("/api/public-env", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(SUPABASE_AUTH_SETUP_MESSAGE);
    }
    const data = (await res.json()) as {
      supabaseUrl?: string;
      supabaseAnonKey?: string;
    };
    if (!data.supabaseUrl || !data.supabaseAnonKey) {
      throw new Error(SUPABASE_AUTH_SETUP_MESSAGE);
    }
    return createBrowserSupabaseClientFromEnv(data.supabaseUrl, data.supabaseAnonKey);
  }
}
