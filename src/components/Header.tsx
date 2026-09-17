"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { headerCta, nav, site } from "@/data/site";
import Wordmark, { BrandStar } from "@/components/ui/Wordmark";
import { pill } from "@/components/ui/Editorial";
import { useCart } from "@/lib/cart";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Rendered only after mount so the server and client markup agree — the
  // cart count comes from localStorage and isn't known during SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/*
        Every page opens on a teal band, so the bar starts as light type on
        dark and flips to ink on paper once the page scrolls under it.
      */}
      <header
        data-surface={scrolled ? "light" : "dark"}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ivory/90 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${site.name} — לעמוד הבית`}
          >
            <Monogram />
            <span className="hidden sm:block">
              <Wordmark size="md" />
            </span>
          </Link>

          <nav aria-label="ניווט ראשי" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                        current ? "text-accent" : "text-fg2 hover:text-accent"
                      }`}
                    >
                      {item.label}
                      {current && (
                        <span
                          className="absolute inset-x-4 -bottom-0.5 h-px bg-current opacity-60"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full border border-line-strong p-2.5 text-fg transition hover:text-accent"
              aria-label={`עגלת קניות${mounted && count ? `, ${count} פריטים` : ", ריקה"}`}
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {mounted && count > 0 && (
                <span className="absolute -top-1 -left-1 flex size-5 items-center justify-center rounded-full bg-coral text-[11px] font-black text-ink">
                  {count}
                </span>
              )}
            </button>

            {/* Wrapped rather than given `hidden md:inline-flex` directly:
                the pill classes carry their own `inline-flex`, which wins
                over `hidden` and leaks the button onto small screens. */}
            <span className="hidden md:block">
              <Link
                href={headerCta.href}
                className={`px-6 py-2.5 text-sm ${
                  scrolled ? pill.solid : pill.gold
                }`}
              >
                {headerCta.label}
              </Link>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-full border border-line-strong p-2.5 text-fg transition hover:text-accent lg:hidden"
              aria-label="פתיחת תפריט"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-surface="light"
            className="fixed inset-0 z-[60] bg-ivory backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-20 items-center justify-between px-5 sm:px-8">
              <Monogram />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-line-strong p-2.5 text-fg"
                aria-label="סגירת תפריט"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="ניווט נייד" className="px-7 pt-6">
              <ul className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className={`block border-b border-line py-4 font-display text-3xl font-bold transition ${
                        isCurrent(item.href) ? "text-accent" : "text-fg hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <Link
                href={headerCta.href}
                onClick={() => setMenuOpen(false)}
                className={`mt-8 w-full ${pill.solid}`}
              >
                {headerCta.label}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Monogram() {
  return (
    <span
      className="relative grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal to-night"
      aria-hidden="true"
    >
      <BrandStar className="size-5 text-gold-lt" />
      <span className="absolute inset-0 rounded-full shadow-[inset_0_0_18px_-6px_rgba(211,169,106,0.85)]" />
    </span>
  );
}
