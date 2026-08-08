import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  ADSENSE_CRAWLER_LOGIN_PATH,
  ADSENSE_CRAWLER_PASSWORD_FIELD,
  ADSENSE_CRAWLER_RESTRICTED_PATH,
  ADSENSE_CRAWLER_USERNAME_FIELD,
  getAdsenseCrawlerRestrictedUrl,
} from "@/config/adsense-crawler";
import { getSupabasePublicApiKey, getSupabaseUrl } from "@/lib/supabase/env";
import { supabaseEdgeClientOptions } from "@/lib/supabase/edge-client-options";

/** AdSense / AdMob crawler login — GET form, POST with `username` + `password`. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const failed = url.searchParams.get("error") === "login_failed";
  const restricted = getAdsenseCrawlerRestrictedUrl(url.origin);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Sign in</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 420px; margin: 2rem auto; padding: 0 1rem; }
    label { display: block; margin-bottom: 0.75rem; font-size: 0.875rem; }
    input { width: 100%; padding: 0.5rem; box-sizing: border-box; }
    .muted { color: #555; font-size: 0.875rem; }
    .error { color: #b91c1c; font-size: 0.875rem; }
    button { margin-top: 0.5rem; padding: 0.5rem 1rem; }
  </style>
</head>
<body>
  <h1 style="font-size:1.25rem">Sign in</h1>
  <p class="muted">Used by automated crawlers to access <a href="${escapeHtml(restricted)}">${escapeHtml(restricted)}</a>.</p>
  ${failed ? '<p class="error">Login failed. Try again.</p>' : ""}
  <form method="post" action="${escapeHtml(ADSENSE_CRAWLER_LOGIN_PATH)}">
    <label>
      Username
      <input name="${escapeHtml(ADSENSE_CRAWLER_USERNAME_FIELD)}" type="text" autocomplete="username" required />
    </label>
    <label>
      Password
      <input name="${escapeHtml(ADSENSE_CRAWLER_PASSWORD_FIELD)}" type="password" autocomplete="current-password" required />
    </label>
    <button type="submit">Log in</button>
  </form>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  const url = getSupabaseUrl();
  const key = getSupabasePublicApiKey();
  if (!url || !key) {
    return htmlResponse("Auth is not configured.", 503);
  }

  let username = "";
  let password = "";

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const body = await request.text();
    const params = new URLSearchParams(body);
    username = String(params.get(ADSENSE_CRAWLER_USERNAME_FIELD) ?? "").trim();
    password = String(params.get(ADSENSE_CRAWLER_PASSWORD_FIELD) ?? "");
  } else {
    try {
      const form = await request.formData();
      username = String(form.get(ADSENSE_CRAWLER_USERNAME_FIELD) ?? "").trim();
      password = String(form.get(ADSENSE_CRAWLER_PASSWORD_FIELD) ?? "");
    } catch {
      return htmlResponse("Invalid login request.", 400);
    }
  }

  const crawlerEmail = process.env.ADSENSE_CRAWLER_EMAIL?.trim();
  const crawlerPassword = process.env.ADSENSE_CRAWLER_PASSWORD?.trim();

  if (crawlerEmail && crawlerPassword) {
    if (username !== crawlerEmail || password !== crawlerPassword) {
      return htmlResponse("Invalid crawler credentials.", 401);
    }
  } else if (!username || !password) {
    return htmlResponse("Missing username or password.", 400);
  }

  const origin = new URL(request.url).origin;
  const redirectTarget = new URL(ADSENSE_CRAWLER_RESTRICTED_PATH, origin);
  let response = NextResponse.redirect(redirectTarget, 303);

  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, {
    ...supabaseEdgeClientOptions,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const email = crawlerEmail ?? username;
  const pass = crawlerPassword ?? password;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) {
    const loginUrl = new URL(ADSENSE_CRAWLER_LOGIN_PATH, origin);
    loginUrl.searchParams.set("error", "login_failed");
    return NextResponse.redirect(loginUrl, 303);
  }

  return response;
}

function htmlResponse(message: string, status: number) {
  return new NextResponse(
    `<!DOCTYPE html><html><body><p>${escapeHtml(message)}</p></body></html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
