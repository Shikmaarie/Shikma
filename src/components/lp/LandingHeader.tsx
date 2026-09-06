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
          ? "border-b border-gold-ink/25 bg-paper/90 backdrop-blur-xl"
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
            className="grid size-11 shrink-0 place-items-center rounded-full bg-ink"
            aria-hidden="true"
          >
            <BrandStar className="size-5 text-gold-ink" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-black text-ink">{site.name}</span>
            <span className="mt-1.5 hidden text-[10px] tracking-[0.14em] text-ink-2 sm:block">
              {site.roleParts.join(" · ")}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-xs font-medium tracking-wide text-ink-2 md:inline">
            {moneyFearLanding.dates} · {moneyFearLanding.format}
          </span>
          <a
            href={registerAnchor}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper shadow-[0_10px_26px_-14px_rgba(3,61,75,0.9)] transition hover:bg-flame-dp sm:px-7"
          >
            {moneyFearLanding.cta.short}
          </a>
        </div>
      </div>
    </header>
  );
}
