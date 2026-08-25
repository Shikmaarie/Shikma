import Reveal from "@/components/ui/Reveal";
import { connectionsTwoWays } from "@/data/connections";

export default function TwoWays() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <h2 className="text-center text-3xl leading-[1.3] font-black text-forest sm:text-4xl lg:text-5xl">
            {connectionsTwoWays.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {connectionsTwoWays.cards.map((card, i) => (
            <Reveal key={card.number} delay={0.08 + i * 0.08}>
              <article className="relative h-full overflow-hidden rounded-4xl bg-gradient-to-br from-[#7fb5ac] via-[#4b8f86] to-[#2c7168] p-8 sm:p-10 lg:min-h-[26rem]">
                {/* The soft light sweep across the card face */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_0%,rgba(255,255,255,0.34),transparent_60%)]"
                />

                <div className="relative">
                  <span
                    aria-hidden
                    className="block text-5xl leading-none font-black text-gold-lt/85 sm:text-6xl"
                  >
                    {card.number}
                  </span>

                  <h3 className="mt-6 text-xl font-black text-white sm:text-2xl">
                    {card.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-white/90 sm:text-lg">
                    {card.body}
                  </p>

                  <ul className="mt-7 space-y-2.5">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm text-white/90 sm:text-base"
                      >
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-white/80" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
