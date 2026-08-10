"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BrandStar } from "@/components/ui/Wordmark";
import HeroCanvas from "@/components/three/HeroCanvas";
import { eventPage } from "@/data/site";

/**
 * The event hero. The reference landing page opens on a full-bleed
 * photograph; there is no approved photography in the repo, so the brand's
 * own 3D scene carries the same cinematic weight without a stock image
 * standing in for Racheli.
 */
export default function EventHero({ registerHref }: { registerHref: string }) {
  const reduced = useReducedMotion();
  const { hero } = eventPage;

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden px-5 pt-32 pb-24 sm:px-8">
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>

      {/* Vignette + flat scrim: the copy is centred here, so unlike the home
          hero the text sits directly over the scene and needs an even wash. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,rgba(4,23,26,0.45)_0%,rgba(4,23,26,0.86)_62%,var(--color-void)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-void to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        <motion.p
          {...rise(0.05)}
          className="mx-auto max-w-2xl text-sm leading-relaxed text-cream/60 sm:text-base"
        >
          {hero.kicker}
        </motion.p>

        <motion.h1
          {...rise(0.16)}
          className="mt-7 font-display text-[3.2rem] leading-[1.02] font-black tracking-tight sm:text-7xl lg:text-[5.6rem]"
        >
          <span className="block text-cream">{hero.titleLead}</span>
          <span className="block text-gradient-gold">{hero.titleGold}</span>
        </motion.h1>

        <motion.p
          {...rise(0.3)}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl"
        >
          {hero.lead}
        </motion.p>

        <motion.p
          {...rise(0.38)}
          className="mt-4 font-display text-xl font-bold text-gold-lt sm:text-2xl"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          {...rise(0.5)}
          className="mt-11 flex flex-col items-center gap-3"
        >
          <a
            href={registerHref}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-10 py-4.5 text-lg font-bold text-void shadow-[0_16px_55px_-14px_rgba(211,169,106,0.9)] transition hover:brightness-110"
          >
            {hero.cta}
            <ArrowLeft
              className="size-5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </a>
          <span className="text-sm font-semibold text-coral">
            {hero.ctaNote}
          </span>
        </motion.div>

        <motion.ul
          {...rise(0.62)}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-xs font-semibold tracking-wide text-cream/65 sm:text-sm"
        >
          {hero.marks.map((mark) => (
            <li
              key={mark}
              className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-teal/35 px-4 py-2 backdrop-blur-md"
            >
              <BrandStar className="size-3 text-gold" />
              {mark}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
