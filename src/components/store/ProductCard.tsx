import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import PriceTag from "./PriceTag";
import ProductSigil from "./ProductSigil";
import { categoryLabels, type Product } from "@/data/products";

export default function ProductCard({
  product,
  showIncludes = false,
  showCategory = true,
}: {
  product: Product;
  showIncludes?: boolean;
  showCategory?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl panel transition duration-500 hover:border-current hover:shadow-[0_30px_80px_-45px_rgba(176,136,80,0.75)]">
      {/* Generative cover — stands in for photography we don't have. The
          band stays dark on purpose: the sigil is drawn in gold and coral
          line work, which disappears against paper. */}
      <div className="relative h-36 overflow-hidden bg-gradient-to-b from-teal-2 via-teal to-night">
        <ProductSigil
          product={product}
          className="absolute inset-0 h-full w-full opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <span
          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-night/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex flex-1 flex-col p-7">
      <div className="relative flex items-start justify-between gap-3">
        {showCategory ? (
          <span className="rounded-full border border-line-strong px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-fg2">
            {categoryLabels[product.category]}
          </span>
        ) : (
          <span />
        )}
        {product.badge && (
          <span className="rounded-full bg-coral px-3 py-1 text-[10px] font-bold text-ink">
            {product.badge}
          </span>
        )}
      </div>

      <h3 className="relative mt-5 font-display text-2xl font-bold text-fg">
        <Link href={`/store/${product.slug}`} className="after:absolute after:inset-0">
          {product.name}
        </Link>
      </h3>
      <p className="relative mt-1.5 text-sm font-medium text-accent">
        {product.tagline}
      </p>

      <p className="relative mt-5 text-sm leading-relaxed text-fg2">
        {product.summary}
      </p>

      {showIncludes && (
        <ul className="relative mt-6 flex flex-col gap-2.5">
          {product.includes.slice(0, 5).map((inc) => (
            <li
              key={inc}
              className="flex items-start gap-2.5 text-sm text-fg2"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-auto pt-7">
        <div className="border-t border-line pt-5">
          <PriceTag product={product} />

          {/* Sits above the card-wide link overlay so both stay clickable. */}
          <div className="relative z-10 mt-5 flex flex-col gap-2.5">
            <AddToCartButton slug={product.slug} />
            <Link
              href={`/store/${product.slug}`}
              className="group/link inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-fg3 transition hover:text-accent"
            >
              כל הפרטים
              <ArrowLeft
                className="size-3.5 transition-transform group-hover/link:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </article>
  );
}
