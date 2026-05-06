import { Suspense } from "react";
import { AuthCallbackClient } from "./ui";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-semibold text-[#FFC107]">Signing you in…</p>
        </div>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  );
}

