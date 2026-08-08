"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { StoreProduct } from "@/lib/products";
import { loginUrl as buildLoginUrl } from "@/config/auth-routes";

type StripeConfig = {
  paymentsEnabled?: boolean;
  publishableKey?: string | null;
};

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
  const [publishableKey, setPublishableKey] = useState("");

  const productPath = returnPath ?? `/products/${product.slug}`;
  const signInUrl = buildLoginUrl({ redirect: productPath });

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
          router.push(signInUrl);
          return;
        }

        const configRes = await fetch("/api/stripe/config");
        const config = (await configRes.json().catch(() => null)) as StripeConfig | null;
        const pk = config?.publishableKey?.trim() ?? "";
        const useEmbedded = Boolean(pk);

        if (!config?.paymentsEnabled) {
          setModalOpen(true);
          setError("Card payments are not configured on the server yet.");
          return;
        }

        setPublishableKey(pk);
        setModalOpen(true);
        setClientSecret(null);

        const res = await fetch("/api/stripe/buy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: product.slug,
            uiMode: useEmbedded ? "embedded" : "hosted",
          }),
        });

        const data = (await res.json().catch(() => null)) as {
          clientSecret?: string;
          url?: string;
          error?: string;
          signInUrl?: string;
        } | null;

        if (res.status === 401) {
          closeModal();
          router.push(data?.signInUrl ?? signInUrl);
          return;
        }

        if (!res.ok) {
          setError(data?.error ?? "Could not start payment.");
          return;
        }

        if (data?.url) {
          closeModal();
          window.location.href = data.url;
          return;
        }

        if (!data?.clientSecret) {
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
    [closeModal, signInUrl, product.availability, product.slug, router],
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
