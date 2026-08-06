import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { about } from "@/data/site";

export default function About() {
  return (
    <Section id="about" className="bg-gradient-to-b from-void via-night to-void">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-24">
        <div>
          <Reveal>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionTitle className="mt-6">
              עברתי פשיטת רגל.
              <br />
              <span className="text-gradient-gold">ומשם בניתי אימפריה.</span>
            </SectionTitle>
          </Reveal>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.14 + i * 0.07}>
                <p className="text-lg leading-relaxed text-mist/70">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <figure className="mt-10 border-r-2 border-gold/60 pr-6">
              <blockquote className="font-display text-2xl leading-snug font-bold text-gold-lt">
                „הכסף לא מגיע למי שעובדת הכי קשה. הוא מגיע למי שהראש שלה מוכן
                לקבל אותו.”
              </blockquote>
            </figure>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {about.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.1 + i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-4xl glass p-7 transition duration-500 hover:border-gold/45">
                <span
                  className="absolute -right-14 -top-14 size-36 rounded-full bg-gold/10 blur-2xl transition duration-500 group-hover:bg-gold/20"
                  aria-hidden="true"
                />
                <span
                  className="ltr-nums relative block font-display text-5xl font-black text-gold/25 transition group-hover:text-gold/45"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-4 font-display text-xl font-bold text-mist">
                  {pillar.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-mist/60">
                  {pillar.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
