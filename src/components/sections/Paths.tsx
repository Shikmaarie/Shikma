import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { paths } from "@/data/site";

const accentRing: Record<string, string> = {
  gold: "hover:border-gold/60 hover:shadow-[0_28px_80px_-40px_rgba(212,169,95,0.7)]",
  coral: "hover:border-coral/60 hover:shadow-[0_28px_80px_-40px_rgba(227,163,182,0.6)]",
  peri:
    "hover:border-peri/60 hover:shadow-[0_28px_80px_-40px_rgba(154,113,214,0.6)]",
};

export default function Paths() {
  return (
    <Section id="paths" className="bg-void">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>בחרו את המסלול שלכם</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionTitle className="mt-6">
            איפה אתם נמצאים{" "}
            <span className="text-gradient-gold">היום במסע?</span>
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 text-lg leading-relaxed text-cream/60">
            {paths.sub}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {paths.cards.map((card, i) => (
          <Reveal key={card.title} delay={0.08 + i * 0.09} className="h-full">
            <article
              className={`group relative flex h-full flex-col overflow-hidden rounded-5xl glass p-8 transition duration-500 ${accentRing[card.accent]}`}
            >
              <span
                className="absolute -left-16 -top-16 size-44 rounded-full bg-gold/8 blur-3xl transition duration-500 group-hover:bg-gold/16"
                aria-hidden="true"
              />

              <span className="relative text-4xl" aria-hidden="true">
                {card.icon}
              </span>

              <p className="relative mt-5 text-xs font-bold tracking-[0.14em] text-gold/75">
                {card.kicker}
              </p>

              <h3 className="relative mt-3 font-display text-2xl font-bold text-cream sm:text-3xl">
                <Link
                  href={card.cta.href}
                  className="after:absolute after:inset-0"
                >
                  {card.title}
                </Link>
              </h3>

              <p className="relative mt-4 flex-1 leading-relaxed text-cream/60">
                {card.body}
              </p>

              <span className="relative mt-7 inline-flex items-center gap-2 font-semibold text-gold-lt">
                {card.cta.label}
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1.5"
                  aria-hidden="true"
                />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
