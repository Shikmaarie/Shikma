"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/data/products";

export type CartItem = { slug: string; quantity: number };

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (slug, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === slug);
          const items = existing
            ? state.items.map((i) =>
                i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i,
              )
            : [...state.items, { slug, quantity }];
          return { items, isOpen: true };
        }),
      remove: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),
      setQuantity: (slug, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.slug !== slug)
              : state.items.map((i) =>
                  i.slug === slug ? { ...i, quantity } : i,
                ),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "rh-cart",
      // `isOpen` is UI state — never restore a cart drawer on page load.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/**
 * Resolves cart entries against the catalog, dropping anything unknown or not
 * actually purchasable — application-only and free items never carry a price.
 */
export function resolveCart(items: CartItem[]) {
  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug);
    if (!product || product.mode !== "purchase" || product.price == null) {
      return [];
    }
    return [{ product, quantity: item.quantity, price: product.price }];
  });

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

  // The instalment ceiling a mixed cart can offer is the lowest of its items.
  const maxPayments = lines.length
    ? Math.min(...lines.map((l) => l.product.maxPayments))
    : 1;

  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return { lines, subtotal, maxPayments, count };
}
