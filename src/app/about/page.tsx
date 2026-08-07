import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutPage, hero } from "@/data/site";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "הסיפור של רחלי חדד — מפשיטת רגל בגיל 20 ל-3 עסקים בשש ספרות בחודש וחיים של חופש כלכלי אמיתי.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="אודות" title={aboutPage.title} />

      <Section className="bg-void !pt-6">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Timeline */}
          <ol className="relative flex flex-col gap-10 border-r border-gold/20 pr-8">
            {aboutPage.chapters.map((chapter, i) => (
              <Reveal key={chapter.label} delay={i * 0.09}>
                <li className="relative">
                  <span
                    className="absolute -right-[2.55rem] top-1 grid size-6 place-items-center rounded-full border border-gold/45 bg-void text-[10px] font-black text-gold"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-gold-lt">
                    {chapter.label}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-mist/70">
                    {chapter.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-5xl glass p-8">
                <h2 className="font-display text-xl font-bold text-mist">
                  {aboutPage.creed.label}
                </h2>
                <p className="mt-4 leading-relaxed text-mist/70">
                  {aboutPage.creed.body}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 gap-4">
                {hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl glass px-5 py-6 text-center"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="ltr-nums block font-display text-3xl font-black text-gradient-gold">
                        {stat.value}
                      </span>
                      <span className="mt-1.5 block text-[11px] font-semibold text-gold/75">
                        {stat.suffix}
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-mist/50">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.16}>
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-4 font-bold text-void transition hover:brightness-110"
              >
                בואו נדבר
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
