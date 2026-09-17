import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import {
  CircleMark,
  DoodleArrow,
  GhostBand,
  Photo,
  ScriptLine,
  pill,
} from "@/components/ui/Editorial";
import { aboutTeaser } from "@/data/site";
import { photos } from "@/data/media";

export default function About() {
  return (
    <Section id="about" className="bg-shell" bleed>
      <GhostBand text={aboutTeaser.ghost} className="py-10" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <Reveal>
            <Photo
              slot={photos.story}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-4/5 w-full rounded-[2.5rem] rounded-bl-[8rem]"
            />
          </Reveal>

          <div className="relative">
            <Reveal>
              <Eyebrow>על רחלי חדד</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <SectionTitle className="mt-6">
                לא סיסמאות.
                <br />
                <CircleMark>{aboutTeaser.mark}</CircleMark> מהשטח.
              </SectionTitle>
            </Reveal>

            <Reveal delay={0.13}>
              <ScriptLine className="mt-6">{aboutTeaser.script}</ScriptLine>
            </Reveal>

            <div className="mt-7 space-y-5">
              {aboutTeaser.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.18 + i * 0.07}>
                  <p className="leading-relaxed text-fg2 sm:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <Link href={aboutTeaser.cta.href} className={`group mt-9 ${pill.solid}`}>
                {aboutTeaser.cta.label}
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>

            <DoodleArrow className="absolute -bottom-4 left-4 hidden w-24 rotate-[190deg] text-accent-soft/50 lg:block" />
          </div>
        </div>
      </div>
    </Section>
  );
}
