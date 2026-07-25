import { Suspense } from "react";
import { PremiumCheckoutPanel } from "@/components/subscriptions/premium-checkout-panel";

type PremiumCheckoutSectionProps = {
  checkoutStatus?: "success" | "cancel" | null;
  publishableKey: string;
  initialPlans: import("@/lib/premium/plans").PremiumPlanPublic[];
  stripeReady: boolean;
};

export function PremiumCheckoutSection(props: PremiumCheckoutSectionProps) {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 text-sm text-zinc-400">
          Loading plans…
        </div>
      }
    >
      <PremiumCheckoutPanel {...props} />
    </Suspense>
  );
}
