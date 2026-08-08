import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginUrl } from "@/config/auth-routes";
import { safeNextPath } from "@/lib/auth/safe-next-path";
import { getSupabasePublicApiKey, getSupabaseUrl } from "@/lib/supabase/env";
import { supabaseEdgeClientOptions } from "@/lib/supabase/edge-client-options";

function loginWithError(origin: string, message: string): NextResponse {
  const url = new URL(loginUrl(), origin);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"));
  const oauthError = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (oauthError) {
    const message = errorDescription?.trim() || oauthError;
    return loginWithError(origin, message);
  }

  if (!code) {
    return loginWithError(origin, "Missing login code. Please try again.");
  }

  const url = getSupabaseUrl();
  const key = getSupabasePublicApiKey();
  if (!url || !key) {
    return loginWithError(origin, "Auth is not configured for this deployment.");
  }

  const cookieStore = await cookies();
  let response = NextResponse.redirect(new URL(next, origin));

  const supabase = createServerClient(url, key, {
    ...supabaseEdgeClientOptions,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
        response = NextResponse.redirect(new URL(next, origin));
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    return loginWithError(origin, exchangeError.message);
  }

  if (data.user) {
    const meta = data.user.user_metadata as Record<string, unknown> | undefined;
    const fullName =
      typeof meta?.full_name === "string"
        ? meta.full_name
        : typeof meta?.name === "string"
          ? meta.name
          : null;

    await supabase.from("profiles").upsert(
      {
        id: data.user.id,
        email: data.user.email ?? null,
        full_name: fullName,
      },
      { onConflict: "id" },
    );
  }

  return response;
}
