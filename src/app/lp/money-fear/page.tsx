import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, X } from "lucide-react";
import LandingHeader from "@/components/lp/LandingHeader";
import RegisterForm from "@/components/lp/RegisterForm";
import { ArcScatter, GoldRule } from "@/components/lp/Ornaments";
import Reveal from "@/components/ui/Reveal";
import { moneyFearLanding as lp, registerAnchor } from "@/data/landing";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: lp.meta.title,
  description: lp.meta.description,
  openGraph: {
    type: "website",
    locale: "he_IL",
    title: lp.meta.title,
    description: lp.meta.description,
    images: [
      { url: lp.hero.image.src, width: 1672, height: 941, alt: lp.hero.image.alt },
    ],
  },
};

/**
 * The page runs on the campaign creative's own palette — cream ground, deep
 * teal ink, gold line art, coral accent — rather than the site's dark theme,
 * so the page a viewer lands on looks like the ad that sent them here.
 * `data-surface="light"` switches the document ground with it (globals.css).
 */
export default function WealthDnaLandingPage() {
  return (
    <div data-surface="light" className="bg-paper text-ink">
      <LandingHeader />

      <Hero />
      <Intro />
      <Proof />
      <IfSection />
      <Missing />
      <Skills />
      <Story />
      <Rebuild />
      <YourLife />
      <WhyCreated />
      <Discover />
      <Days />
      <Outcome />
      <Fit />
      <OneRequest />
      <Register />
      <LandingFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Cta({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={registerAnchor}
      className={`group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-bold text-paper shadow-[0_18px_36px_-20px_rgba(3,61,75,0.95)] transition hover:bg-flame-dp ${className}`}
    >
      {children}
      <ArrowLeft
        className="size-5 transition-transform group-hover:-translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold tracking-[0.28em] text-gold-ink">
      {children}
    </span>
  );
}

function Spark() {
  return (
    <Sparkles className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
  );
}

function Hero() {
  return (
    <section className="paper-wash relative overflow-hidden px-5 pt-28 sm:px-8 lg:px-0 lg:pt-0">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl lg:min-h-[46rem] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <Reveal>
            <p className="text-sm font-bold leading-snug text-flame-dp sm:text-base">
              {lp.hero.preheadTop}
              <span className="mt-1 block text-ink-2">{lp.hero.preheadSub}</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="lp-display mt-7 text-3xl text-ink sm:text-4xl">
              {lp.hero.eventName}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-2 text-sm font-bold tracking-wide text-flame-dp">
              {lp.hero.kicker}
            </p>
          </Reveal>

          <h1 className="lp-display mt-3 text-[2rem] leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
            {lp.hero.title.map((line, i) => (
              <Reveal key={line.text} delay={0.2 + i * 0.08}>
                <span className="block">
                  <span className={line.accent ? "text-flame" : "text-ink"}>
                    {line.text}
                  </span>
                </span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={0.34}>
            <GoldRule className="my-7" />
          </Reveal>

          <Reveal delay={0.4}>
            <ul className="lp-body max-w-xl text-ink-2">
              {lp.hero.conditions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.5}>
            <p className="mt-7 inline-flex flex-wrap items-center gap-x-2 rounded-full bg-ink px-5 py-2 text-xs font-bold tracking-[0.08em] text-paper">
              {lp.dates ? <span>{lp.dates} |</span> : null}
              <span>{lp.format}</span>
            </p>
          </Reveal>

          <Reveal delay={0.58}>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Cta>{lp.cta.label}</Cta>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-ink-2">
                {lp.hero.facts.map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <span
                      className="size-1.5 rounded-full bg-gold-ink"
                      aria-hidden="true"
                    />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* One image, two roles: it stacks under the copy on a phone, and from
          `lg` up it becomes the full-bleed backdrop with the headline sitting
          in the empty half of the frame. */}
      <div className="relative -mx-5 mt-10 sm:-mx-8 lg:absolute lg:inset-0 lg:m-0">
        <Image
          src={lp.hero.image.src}
          alt={lp.hero.image.alt}
          width={lp.hero.image.width}
          height={lp.hero.image.height}
          priority
          sizes="100vw"
          className="h-64 w-full object-cover object-[30%_top] sm:h-80 lg:h-full lg:object-[left_center]"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-paper via-paper/15 to-transparent lg:bg-[linear-gradient(270deg,var(--color-paper)_0%,var(--color-paper)_31%,color-mix(in_oklab,var(--color-paper)_80%,transparent)_44%,color-mix(in_oklab,var(--color-paper)_30%,transparent)_60%,transparent_76%)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="paper-wash-alt px-5 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <p className="text-lg leading-loose font-semibold text-balance text-ink sm:text-xl">
            {lp.intro.lead}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <GoldRule className="mx-auto my-8" />
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lp-body text-ink-2">{lp.intro.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="paper-wash px-5 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{lp.proof.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-display mt-5 text-3xl text-ink sm:text-4xl">
              {lp.proof.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {lp.proof.shots.map((shot, i) => (
            <Reveal key={shot.src} delay={0.1 + i * 0.08} className="w-full max-w-md">
              <figure className="overflow-hidden rounded-4xl border border-gold-ink/25 bg-paper/85 p-3 shadow-[0_30px_60px_-50px_rgba(3,61,75,0.6)]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={938}
                  height={637}
                  sizes="(max-width: 640px) 90vw, 28rem"
                  className="w-full rounded-3xl"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="lp-fine mt-8 text-center text-ink-2/70">{lp.proof.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function IfSection() {
  return (
    <section className="paper-wash-alt relative overflow-hidden px-5 py-24 sm:px-8 lg:py-28">
      <ArcScatter className="pointer-events-none absolute -left-32 top-10 size-[26rem] opacity-40" />

      <div className="relative mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{lp.ifSection.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="lp-display mt-5 text-4xl text-ink sm:text-5xl">
            {lp.ifSection.title}
          </h2>
        </Reveal>

        <ul className="mt-9 flex flex-col gap-5">
          {lp.ifSection.items.map((item, i) => (
            <Reveal key={item} delay={0.08 + i * 0.05}>
              <li className="flex gap-3">
                <Spark />
                <span className="lp-body text-ink-2">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.5}>
          <p className="lp-display mt-10 text-3xl text-flame sm:text-4xl">
            {lp.ifSection.turn}
          </p>
        </Reveal>

        <Reveal delay={0.56}>
          <p className="lp-body mt-6 text-ink">{lp.ifSection.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Missing() {
  return (
    <section className="paper-wash px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{lp.missing.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="lp-display mt-5 text-2xl leading-snug text-ink sm:text-4xl">
            {lp.missing.title}
            <span className="mt-2 block text-flame">{lp.missing.titleAccent}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <GoldRule className="my-9" />
        </Reveal>

        <ul className="lp-body flex flex-col text-ink-2">
          {lp.missing.learned.map((line, i) => (
            <Reveal key={line} delay={0.18 + i * 0.05}>
              <li>{line}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.44}>
          <p className="mt-8 text-lg leading-relaxed font-bold text-balance text-ink sm:text-xl">
            {lp.missing.pivot}
          </p>
        </Reveal>

        <ul className="lp-body mt-6 flex flex-col text-ink-2">
          {lp.missing.questions.map((line, i) => (
            <Reveal key={line} delay={0.48 + i * 0.05}>
              <li>{line}</li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="paper-wash-alt px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <Reveal>
            <Eyebrow>{lp.skills.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-display mt-5 text-4xl text-ink sm:text-5xl">
              {lp.skills.title}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lp-body mt-4 text-ink-2">{lp.skills.sub}</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lp.skills.items.map((item, i) => (
            <Reveal key={item.n} delay={0.1 + i * 0.08} className="h-full">
              <li className="flex h-full flex-col rounded-4xl border border-gold-ink/20 bg-paper/85 p-7 shadow-[0_30px_60px_-50px_rgba(3,61,75,0.6)]">
                <span className="lp-display text-3xl text-gold-ink/45" aria-hidden="true">
                  {item.n}
                </span>
                <h3 className="lp-display mt-3 text-2xl text-ink">{item.title}</h3>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Reveal delay={0.4}>
            <p className="lp-body text-ink-2">{lp.skills.kicker}</p>
          </Reveal>
          <Reveal delay={0.46}>
            <p className="lp-display mx-auto mt-4 max-w-3xl text-2xl leading-snug text-balance text-flame sm:text-4xl">
              {lp.skills.punch}
            </p>
          </Reveal>
          <Reveal delay={0.54}>
            <p className="lp-body mt-6 text-ink">{lp.skills.close}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="paper-wash px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{lp.story.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="lp-display mt-5 text-3xl leading-snug text-ink sm:text-5xl">
            {lp.story.headline}
          </h2>
        </Reveal>

        <ul className="lp-body mt-7 flex flex-col text-ink-2">
          {lp.story.facts.map((line, i) => (
            <Reveal key={line} delay={0.12 + i * 0.05}>
              <li>{line}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.34}>
          <p className="lp-body mt-6 text-ink-2">{lp.story.outside}</p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="lp-display mt-10 text-2xl leading-snug text-flame sm:text-4xl">
            {lp.story.turn}
          </p>
        </Reveal>

        <Reveal delay={0.46}>
          <p className="lp-body mt-6 text-ink-2">{lp.story.numbers}</p>
        </Reveal>

        <Reveal delay={0.52}>
          <p className="lp-body mt-6 text-ink-2">{lp.story.truthLead}</p>
        </Reveal>

        <Reveal delay={0.58}>
          <div className="mt-6 rounded-4xl border border-gold-ink/30 bg-mist/55 p-8 sm:p-10">
            {lp.story.truth.map((line) => (
              <p
                key={line}
                className="lp-display text-2xl leading-snug text-ink sm:text-3xl"
              >
                {line}
              </p>
            ))}
          </div>
        </Reveal>

        <ul className="lp-body mt-8 flex flex-col text-ink-2">
          {lp.story.detail.map((line, i) => (
            <Reveal key={line} delay={0.6 + i * 0.04}>
              <li>{line}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.84}>
          <p className="mt-7 text-lg font-bold text-ink">{lp.story.cost}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Rebuild() {
  return (
    <section className="paper-wash-alt relative overflow-hidden px-5 py-24 sm:px-8 lg:py-28">
      <ArcScatter className="pointer-events-none absolute -right-28 bottom-0 size-[26rem] opacity-40" />

      <div className="relative mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{lp.rebuild.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="lp-display mt-5 text-3xl leading-snug text-ink sm:text-4xl">
            {lp.rebuild.title}
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="lp-body mt-6 text-ink-2">{lp.rebuild.lead}</p>
        </Reveal>

        <ul className="mt-7 flex flex-col gap-2 border-r-2 border-flame/50 pr-5">
          {lp.rebuild.questions.map((line, i) => (
            <Reveal key={line} delay={0.18 + i * 0.05}>
              <li className="lp-body font-semibold text-ink">{line}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.5}>
          <p className="lp-display mt-9 text-2xl text-flame sm:text-4xl">
            {lp.rebuild.punch}
          </p>
        </Reveal>

        <Reveal delay={0.56}>
          <p className="lp-body mt-8 text-ink-2">{lp.rebuild.todayLead}</p>
        </Reveal>

        <ul className="lp-body mt-5 flex flex-col text-ink-2">
          {lp.rebuild.today.map((line, i) => (
            <Reveal key={line} delay={0.6 + i * 0.04}>
              <li>{line}</li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function YourLife() {
  return (
    <section className="paper-wash px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <Eyebrow>{lp.yourLife.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="lp-display mt-5 text-2xl leading-snug text-ink sm:text-3xl">
            {lp.yourLife.disclaimer}
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="lp-body mt-5 text-ink-2">{lp.yourLife.lead}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="lp-display mt-7 text-3xl leading-tight text-balance text-flame sm:text-5xl">
            {lp.yourLife.question}
          </p>
        </Reveal>

        <ul className="lp-body mx-auto mt-9 flex max-w-md flex-col text-ink-2">
          {lp.yourLife.options.map((line, i) => (
            <Reveal key={line} delay={0.24 + i * 0.04}>
              <li>{line}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.56}>
          <GoldRule className="mx-auto my-10" />
        </Reveal>

        <Reveal delay={0.6}>
          <p className="lp-display text-2xl leading-snug text-ink sm:text-3xl">
            {lp.yourLife.punch}
          </p>
        </Reveal>

        <Reveal delay={0.66}>
          <p className="lp-body mt-4 text-ink-2">{lp.yourLife.punchSub}</p>
        </Reveal>
      </div>
    </section>
  );
}

function WhyCreated() {
  return (
    <section className="paper-wash-alt px-5 py-20 sm:px-8">
      <Reveal>
        <div className="mx-auto w-full max-w-4xl rounded-5xl border border-gold-ink/30 bg-mist/55 p-9 text-center sm:p-14">
          <Eyebrow>{lp.why.eyebrow}</Eyebrow>

          <h2 className="lp-display mt-5 text-4xl text-ink sm:text-5xl">
            {lp.why.title}
          </h2>

          <p className="mt-4 text-base font-bold text-flame-dp sm:text-lg">
            {lp.why.sub}
          </p>

          <p className="lp-body mx-auto mt-6 max-w-2xl text-ink-2">{lp.why.body}</p>

          <p className="lp-display mx-auto mt-5 max-w-2xl text-xl leading-snug text-balance text-ink sm:text-2xl">
            {lp.why.punch}
          </p>

          <div className="mt-9">
            <Cta>{lp.cta.mid}</Cta>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Discover() {
  return (
    <section className="paper-wash px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{lp.discover.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="lp-display mt-5 text-3xl text-ink sm:text-5xl">
            {lp.discover.title}
          </h2>
        </Reveal>

        <ul className="mt-9 flex flex-col gap-5">
          {lp.discover.items.map((item, i) => (
            <Reveal key={item} delay={0.1 + i * 0.06}>
              <li className="flex gap-3">
                <Spark />
                <span className="lp-body text-ink-2">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Days() {
  return (
    <section className="paper-wash-alt px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <Reveal>
            <Eyebrow>{lp.days.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-display mt-5 text-3xl text-ink sm:text-4xl">
              {lp.days.title}
            </h2>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {lp.days.items.map((day, i) => (
            <Reveal key={day.label} delay={0.1 + i * 0.1} className="h-full">
              <li className="flex h-full flex-col rounded-4xl border border-gold-ink/20 bg-paper/85 p-8 shadow-[0_30px_60px_-50px_rgba(3,61,75,0.6)]">
                <span className="text-xs font-bold tracking-[0.2em] text-gold-ink">
                  {day.label}
                </span>
                <h3 className="lp-display mt-3 text-2xl leading-tight text-flame">
                  {day.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed font-semibold text-ink">
                  {day.sub}
                </p>
                <p className="lp-body mt-4 text-ink-2">{day.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Outcome() {
  return (
    <section className="paper-wash px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <Eyebrow>{lp.outcome.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="lp-body mt-5 text-ink-2">{lp.outcome.lead}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="lp-display mt-6 text-2xl leading-snug text-balance text-ink sm:text-4xl">
            {lp.outcome.question}
          </p>
        </Reveal>

        <ul className="lp-body mt-8 flex flex-col text-ink-2">
          {lp.outcome.notList.map((line, i) => (
            <Reveal key={line} delay={0.2 + i * 0.05}>
              <li>{line}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.32}>
          <p className="lp-body mt-7 text-ink">{lp.outcome.close}</p>
        </Reveal>

        <Reveal delay={0.38}>
          <ul className="mx-auto mt-5 flex max-w-sm flex-col gap-1">
            {lp.outcome.list.map((line) => (
              <li key={line} className="text-lg font-bold text-ink sm:text-xl">
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Fit() {
  return (
    <section className="paper-wash-alt px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <Eyebrow>{lp.fit.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-4xl border border-gold-ink/25 bg-paper/85 p-8 shadow-[0_30px_60px_-50px_rgba(3,61,75,0.6)]">
              <h2 className="lp-display text-2xl text-ink sm:text-3xl">
                {lp.fit.forTitle}
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {lp.fit.forItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-ink"
                      aria-hidden="true"
                    />
                    <span className="lp-body text-ink-2">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="lp-display mt-7 text-xl leading-snug text-balance text-flame sm:text-2xl">
                {lp.fit.forPunch}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col rounded-4xl border border-ink/12 bg-mist/40 p-8">
              <h2 className="lp-display text-2xl text-ink sm:text-3xl">
                {lp.fit.notTitle}
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {lp.fit.notItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <X
                      className="mt-0.5 size-4 shrink-0 text-flame-dp"
                      aria-hidden="true"
                    />
                    <span className="lp-body text-ink-2">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OneRequest() {
  return (
    <section className="paper-wash px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{lp.request.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="lp-display mt-5 text-2xl leading-snug text-ink sm:text-4xl">
            {lp.request.title}
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="lp-body mt-6 text-ink-2">{lp.request.lead}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="lp-display mt-6 text-2xl leading-snug text-balance text-flame sm:text-4xl">
            {lp.request.question}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="lp-body mt-7 text-ink">{lp.request.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section
      id="register"
      className="paper-wash-alt relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 lg:py-32"
    >
      <ArcScatter className="pointer-events-none absolute -right-28 top-10 size-[26rem] opacity-50" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>{lp.register.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="lp-display mt-5 text-4xl text-ink sm:text-5xl">
              {lp.register.title}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="lp-body mt-4 text-ink-2">{lp.register.sub}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 inline-flex items-center rounded-full bg-ink px-5 py-2 text-xs font-bold tracking-[0.08em] text-paper">
              {lp.dates ? `${lp.dates} | ` : ""}
              {lp.format}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <GoldRule className="my-9" />
          </Reveal>

          <Reveal delay={0.3}>
            <p className="lp-display text-2xl leading-snug text-ink sm:text-3xl">
              {lp.register.hook}
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <p className="lp-display mt-3 text-xl leading-snug text-flame sm:text-2xl">
              {lp.register.hookSub}
            </p>
          </Reveal>

          <Reveal delay={0.42}>
            <p className="mt-4 text-lg font-bold text-ink">{lp.register.hookClose}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <RegisterForm />
        </Reveal>
      </div>
    </section>
  );
}

function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold-ink/25 bg-paper px-5 py-10 sm:px-8">
      <div className="lp-fine mx-auto flex w-full max-w-5xl flex-col gap-4 text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="ltr-nums">
          © {year} {site.name} · כל הזכויות שמורות | עיצוב ובנייה: {site.credit}
        </p>
        <div className="flex flex-wrap gap-6">
          <Link href="/" className="transition hover:text-flame-dp">
            לאתר הראשי
          </Link>
          <Link href="/legal/terms" className="transition hover:text-flame-dp">
            תקנון ותנאי שימוש
          </Link>
          <Link href="/legal/privacy" className="transition hover:text-flame-dp">
            מדיניות פרטיות
          </Link>
        </div>
      </div>
    </footer>
  );
}
