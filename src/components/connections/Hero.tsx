import Reveal from "@/components/ui/Reveal";
import LandingCta from "./LandingCta";
import { connectionsCta, connectionsHero } from "@/data/connections";

export default function Hero() {
  return (
    <section className="relative bg-forest px-5 pt-20 pb-12 text-center sm:px-8 sm:pt-24 lg:pb-16">
      <LandingCta
        tone="sand"
        label={connectionsCta.short}
        className="absolute top-5 left-5 sm:top-7 sm:left-8"
      />

      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <h1 className="text-3xl leading-[1.25] font-black text-white sm:text-4xl lg:text-[3.25rem]">
            {connectionsHero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-1 block text-sand sm:text-[1.1em]">
              {connectionsHero.titleGold}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 rounded-full bg-sand px-6 py-4 text-base font-medium text-forest-dp sm:mt-12 sm:px-10 sm:text-lg lg:text-xl">
            {connectionsHero.banner}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 text-sm text-parchment/70 italic sm:text-base">
            {connectionsHero.meta}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
