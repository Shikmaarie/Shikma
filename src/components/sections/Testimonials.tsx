import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { BrandStar } from "@/components/ui/Wordmark";
import { testimonials } from "@/data/site";

export default function Testimonials() {
  return (
    <Section id="results" className="bg-ivory">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>מהשטח</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionTitle className="mt-6">התוצאות מדברות בעד עצמן</SectionTitle>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={0.1 + i * 0.1} className="h-full">
            <figure className="relative flex h-full flex-col rounded-[2rem] panel p-9">
              <span
                className="absolute -top-3 right-9 grid size-10 place-items-center rounded-full bg-coral text-ink"
                aria-hidden="true"
              >
                <BrandStar className="size-4" />
              </span>

              <blockquote className="flex-1 pt-4 font-display text-lg leading-relaxed font-medium text-fg sm:text-xl">
                „{t.quote}”
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-3.5 border-t border-line pt-5">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-teal font-display text-lg font-bold text-gold-lt"
                  aria-hidden="true"
                >
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-bold text-fg">{t.name}</span>
                  <span className="block text-sm text-fg3">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
