"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import HeroCanvas from "@/components/three/HeroCanvas";
import { hero } from "@/data/site";

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      {/* 3D layer */}
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>

      {/* Depth wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_45%,transparent_5%,rgba(6,4,10,0.35)_45%,rgba(6,4,10,0.82)_100%)]"
        aria-hidden="true"
      />
      {/* Scrim under the copy so it always clears AA contrast. On small screens
          the helix sits directly behind the text, so the wash is flat there. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full bg-void/72 lg:w-[62%] lg:bg-gradient-to-l lg:from-void lg:via-void/85 lg:to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-void to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-plum/40 px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-gold-lt backdrop-blur-md sm:text-xs"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-7 font-display text-[2.7rem] leading-[1.06] font-black tracking-tight sm:text-6xl lg:text-[4.6rem]">
            {hero.title.map((line, i) => (
              <motion.span
                key={line.text}
                {...rise(0.15 + i * 0.1)}
                className="block"
              >
                <span className={line.gold ? "text-gradient-gold" : "text-mist"}>
                  {line.text}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...rise(0.55)}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-mist/70 sm:text-xl"
          >
            {hero.sub}
          </motion.p>

          <motion.div {...rise(0.68)} className="mt-10 flex flex-wrap gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-4 text-base font-bold text-void shadow-[0_10px_45px_-12px_rgba(212,169,95,0.85)] transition hover:brightness-110"
            >
              {hero.ctaPrimary.label}
              <ArrowLeft
                className="size-5 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-plum/30 px-8 py-4 text-base font-semibold text-mist backdrop-blur-md transition hover:border-gold/70 hover:text-gold-lt"
            >
              {hero.ctaSecondary.label}
            </Link>
          </motion.div>

          <motion.dl
            {...rise(0.82)}
            className="mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="border-r border-gold/20 pr-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="ltr-nums block font-display text-3xl font-black text-gradient-gold sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-gold/70">
                    {stat.suffix}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-mist/50">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <ScrollHint reduced={Boolean(reduced)} />
    </section>
  );
}

function ScrollHint({ reduced }: { reduced: boolean }) {
  return (
    <div
      // Anchored to the far edge so it never collides with the stat row.
      // Unlabelled on purpose — the travelling line reads as "scroll" on its
      // own, and a rotated caption here fought the RTL text direction.
      className="pointer-events-none absolute bottom-8 left-10 hidden xl:block"
      aria-hidden="true"
    >
      <span className="relative block h-16 w-px overflow-hidden bg-gold/20">
        {!reduced && (
          <motion.span
            className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-gold to-transparent"
            animate={{ y: [-16, 64] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </span>
    </div>
  );
}
