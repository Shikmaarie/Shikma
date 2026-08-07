import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import PriceTag from "./PriceTag";
import { categoryLabels, type Product } from "@/data/products";

const accentGlow: Record<Product["accent"], string> = {
  gold: "from-gold/18",
  rose: "from-rose/18",
  orchid: "from-orchid/18",
};

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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl glass p-7 transition duration-500 hover:border-gold/45 hover:shadow-[0_30px_80px_-45px_rgba(212,169,95,0.75)]">
      <span
        className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${accentGlow[product.accent]} to-transparent opacity-60 transition duration-500 group-hover:opacity-100`}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        {showCategory ? (
          <span className="rounded-full border border-gold/25 bg-void/40 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-gold/80">
            {categoryLabels[product.category]}
          </span>
        ) : (
          <span />
        )}
        {product.badge && (
          <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold text-gold-lt">
            {product.badge}
          </span>
        )}
      </div>

      <h3 className="relative mt-6 font-display text-2xl font-bold text-mist">
        <Link href={`/store/${product.slug}`} className="after:absolute after:inset-0">
          {product.name}
        </Link>
      </h3>
      <p className="relative mt-1.5 text-sm font-medium text-gold/70">
        {product.tagline}
      </p>

      <p className="relative mt-5 text-sm leading-relaxed text-mist/60">
        {product.summary}
      </p>

      {showIncludes && (
        <ul className="relative mt-6 flex flex-col gap-2.5">
          {product.includes.slice(0, 5).map((inc) => (
            <li
              key={inc}
              className="flex items-start gap-2.5 text-sm text-mist/70"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-gold"
                aria-hidden="true"
              />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-auto pt-7">
        <div className="border-t border-gold/12 pt-5">
          <PriceTag product={product} />

          {/* Sits above the card-wide link overlay so both stay clickable. */}
          <div className="relative z-10 mt-5 flex flex-col gap-2.5">
            <AddToCartButton slug={product.slug} />
            <Link
              href={`/store/${product.slug}`}
              className="group/link inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-mist/55 transition hover:text-gold-lt"
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
    </article>
  );
}
