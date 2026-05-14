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
  const url = getSupabaseUrl();
  const key = getSupabasePublicApiKey();

  if (url && key) {
    return createBrowserSupabaseClientFromEnv(url, key);
  }

  const res = await fetch("/api/public-env", { cache: "no-store", credentials: "same-origin" });
  if (!res.ok) {
    throw new Error(SUPABASE_AUTH_SETUP_MESSAGE);
  }
  const data = (await res.json()) as {
    supabaseUrl?: string;
    supabaseAnonKey?: string;
  };
  if (!data.supabaseUrl?.trim() || !data.supabaseAnonKey?.trim()) {
    throw new Error(SUPABASE_AUTH_SETUP_MESSAGE);
  }
  return createBrowserSupabaseClientFromEnv(data.supabaseUrl, data.supabaseAnonKey);
}
