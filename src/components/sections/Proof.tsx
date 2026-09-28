import { Section, SectionTitle } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ScriptLine } from "@/components/ui/Editorial";
import { BrandStar } from "@/components/ui/Wordmark";
import { proof } from "@/data/site";

/**
 * The credential band. Everything on it is a fact Racheli supplied —
 * see the note on `proof` in `src/data/site.ts` before editing.
 *
 * Pale, not teal. The reference keeps dark for two moments only, and this
 * band already competes with the one that earns it: the pull-quote card
 * two screens up. It also carries the numbers that used to be repeated
 * under the hero, so it is the only place on the page they appear.
 */
export default function Proof() {
  return (
    <Section surface="light" className="bg-cream">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionTitle>{proof.title}</SectionTitle>
        </Reveal>
        <Reveal delay={0.08}>
          <ScriptLine className="mt-5">{proof.script}</ScriptLine>
        </Reveal>
      </div>

      <dl className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-gold/35 sm:grid-cols-2 lg:grid-cols-4">
        {proof.items.map((item, i) => (
          <Reveal key={item.body} delay={0.06 * i} className="h-full">
            <div className="flex h-full flex-col bg-ivory px-7 py-9">
              <BrandStar className="size-3.5 text-gold" />
              <dt className="mt-5 flex items-baseline gap-2">
                <span className="ltr-nums font-display text-4xl font-black text-teal">
                  {item.value}
                </span>
                <span className="text-sm font-semibold text-gold-ink">
                  {item.unit}
                </span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-fg2">
                {item.body}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
