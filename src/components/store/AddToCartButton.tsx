"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, ExternalLink, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";

/**
 * The single call-to-action for a product. What it does depends on the
 * product's mode: purchasable items go into the cart, high-ticket programs
 * open a fit call, and lead magnets link to registration.
 *
 * A program with its own landing page takes it over when there is nothing
 * to take over: a high-ticket program has no checkout here, so its landing
 * page carries the funnel the campaigns already drive traffic into, and
 * sending the visitor to a fit-call form instead would split the path in
 * two. A product that really can be bought here keeps its cart — the
 * landing page is offered beside it, never instead of it.
 */
export default function AddToCartButton({
  slug,
  label,
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

  const base = `inline-flex w-full items-center justify-center gap-2 rounded-full font-bold transition ${
    size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
  }`;
  const solid = `${base} bg-gradient-to-l from-gold-dp via-gold to-gold-lt text-void hover:brightness-110`;

  if (product.landing && product.mode !== "purchase") {
    return (
      <a
        href={product.landing}
        target="_blank"
        rel="noopener noreferrer"
        className={solid}
      >
        {label ?? "לפרטים והרשמה"}
        <ExternalLink className="size-4" aria-hidden="true" />
        <span className="sr-only">— {product.name}, נפתח בלשונית חדשה</span>
      </a>
    );
  }

  if (product.mode === "application") {
    return (
      <Link href={`/contact?program=${product.slug}`} className={solid}>
        <MessageCircle className="size-4" aria-hidden="true" />
        {label ?? "לשיחת התאמה"}
        <span className="sr-only">— {product.name}</span>
      </Link>
    );
  }

  if (product.mode === "free") {
    return (
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border border-line-strong text-fg hover:border-gold/80 hover:text-accent`}
      >
        {label ?? "להרשמה"}
        <ArrowLeft className="size-4" aria-hidden="true" />
        <span className="sr-only">— {product.name}</span>
      </a>
    );
  }

  const handleClick = () => {
    add(slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button type="button" onClick={handleClick} className={solid}>
      {added ? (
        <>
          <Check className="size-4" aria-hidden="true" />
          נוסף לעגלה
        </>
      ) : (
        <>
          <ShoppingBag className="size-4" aria-hidden="true" />
          {label ?? "הוספה לעגלה"}
        </>
      )}
      <span className="sr-only">— {product.name}</span>
    </button>
  );
}
