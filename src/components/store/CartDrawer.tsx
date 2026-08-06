"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { resolveCart, useCart } from "@/lib/cart";
import { formatILS } from "@/data/products";

export default function CartDrawer() {
  const { items, isOpen, close, setQuantity, remove } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!mounted) return null;

  const { lines, subtotal, maxPayments, count } = resolveCart(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-void/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="עגלת הקניות"
            className="fixed inset-y-0 left-0 z-[80] flex w-full max-w-md flex-col border-l border-gold/20 bg-night shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
          >
            <header className="flex items-center justify-between border-b border-gold/12 px-6 py-5">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-mist">
                <ShoppingBag className="size-5 text-gold" aria-hidden="true" />
                העגלה שלי
                {count > 0 && (
                  <span className="ltr-nums text-sm font-normal text-mist/45">
                    ({count})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-gold/25 p-2 text-mist/80 transition hover:border-gold/60"
                aria-label="סגירת העגלה"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="grid size-20 place-items-center rounded-full border border-gold/20 bg-plum/40">
                  <ShoppingBag className="size-8 text-gold/50" aria-hidden="true" />
                </span>
                <p className="text-mist/60">העגלה עדיין ריקה.</p>
                <Link
                  href="/store"
                  onClick={close}
                  className="rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-7 py-3 text-sm font-bold text-void"
                >
                  לגלישה בחנות
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-5">
                  {lines.map(({ product, quantity }) => (
                    <li
                      key={product.slug}
                      className="border-b border-gold/10 py-5 first:pt-0 last:border-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/store/${product.slug}`}
                            onClick={close}
                            className="font-bold text-mist transition hover:text-gold-lt"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-xs text-gold/65">
                            {product.tagline}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(product.slug)}
                          className="shrink-0 rounded-full p-2 text-mist/45 transition hover:bg-plum hover:text-rose"
                          aria-label={`הסרת ${product.name} מהעגלה`}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-gold/25 p-1">
                          <button
                            type="button"
                            onClick={() => setQuantity(product.slug, quantity - 1)}
                            className="grid size-7 place-items-center rounded-full text-mist/80 transition hover:bg-plum"
                            aria-label={`הפחתת כמות של ${product.name}`}
                          >
                            <Minus className="size-3.5" aria-hidden="true" />
                          </button>
                          <span
                            className="ltr-nums w-8 text-center text-sm font-bold text-mist"
                            aria-live="polite"
                          >
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(product.slug, quantity + 1)}
                            className="grid size-7 place-items-center rounded-full text-mist/80 transition hover:bg-plum"
                            aria-label={`הגדלת כמות של ${product.name}`}
                          >
                            <Plus className="size-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <span className="ltr-nums font-display text-lg font-bold text-gold-lt">
                          {formatILS(product.price * quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-gold/15 bg-void/60 px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-mist/60">סה״כ לתשלום</span>
                    <span className="ltr-nums font-display text-3xl font-black text-gradient-gold">
                      {formatILS(subtotal)}
                    </span>
                  </div>
                  {maxPayments > 1 && (
                    <p className="ltr-nums mt-1 text-left text-xs text-mist/45">
                      ניתן לפרוס עד {maxPayments} תשלומים
                    </p>
                  )}

                  <Link
                    href="/checkout"
                    onClick={close}
                    className="mt-5 flex items-center justify-center rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-6 py-4 font-bold text-void transition hover:brightness-110"
                  >
                    למעבר לתשלום
                  </Link>

                  <p className="mt-3 text-center text-[11px] text-mist/40">
                    התשלום מתבצע בעמוד מאובטח של קארדקום
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
