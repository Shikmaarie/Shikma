"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BrandStar } from "@/components/ui/Wordmark";
import RouteArc from "./RouteArc";
import { Aurora, Grain } from "./Atmosphere";
import { cities, usaSeminar } from "@/data/usaSeminar";

export default function UsaHero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-void px-5 pt-24 pb-16 sm:px-8">
      <Aurora />
      <Grain />

      {/* Vignette so the headline always clears contrast over the aurora */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_10%,rgba(4,23,26,0.72)_70%,var(--color-void)_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl text-center">
        <motion.p
          {...rise(0.05)}
          className="inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-teal/40 px-5 py-2 text-[11px] font-semibold tracking-[0.16em] text-gold-lt backdrop-blur-md sm:text-xs"
        >
          <span aria-hidden="true">{usaSeminar.flag}</span>
          {usaSeminar.eyebrow}
          <BrandStar className="size-3 text-gold" />
        </motion.p>

        <motion.h1
          {...rise(0.16)}
          className="mt-8 font-display text-[2.6rem] leading-[1.04] font-black tracking-tight sm:text-6xl lg:text-[5.2rem]"
        >
          <span className="text-gradient-gold">{usaSeminar.title}</span>
        </motion.h1>

        <motion.p
          {...rise(0.28)}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-cream/70 sm:text-xl"
        >
          {usaSeminar.lede}
        </motion.p>

        {/* The route graphic doubles as the dates lockup */}
        <motion.div {...rise(0.4)} className="mt-14">
          <RouteArc className="mx-auto h-auto w-full max-w-2xl" />

          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {cities.map((city) => (
              <p key={city.id} className="text-sm text-cream/75 sm:text-base">
                <span className="font-bold text-cream">{city.name}</span>
                <span className="mx-2 text-gold/50" aria-hidden="true">
                  ·
                </span>
                <span className="text-cream/60">{city.dates}</span>
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div {...rise(0.52)} className="mt-12 flex flex-col items-center gap-4">
          <a
            href={usaSeminar.registerHref}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-9 py-4 text-base font-bold text-void shadow-[0_10px_50px_-12px_rgba(211,169,106,0.9)] transition hover:brightness-110 sm:text-lg"
          >
            {usaSeminar.cta.hero}
            <ArrowLeft
              className="size-5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </a>

          <p className="text-xs font-medium tracking-[0.14em] text-gold/70">
            {usaSeminar.urgency}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
