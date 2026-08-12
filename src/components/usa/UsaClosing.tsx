import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Wordmark from "@/components/ui/Wordmark";
import { Aurora, Grain } from "./Atmosphere";
import { closing, usaSeminar } from "@/data/usaSeminar";

export default function UsaClosing() {
  return (
    <section className="relative overflow-hidden bg-void px-5 py-28 sm:px-8 lg:py-36">
      <Aurora />
      <Grain />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_15%,var(--color-void)_80%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <p className="font-display text-3xl leading-tight font-black text-cream/40 sm:text-4xl">
            {closing.lines[0]}
          </p>
          <p className="mt-3 font-display text-3xl leading-tight font-black sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">{closing.lines[1]}</span>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-gold/20 pt-14">
            <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
              {usaSeminar.title}
            </h2>
            <p className="mt-3 text-sm tracking-[0.2em] text-gold/70">
              {usaSeminar.year}
            </p>

            <a
              href={usaSeminar.registerHref}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-9 py-4 text-base font-bold text-void shadow-[0_10px_50px_-12px_rgba(211,169,106,0.9)] transition hover:brightness-110 sm:text-lg"
            >
              {usaSeminar.cta.final}
              <ArrowLeft
                className="size-5 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </a>

            <p className="mt-5 text-xs font-medium tracking-[0.14em] text-gold/70">
              {usaSeminar.urgency}
            </p>
          </div>
        </Reveal>

        {/* The landing page has no site footer, so the brand signs off here. */}
        <Reveal delay={0.16}>
          <div className="mt-20">
            <Wordmark size="md" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
