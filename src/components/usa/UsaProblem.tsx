import Reveal from "@/components/ui/Reveal";
import { Aurora } from "./Atmosphere";
import { problem } from "@/data/usaSeminar";

/**
 * The diagnosis. Five everyday money moments as cards, then the turn: the
 * problem isn't the money, it's the relationship with it.
 */
export default function UsaProblem() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-void via-night to-void px-5 py-24 sm:px-8 lg:py-32">
      <Aurora intensity={0.6} />

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <h2 className="text-center font-display text-4xl leading-tight font-black text-cream sm:text-5xl lg:text-6xl">
            {problem.title}
          </h2>
          <p className="mt-6 text-center text-lg text-cream/60">{problem.intro}</p>
        </Reveal>

        <ul className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
          {problem.triggers.map((trigger, i) => (
            <Reveal key={trigger} delay={i * 0.07}>
              <li className="glass rounded-full px-6 py-3.5 text-sm font-medium text-cream/90 sm:text-base">
                {trigger}
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.12}>
          <p className="mt-14 text-center text-xl font-semibold text-coral sm:text-2xl">
            {problem.turn}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 text-center">
            <p className="text-lg text-cream/65 sm:text-xl">{problem.reveal}</p>
            <p className="mt-4 font-display text-3xl leading-tight font-black sm:text-4xl lg:text-5xl">
              <span className="text-gradient-gold">{problem.punch}</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mx-auto mt-12 max-w-md border-t border-gold/20 pt-8 text-center text-base text-cream/70 sm:text-lg">
            {problem.close}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
