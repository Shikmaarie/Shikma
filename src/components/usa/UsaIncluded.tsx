import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { included } from "@/data/usaSeminar";

export default function UsaIncluded() {
  return (
    <section className="relative overflow-hidden bg-void px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative mx-auto w-full max-w-4xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow>{included.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight font-black text-cream sm:text-5xl">
              {included.title}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-4xl border border-gold/25 bg-gold/15 sm:grid-cols-2">
            {included.items.map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-4 bg-void px-7 py-6 ${
                  // The odd item out spans the full width so the grid never
                  // ends on a ragged half-row.
                  i === included.items.length - 1 &&
                  included.items.length % 2 === 1
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-lt to-gold-dp"
                  aria-hidden="true"
                >
                  <Check className="size-4 text-void" strokeWidth={3} />
                </span>
                <span className="text-base text-cream/90 sm:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
