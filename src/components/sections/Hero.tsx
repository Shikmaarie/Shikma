"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BrandStar } from "@/components/ui/Wordmark";
import { Photo, ScriptLine, pill } from "@/components/ui/Editorial";
import { hero } from "@/data/site";
import { photos } from "@/data/media";

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      data-surface="dark"
      className="relative overflow-hidden bg-gradient-to-bl from-teal-2 via-teal to-night pt-28 pb-0 sm:pt-32"
    >
      {/* Soft light pooling behind the portrait, so the cut-out never sits
          on a flat field of teal. */}
      <span
        className="pointer-events-none absolute -left-40 top-10 size-[38rem] rounded-full bg-mint/15 blur-3xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-32 -top-24 size-[30rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-end lg:gap-6">
        {/* ---- Copy ---- */}
        <div className="pb-14 lg:pb-28">
          <motion.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-void/25 px-4 py-2 text-[11px] font-medium tracking-[0.16em] text-gold-lt backdrop-blur-md sm:text-xs"
          >
            <BrandStar className="size-3 text-gold" />
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-7 font-display text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-[3.55rem]">
            {hero.title.map((line, i) => (
              <motion.span key={line.text} {...rise(0.14 + i * 0.09)} className="block">
                <span
                  className={
                    line.gold
                      ? "font-black text-gradient-gold"
                      : "font-light text-cream"
                  }
                >
                  {line.text}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.div {...rise(0.5)}>
            <ScriptLine className="mt-6">{hero.script}</ScriptLine>
          </motion.div>

          <motion.p
            {...rise(0.58)}
            className="mt-6 max-w-xl leading-relaxed text-fg2 sm:text-lg"
          >
            {hero.sub}
          </motion.p>

          <motion.div {...rise(0.68)} className="mt-9 flex flex-wrap gap-3.5">
            <Link href={hero.ctaPrimary.href} className={`group ${pill.coral}`}>
              {hero.ctaPrimary.label}
              <ArrowLeft
                className="size-5 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              href={hero.ctaSecondary.href}
              className={`${pill.ghost} backdrop-blur-md`}
            >
              {hero.ctaSecondary.label}
            </Link>
          </motion.div>
        </div>

        {/* ---- Portrait ---- */}
        <motion.div
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const },
              })}
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end"
        >
          {/* A cut-out, so no frame and no crop: she stands on the foot of
              the band the way the reference does, with the teal reading as
              ground rather than as a backdrop behind a photograph. */}
          <Photo
            slot={photos.hero}
            priority
            fit="contain"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-4/5 w-full lg:aspect-auto lg:h-[41rem]"
            imageClassName="object-bottom lg:object-[left_bottom]"
          />

        </motion.div>
      </div>

    </section>
  );
}
