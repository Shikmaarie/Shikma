import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { voices } from "@/data/usaSeminar";

/**
 * Real quotes from past participants. Never add an invented one here —
 * see CLAUDE.md.
 */
export default function UsaVoices() {
  return (
    <section className="relative overflow-hidden bg-teal/25 px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow>{voices.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-3xl leading-tight font-black text-cream sm:text-4xl lg:text-5xl">
              {voices.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {voices.quotes.map((voice, i) => (
            <Reveal key={voice.name} delay={i * 0.08}>
              <figure className="hairline flex h-full flex-col justify-between rounded-4xl bg-void/50 p-8 backdrop-blur-sm">
                <span
                  className="font-display text-5xl leading-none text-gold/45"
                  aria-hidden="true"
                >
                  ”
                </span>
                <blockquote className="mt-4 grow text-base leading-relaxed text-cream/85 sm:text-lg">
                  {voice.quote}
                </blockquote>
                <figcaption
                  className="mt-6 border-t border-gold/15 pt-4 text-sm font-bold tracking-wide text-gold-lt"
                  dir="ltr"
                >
                  {voice.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
