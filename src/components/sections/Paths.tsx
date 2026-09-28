import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { DoodleArrow } from "@/components/ui/Editorial";
import { PathIcon } from "@/components/ui/BrandIcons";
import { paths } from "@/data/site";

/** Hover tint per route, keyed to the swatch-sheet accents. */
const accentRing: Record<string, string> = {
  gold: "hover:border-gold-dp/60 hover:shadow-[0_28px_70px_-42px_rgba(176,136,80,0.85)]",
  coral: "hover:border-coral/70 hover:shadow-[0_28px_70px_-42px_rgba(217,96,79,0.6)]",
  peri: "hover:border-peri/60 hover:shadow-[0_28px_70px_-42px_rgba(142,155,246,0.6)]",
};

export default function Paths() {
  return (
    <Section id="paths" className="bg-ivory">
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>בחרו את המסלול שלכם</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionTitle className="mt-6">{paths.title}</SectionTitle>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-5 text-lg leading-relaxed text-fg2">{paths.sub}</p>
        </Reveal>

        <DoodleArrow
          className="absolute -left-8 top-16 hidden w-24 -scale-x-100 text-accent-soft/50 xl:block"
        />
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {paths.cards.map((card, i) => (
          <Reveal key={card.title} delay={0.08 + i * 0.08} className="h-full">
            <article
              className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] panel transition duration-500 ${accentRing[card.accent]}`}
            >
              {/* A teal head with the gold disc straddling its edge — the
                  reference's card device. It runs on colour rather than a
                  photograph, so it needs no asset that does not exist. */}
              <div
                className="relative h-24 overflow-hidden bg-gradient-to-bl from-teal-2 via-teal to-night"
                aria-hidden="true"
              >
                {/* The card's own motif, blown up and dropped to a whisper, so
                    the head carries something where the reference carries a
                    photograph. */}
                <PathIcon
                  motif={card.motif}
                  className="absolute -bottom-10 left-6 size-36 text-gold/12"
                />
                <span
                  className="pointer-events-none absolute -top-16 right-1/3 size-40 rounded-full bg-mint/12 blur-2xl"
                />
                <span
                  className="absolute -bottom-7 right-8 grid size-14 place-items-center rounded-full bg-gradient-to-br from-gold-lt to-gold-dp text-void shadow-[0_10px_24px_-12px_rgba(4,24,28,0.8)]"
                >
                  <PathIcon motif={card.motif} className="size-7" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-8 pt-11">
              <p className="text-xs font-bold tracking-[0.12em] text-accent">
                {card.kicker}
              </p>

              <h3 className="mt-2.5 font-display text-2xl font-bold text-fg sm:text-[1.7rem]">
                <Link href={card.cta.href} className="after:absolute after:inset-0">
                  {card.title}
                </Link>
              </h3>

              <p className="mt-4 flex-1 leading-relaxed text-fg2">{card.body}</p>

              <span className="mt-7 inline-flex items-center gap-2 font-semibold text-accent">
                {card.cta.label}
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1.5"
                  aria-hidden="true"
                />
              </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
