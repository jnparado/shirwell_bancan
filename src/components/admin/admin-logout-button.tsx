"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await fetch("/api/admin/logout", { method: "POST" });
          router.replace("/admin/login");
          router.refresh();
        } finally {
          setBusy(false);
        }
      }}
      className="ml-1 text-xs text-zinc-400 underline-offset-2 hover:text-[var(--shirwell-gold)] hover:underline disabled:opacity-60"
    >
      {busy ? "…" : "Sign out"}
    </button>
  );
}
