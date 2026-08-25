import Reveal from "@/components/ui/Reveal";
import LandingCta from "./LandingCta";
import { connectionsIntro } from "@/data/connections";

export default function ClubIntro() {
  return (
    <section className="bg-parchment px-5 pt-4 pb-20 text-center sm:px-8 lg:pb-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <h2 className="text-2xl leading-[1.3] font-black text-forest sm:text-3xl lg:text-[2.75rem]">
            {connectionsIntro.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-5 text-lg text-forest-dp sm:text-xl lg:text-2xl">
            {connectionsIntro.sub}
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8 space-y-2 text-base leading-relaxed text-forest-dp/90 sm:text-lg lg:text-xl">
            {connectionsIntro.body.map((line) => (
              <p key={line.text}>
                {line.strong ? <strong className="font-bold">{line.text}</strong> : line.text}
                {line.tail}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <LandingCta className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
