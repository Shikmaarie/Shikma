import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { faq, site } from "@/data/site";

export default function Faq() {
  return (
    <Section id="faq" className="bg-ivory">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>שאלות ותשובות</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-6">
              כל מה ששואלים
              <br />
              לפני שנכנסים
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 leading-relaxed text-fg2">
              לא מצאתם את מה שחיפשתם?{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                כתבו לי
              </a>{" "}
              ואענה אישית.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={0.05 * i}>
              <details className="group rounded-2xl panel px-6 py-5 transition [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-fg sm:text-lg">
                    {item.q}
                  </h3>
                  <span
                    className="relative grid size-7 shrink-0 place-items-center rounded-full border border-line-strong text-accent transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span className="absolute h-3 w-px bg-current" />
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-fg2">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
