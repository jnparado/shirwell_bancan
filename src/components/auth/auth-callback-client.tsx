"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function AuthCallbackClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const code = params.get("code");
      const error = params.get("error");
      const errorDescription = params.get("error_description");

      if (error) {
        setMessage(errorDescription ? `${error}: ${errorDescription}` : error);
        return;
      }

      if (!code) {
        setMessage("Missing login code. Please try again.");
        return;
      }

      try {
        const supabase = createBrowserSupabaseClient();
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setMessage(exchangeError.message);
          return;
        }

        if (!cancelled) {
          router.replace("/");
        }
      } catch (e) {
        setMessage(e instanceof Error ? e.message : "Login failed. Please try again.");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [params, router]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold text-[#FFC107]">{message}</p>
      <p className="mt-2 text-xs text-zinc-500">You can close this tab if it doesn’t redirect.</p>
    </div>
  );
}

