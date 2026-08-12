import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { agenda } from "@/data/usaSeminar";

/**
 * What actually happens across the two days, as five numbered moves, closed
 * by the three-line rebuttal to "another motivational talk".
 */
export default function UsaAgenda() {
  return (
    <section className="relative overflow-hidden bg-void px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <Eyebrow>{agenda.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight font-black text-cream sm:text-5xl lg:text-6xl">
            {agenda.title}
          </h2>
        </Reveal>

        <ol className="mt-16 flex flex-col">
          {agenda.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <li className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-gold/12 py-8 sm:gap-x-10 lg:grid-cols-[auto_0.9fr_1.1fr]">
                <span
                  className="ltr-nums font-display text-2xl font-black text-gold/35 transition-colors group-hover:text-gold sm:text-3xl"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display text-xl font-bold text-cream sm:text-2xl">
                  {step.title}
                </h3>

                <p className="col-start-2 text-base leading-relaxed text-cream/60 lg:col-start-3 lg:row-start-1">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-gold/12 pt-16 text-center">
            {agenda.punch.map((line, i) => (
              <p
                key={line}
                className={`font-display text-3xl leading-tight font-black sm:text-4xl lg:text-5xl ${
                  i === agenda.punch.length - 1
                    ? "mt-2 text-gradient-gold"
                    : "text-cream/35"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
