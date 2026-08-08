import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { faq } from "@/data/site";

export default function Faq() {
  return (
    <Section id="faq" className="bg-gradient-to-b from-void to-night">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>שאלות ותשובות</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-6">
              כל מה ששואלות
              <br />
              <span className="text-gradient-gold">לפני שנכנסות</span>
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-cream/60">
              לא מצאת את מה שחיפשת? כתבי לי ואענה אישית.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={0.06 * i}>
              <details className="group rounded-3xl glass px-6 py-5 transition hover:border-gold/40 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-cream sm:text-lg">
                    {item.q}
                  </h3>
                  <span
                    className="relative grid size-7 shrink-0 place-items-center rounded-full border border-gold/35 text-gold transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span className="absolute h-3 w-px bg-current" />
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-cream/65">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
