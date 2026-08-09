"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addToCartItems,
  cartItemCount,
  readCartFromStorage,
  removeFromCartItems,
  updateCartQuantity,
  writeCartToStorage,
  type CartItem,
} from "@/lib/cart/storage";
import { isStoreComingSoon } from "@/config/store";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readCartFromStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeCartToStorage(items);
  }, [items, ready]);

  const addItem = useCallback((slug: string) => {
    if (isStoreComingSoon()) return;
    setItems((current) => addToCartItems(current, slug));
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => removeFromCartItems(current, slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((current) => updateCartQuantity(current, slug, quantity));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: cartItemCount(items),
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [items, addItem, removeItem, setQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
