import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { aboutTeaser, hero } from "@/data/site";

export default function About() {
  return (
    <Section id="about" className="bg-gradient-to-b from-void via-plum/25 to-void">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">
        <div>
          <Reveal>
            <Eyebrow>על רחלי חדד</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionTitle className="mt-6">
              לא סיסמאות.{" "}
              <span className="text-gradient-gold">תכלס מהשטח.</span>
            </SectionTitle>
          </Reveal>

          <div className="mt-8 space-y-5">
            {aboutTeaser.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.14 + i * 0.07}>
                <p className="text-lg leading-relaxed text-mist/70">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.38}>
            <Link
              href={aboutTeaser.cta.href}
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-gold/35 px-8 py-3.5 font-semibold text-mist transition hover:border-gold/70 hover:text-gold-lt"
            >
              {aboutTeaser.cta.label}
              <ArrowLeft
                className="size-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <dl className="grid grid-cols-2 gap-5">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-4xl glass px-6 py-8 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="ltr-nums block font-display text-4xl font-black text-gradient-gold">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-xs font-semibold text-gold/75">
                    {stat.suffix}
                  </span>
                  <span className="mt-1.5 block text-xs leading-snug text-mist/50">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
