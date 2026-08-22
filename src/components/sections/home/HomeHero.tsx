"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { BrandStar } from "@/components/ui/Wordmark";
import ImageSlot from "@/components/ui/ImageSlot";
import { homeHero } from "@/data/home";
import { site } from "@/data/site";

/**
 * Band 1 — the full-bleed opener. Deep teal ground so the fixed header, which
 * is built for dark surfaces, still reads over it; everything below this band
 * is light.
 */
export default function HomeHero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.85,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="relative overflow-hidden bg-tiber pt-28 pb-16 lg:pt-36 lg:pb-20">
      {/* Warmth pooling behind the portrait, and a floor fade into the light
          band that follows. Both decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_35%,rgba(199,168,107,0.16),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory/12 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy — first in the DOM so it leads in RTL and for screen readers */}
          <div>
            <motion.p
              {...rise(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-laser/30 bg-bluestone/40 px-4 py-2 text-[11px] font-medium tracking-[0.2em] text-laser backdrop-blur-md sm:text-xs"
            >
              <BrandStar className="size-3" />
              {homeHero.eyebrow}
            </motion.p>

            <h1 className="mt-7 font-display text-5xl leading-[1.05] font-black sm:text-6xl lg:text-7xl">
              {homeHero.title.map((line, i) => (
                <motion.span
                  key={line.text}
                  {...rise(0.12 + i * 0.08)}
                  className={`block ${line.gold ? "text-gradient-gold" : "text-ivory"}`}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...rise(0.46)}
              className="mt-6 text-xl leading-relaxed text-linen/85 sm:text-2xl"
            >
              {homeHero.sub}
            </motion.p>

            <motion.div
              {...rise(0.54)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-laser/25 bg-bluestone px-6 py-3.5 font-bold text-ivory transition hover:bg-bluestone/85"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                הצטרפו לקהילה
              </a>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-2xl border border-linen/25 px-6 py-3.5 font-bold text-linen transition hover:border-laser/60 hover:text-laser"
              >
                לתוכניות הליווי
                <ArrowLeft className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.dl
              {...rise(0.62)}
              className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4"
            >
              {homeHero.stats.map((stat) => (
                <div key={stat.label} className="border-r border-laser/25 pr-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="ltr-nums font-display text-3xl font-black text-laser sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mr-1.5 text-sm font-bold text-linen/80">
                      {stat.suffix}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-linen/60">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Portrait */}
          <motion.div {...rise(0.2)} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2.5rem] border border-laser/15"
            />
            <ImageSlot
              slot={homeHero.portrait}
              tone="dark"
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="relative w-full rounded-[2rem] object-cover"
              imgClassName="h-full"
            />
          </motion.div>
        </div>

        <motion.p
          {...rise(0.7)}
          className="mt-16 text-center font-display text-xl leading-snug font-bold text-linen/90 sm:text-2xl"
        >
          {homeHero.kicker}
        </motion.p>
      </div>
    </section>
  );
}
