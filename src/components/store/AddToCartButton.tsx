"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/data/products";

export default function AddToCartButton({
  slug,
  label = "הוספה לעגלה",
  size = "md",
}: {
  slug: string;
  label?: string;
  size?: "md" | "lg";
}) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const product = getProduct(slug);

  if (!product) return null;

  const handleClick = () => {
    add(slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt font-bold text-void transition hover:brightness-110 ${
        size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
      }`}
    >
      {added ? (
        <>
          <Check className="size-4" aria-hidden="true" />
          נוסף לעגלה
        </>
      ) : (
        <>
          <ShoppingBag className="size-4" aria-hidden="true" />
          {label}
        </>
      )}
      <span className="sr-only">— {product.name}</span>
    </button>
  );
}
