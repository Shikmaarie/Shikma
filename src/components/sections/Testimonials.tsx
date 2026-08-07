import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/site";

export default function Testimonials() {
  return (
    <Section id="results" className="bg-void">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>הוכחה חברתית</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionTitle className="mt-6">
            התוצאות מדברות{" "}
            <span className="text-gradient-gold">בעד עצמן</span>
          </SectionTitle>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={0.1 + i * 0.1} className="h-full">
            <figure className="relative flex h-full flex-col overflow-hidden rounded-5xl glass p-9">
              <span
                className="absolute -left-10 -top-10 size-40 rounded-full bg-gold/8 blur-3xl"
                aria-hidden="true"
              />
              <span
                className="relative font-display text-6xl leading-none text-gold/30"
                aria-hidden="true"
              >
                ”
              </span>

              <blockquote className="relative mt-2 flex-1 font-display text-xl leading-relaxed text-mist/85 sm:text-2xl">
                {t.quote}
              </blockquote>

              <figcaption className="relative mt-8 flex items-center gap-3.5 border-t border-gold/12 pt-5">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/30 bg-plum font-display text-lg font-bold text-gold-lt"
                  aria-hidden="true"
                >
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-bold text-mist">{t.name}</span>
                  <span className="block text-sm text-mist/50">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
