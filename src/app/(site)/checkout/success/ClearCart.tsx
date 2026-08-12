"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/**
 * Empties the cart once the payer lands back from a successful Cardcom
 * payment. Fulfilment itself is driven by the webhook, not by this page —
 * a visitor who never reaches the redirect is still processed correctly.
 */
export default function ClearCart() {
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
}
