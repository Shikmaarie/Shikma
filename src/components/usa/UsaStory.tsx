import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { Aurora } from "./Atmosphere";
import { story } from "@/data/usaSeminar";

/**
 * Racheli's credibility, told as the drop and the climb. The milestone figures
 * sit alongside the prose rather than under it, so the numbers carry weight
 * without turning into a stat bar.
 */
export default function UsaStory() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-void via-night to-void px-5 py-24 sm:px-8 lg:py-32">
      <Aurora intensity={0.5} />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight font-black text-cream sm:text-5xl">
              {story.title}
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-5">
            {story.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={0.06 + i * 0.05}>
                <p
                  className={
                    i === 1
                      ? "border-r-2 border-gold pr-5 font-display text-xl leading-snug font-bold text-gradient-gold sm:text-2xl"
                      : "text-base leading-relaxed text-cream/70 sm:text-lg"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.14}>
          <dl className="glass flex flex-col gap-8 rounded-4xl p-8 sm:p-10">
            {story.milestones.map((milestone) => (
              <div key={milestone.label}>
                <dt className="sr-only">{milestone.label}</dt>
                <dd>
                  <span className="ltr-nums block font-display text-5xl font-black text-gradient-gold sm:text-6xl">
                    {milestone.value}
                  </span>
                  <span className="mt-2 block text-sm leading-snug text-cream/55">
                    {milestone.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
