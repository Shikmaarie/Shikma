import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import PriceTag from "./PriceTag";
import type { Product } from "@/data/products";

const accentBorder: Record<Product["accent"], string> = {
  gold: "hover:border-gold/45",
  coral: "hover:border-coral/45",
  peri: "hover:border-peri/45",
};

/**
 * A full program write-up — used on the category pages, where each offer
 * deserves more room than a grid card gives it.
 */
export default function ProgramDetail({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <article
      id={product.slug}
      className={`group relative scroll-mt-28 overflow-hidden rounded-5xl glass p-8 transition duration-500 sm:p-11 ${accentBorder[product.accent]}`}
    >
      <span
        className="absolute -left-24 -top-24 size-72 rounded-full bg-gold/8 blur-3xl transition duration-500 group-hover:bg-gold/14"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="ltr-nums font-display text-5xl font-black text-gold/25"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {product.badge && (
              <span className="rounded-full border border-gold/35 bg-gold/12 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-gold-lt">
                {product.badge}
              </span>
            )}
          </div>

          <h2 className="mt-3 font-display text-3xl font-black text-cream sm:text-4xl">
            <Link
              href={`/store/${product.slug}`}
              className="transition hover:text-gold-lt"
            >
              {product.name}
            </Link>
          </h2>
          <p className="mt-2 font-medium text-gold/80">{product.tagline}</p>

          <p className="mt-6 text-lg leading-relaxed text-cream/70">
            {product.summary}
          </p>

          {product.detail && (
            <p className="mt-4 leading-relaxed text-cream/55">{product.detail}</p>
          )}

          <div className="mt-9 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold/80">
                מה מקבלים
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {product.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/70"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold/80">
                למי זה מיועד
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {product.forWho.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/70"
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold/70"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Purchase / apply panel */}
        <div className="lg:border-r lg:border-gold/12 lg:pr-10">
          <div className="rounded-4xl border border-gold/15 bg-void/45 p-7">
            <PriceTag product={product} />

            <div className="mt-6 flex flex-col gap-3">
              <AddToCartButton slug={product.slug} size="lg" />
              <Link
                href={`/store/${product.slug}`}
                className="group/link inline-flex items-center justify-center gap-2 text-sm font-semibold text-cream/60 transition hover:text-gold-lt"
              >
                כל הפרטים
                <ArrowLeft
                  className="size-4 transition-transform group-hover/link:-translate-x-1"
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
