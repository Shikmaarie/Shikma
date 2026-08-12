"use client";

import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BrandStar } from "@/components/ui/Wordmark";
import { useSeminar } from "@/lib/seminar";
import { cities, citiesSection, usaSeminar } from "@/data/usaSeminar";

/**
 * The two host cities as a straight either/or. Choosing one preselects it in
 * the registration form.
 */
export default function UsaCities() {
  const setCity = useSeminar((s) => s.setCity);
  const selected = useSeminar((s) => s.cityId);

  return (
    <section className="relative overflow-hidden bg-void px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-4xl leading-tight font-black text-cream sm:text-5xl lg:text-6xl">
              {citiesSection.title}
            </h2>
            <p className="mt-5 text-base text-cream/60 sm:text-lg">
              {citiesSection.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {cities.map((city, i) => (
            <Reveal key={city.id} delay={i * 0.1}>
              <a
                href={usaSeminar.registerHref}
                onClick={() => setCity(city.id)}
                className={`group relative flex h-full flex-col overflow-hidden rounded-4xl border bg-gradient-to-br from-teal/45 to-void p-8 transition sm:p-10 ${
                  selected === city.id
                    ? "border-gold ring-2 ring-gold/50"
                    : "border-gold/25 hover:border-gold/70"
                }`}
              >
                <span
                  className="pointer-events-none absolute -left-8 -top-8 size-40 rounded-full bg-gold/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />

                <span
                  className="relative block font-display text-xs font-black tracking-[0.3em] text-gold/70"
                  dir="ltr"
                >
                  {city.latin}
                </span>

                <span className="relative mt-3 block font-display text-4xl font-black text-cream sm:text-5xl">
                  {city.name}
                </span>

                <span className="relative mt-5 flex items-center gap-2 text-base text-cream/70">
                  <BrandStar className="size-3 text-gold" />
                  {city.dates}
                </span>

                <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-bold text-gold-lt">
                  {citiesSection.cta}
                  <ArrowLeft
                    className="size-4 transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <p className="mt-10 text-center text-sm font-medium tracking-[0.14em] text-gold/70">
            {citiesSection.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
