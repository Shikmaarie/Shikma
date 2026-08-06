import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { results, testimonials } from "@/data/site";

export default function Results() {
  // Duplicated once so the marquee can loop seamlessly at -50%.
  const marquee = [...testimonials, ...testimonials];

  return (
    <Section id="results" className="overflow-hidden bg-gradient-to-b from-void via-plum/25 to-void">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>{results.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionTitle className="mt-6">
            מה קורה לנשים{" "}
            <span className="text-gradient-gold">שנכנסות פנימה</span>
          </SectionTitle>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {results.items.map((item, i) => (
          <Reveal key={item.label} delay={0.08 + i * 0.08}>
            <div className="rounded-4xl glass px-6 py-9 text-center">
              <p className="ltr-nums font-display text-5xl font-black text-gradient-gold">
                {item.value}
              </p>
              <p className="mt-4 text-sm font-semibold text-mist">{item.label}</p>
              <p className="mt-1 text-xs text-mist/45">{item.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Testimonial marquee */}
      <div className="relative mt-20 -mx-5 sm:-mx-8">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent sm:w-40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent sm:w-40"
          aria-hidden="true"
        />

        <div className="group flex overflow-hidden">
          <ul className="flex shrink-0 animate-marquee gap-5 pr-5 group-hover:[animation-play-state:paused]">
            {marquee.map((t, i) => (
              <li
                key={`${t.name}-${i}`}
                className="w-[21rem] shrink-0 rounded-4xl glass p-7"
                // The second copy is a visual duplicate — hide it from AT.
                aria-hidden={i >= testimonials.length ? "true" : undefined}
              >
                <figure className="flex h-full flex-col">
                  <span
                    className="font-display text-5xl leading-none text-gold/30"
                    aria-hidden="true"
                  >
                    ”
                  </span>
                  <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-mist/75">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-gold/12 pt-4">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-plum font-display font-bold text-gold-lt"
                      aria-hidden="true"
                    >
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-mist">
                        {t.name}
                      </span>
                      <span className="block text-xs text-mist/45">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
