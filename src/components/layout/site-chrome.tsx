"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/shirwell/site-footer";
import { AppleMusicMiniPlayer } from "@/components/shirwell/apple-music-mini-player";
import { LazyAiSupportChat } from "@/components/support/lazy-ai-support-chat";

/** Hides consumer chrome (footer, player, chat) on admin routes. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <SiteFooter />
      <AppleMusicMiniPlayer />
      <LazyAiSupportChat />
    </>
  );
}
