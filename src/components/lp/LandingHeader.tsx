"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { BrandStar } from "@/components/ui/Wordmark";
import { moneyFearLanding, registerAnchor } from "@/data/landing";

/**
 * The landing page's own header: identity on one side, a single registration
 * button on the other. No navigation — nothing here competes with the CTA.
 */
export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/12 bg-void/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label={`${site.name} — לעמוד הבית`}
        >
          <span
            className="relative grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-gradient-to-br from-teal to-void"
            aria-hidden="true"
          >
            <BrandStar className="size-5 text-gold-lt" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-black text-gradient-gold">
              {site.name}
            </span>
            <span className="mt-1.5 hidden text-[10px] tracking-[0.14em] text-gold/70 sm:block">
              {site.roleParts.join(" · ")}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-xs font-medium tracking-wide text-cream/55 md:inline">
            {moneyFearLanding.format}
          </span>
          <a
            href={registerAnchor}
            className="rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-5 py-2.5 text-sm font-bold text-void shadow-[0_0_28px_-6px_rgba(212,169,95,0.65)] transition hover:brightness-110 sm:px-7"
          >
            {moneyFearLanding.cta.short}
          </a>
        </div>
      </div>
    </header>
  );
}
