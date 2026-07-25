export type CartItem = {
  slug: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "shirwell_cart_v1";

export function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.slug === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function writeCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCartItems(items: CartItem[], slug: string): CartItem[] {
  const existing = items.find((item) => item.slug === slug);
  if (existing) {
    return items.map((item) =>
      item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }
  return [...items, { slug, quantity: 1 }];
}

export function removeFromCartItems(items: CartItem[], slug: string): CartItem[] {
  return items.filter((item) => item.slug !== slug);
}

export function updateCartQuantity(
  items: CartItem[],
  slug: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) return removeFromCartItems(items, slug);
  return items.map((item) => (item.slug === slug ? { ...item, quantity } : item));
}
