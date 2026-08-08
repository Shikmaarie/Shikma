import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { painPromise } from "@/data/site";

export default function PainPromise() {
  return (
    <Section className="bg-gradient-to-b from-void via-night to-void">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Eyebrow>הבסיס</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionTitle className="mt-6">
            רוב בעלי העסקים לא תקועים בגלל שיווק.{" "}
            <span className="text-gradient-gold">הם תקועים בגלל הבסיס.</span>
          </SectionTitle>
        </Reveal>

        <div className="mt-10 space-y-6">
          {painPromise.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.14 + i * 0.08}>
              <p
                className={
                  i === 1
                    ? "border-r-2 border-gold/60 pr-6 font-display text-2xl leading-snug font-bold text-gold-lt"
                    : "text-lg leading-relaxed text-cream/70"
                }
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
