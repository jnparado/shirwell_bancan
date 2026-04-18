import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";

export default function LibraryPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col pb-28">
      <MarketingHeader />
      <p className="mx-auto mt-12 max-w-6xl px-4 text-center text-zinc-400 sm:px-6">
        Your library is coming soon.
      </p>
      <BottomNav />
    </div>
  );
}
