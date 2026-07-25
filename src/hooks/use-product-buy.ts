"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { StoreProduct } from "@/lib/products";

type UseProductBuyOptions = {
  product: StoreProduct;
  returnPath?: string;
};

export function useProductBuy({ product, returnPath }: UseProductBuyOptions) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const productPath = returnPath ?? `/products/${product.slug}`;
  const loginUrl = `/auth/login?redirect=${encodeURIComponent(productPath)}`;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "";

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setClientSecret(null);
    setError(null);
  }, []);

  const handleBuy = useCallback(
    async (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();

      if (product.availability === "OutOfStock") return;

      setBusy(true);
      setError(null);

      try {
        const sessionRes = await fetch("/api/auth/session");
        const session = (await sessionRes.json().catch(() => null)) as {
          signedIn?: boolean;
        } | null;

        if (!session?.signedIn) {
          router.push(loginUrl);
          return;
        }

        setModalOpen(true);
        setClientSecret(null);

        const res = await fetch("/api/stripe/buy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: product.slug, uiMode: "embedded" }),
        });

        const data = (await res.json().catch(() => null)) as {
          clientSecret?: string;
          error?: string;
          signInUrl?: string;
        } | null;

        if (res.status === 401) {
          closeModal();
          router.push(data?.signInUrl ?? loginUrl);
          return;
        }

        if (!res.ok || !data?.clientSecret) {
          setError(data?.error ?? "Could not start payment.");
          return;
        }

        setClientSecret(data.clientSecret);
      } catch {
        setError("Network error. Try again.");
      } finally {
        setBusy(false);
      }
    },
    [closeModal, loginUrl, product.availability, product.slug, router],
  );

  return {
    busy,
    error,
    modalOpen,
    clientSecret,
    publishableKey,
    handleBuy,
    closeModal,
  };
}
