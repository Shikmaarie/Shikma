import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import LandingHeader from "@/components/lp/LandingHeader";
import RegisterForm from "@/components/lp/RegisterForm";
import { ArcScatter, GoldRule, Marker } from "@/components/lp/Ornaments";
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
    images: [{ url: lp.poster.src, width: 1086, height: 1448, alt: lp.poster.alt }],
  },
};

/**
 * The page runs on the campaign creative's own palette — cream ground, deep
 * teal ink, gold line art, coral accent — rather than the site's dark theme,
 * so the page a viewer lands on looks like the ad that sent them here.
 * `data-surface="light"` switches the document ground with it (globals.css).
 */
export default function MoneyFearLandingPage() {
  return (
    <div data-surface="light" className="bg-paper text-ink">
      <LandingHeader />

      <Hero />
      <Story />
      <Why />
      <Agenda />
      <Proof />
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

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper-2 via-paper to-paper px-5 pt-32 pb-20 sm:px-8 lg:pt-40 lg:pb-28">
      <ArcScatter className="pointer-events-none absolute -right-24 -top-24 size-[30rem] opacity-70" />
      <span
        className="pointer-events-none absolute -left-40 top-1/3 size-[34rem] rounded-full bg-mist/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-xs font-bold tracking-[0.1em] text-paper">
              {lp.hero.badge}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 text-2xl leading-tight font-bold text-ink sm:text-3xl">
              {lp.hero.kicker}{" "}
              <span className="text-flame">{lp.hero.kickerAccent}</span>
            </p>
          </Reveal>

          <h1 className="mt-3 text-[2.6rem] leading-[1.06] font-black tracking-tight sm:text-6xl lg:text-[4rem]">
            {lp.hero.title.map((line, i) => (
              <Reveal key={line.text} delay={0.12 + i * 0.08}>
                <span className="block">
                  <span className={line.gold ? "text-flame" : "text-ink"}>
                    {line.text}
                  </span>
                </span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={0.26}>
            <GoldRule className="my-8" />
          </Reveal>

          <Reveal delay={0.32}>
            <p className="max-w-xl text-lg leading-loose font-semibold text-ink sm:text-xl">
              <Marker>{lp.hero.lead.marker}</Marker>
              {lp.hero.lead.middle}
              <span className="decoration-flame decoration-[3px] underline-offset-[6px] [text-decoration-line:underline]">
                {lp.hero.lead.underline}
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
              {lp.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.46}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Cta>{lp.cta.label}</Cta>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-ink-2">
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

        <Reveal delay={0.2}>
          {/* The source frame is a tall banner crop; boxing it to 3:4 and
              anchoring to the top keeps her face in view and stops the
              portrait from setting the height of the whole hero. */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-50px_rgba(3,61,75,0.6)] lg:max-w-md">
            <Image
              src={lp.hero.portrait.src}
              alt={lp.hero.portrait.alt}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 28rem"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative bg-white px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{lp.story.eyebrow}</Eyebrow>
        </Reveal>

        <ul className="mt-7 flex flex-col gap-3">
          {lp.story.denials.map((line, i) => (
            <Reveal key={line} delay={0.06 * i}>
              <li className="text-2xl font-black text-ink sm:text-4xl">{line}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <GoldRule className="my-9" />
        </Reveal>

        {lp.story.paragraphs.map((p, i) => (
          <Reveal key={p} delay={0.24 + i * 0.06}>
            <p className="mt-6 text-lg leading-loose text-ink-2">{p}</p>
          </Reveal>
        ))}

        <Reveal delay={0.4}>
          <div className="mt-12 rounded-4xl border border-gold-ink/30 bg-paper-2 p-8 sm:p-10">
            <p className="text-2xl leading-snug font-black text-flame sm:text-3xl">
              {lp.story.question}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              {lp.story.answer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="relative overflow-hidden bg-paper px-5 py-24 sm:px-8 lg:py-32">
      <ArcScatter className="pointer-events-none absolute -left-32 bottom-0 size-[26rem] opacity-50" />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <Eyebrow>{lp.why.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <blockquote className="mt-7 text-3xl leading-[1.25] font-black text-ink sm:text-5xl">
            {lp.why.quote}
          </blockquote>
        </Reveal>

        <Reveal delay={0.14}>
          <GoldRule className="mx-auto my-10" />
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-lg font-semibold text-ink-2">{lp.why.intro}</p>
        </Reveal>

        <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-3">
          {lp.why.notList.map((item, i) => (
            <Reveal key={item} delay={0.22 + i * 0.06}>
              <li className="rounded-full border border-ink/12 bg-white px-5 py-2.5 text-base text-ink-2 line-through decoration-flame decoration-2">
                {item}
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.5}>
          <p className="mt-10 text-3xl font-black text-flame sm:text-4xl">
            {lp.why.turn}
          </p>
        </Reveal>

        <Reveal delay={0.58}>
          <p className="mt-6 text-lg text-ink-2">{lp.why.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Agenda() {
  return (
    <section className="relative bg-paper-2 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <Eyebrow>{lp.agenda.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-7 max-w-3xl text-3xl leading-tight font-black text-ink sm:text-5xl">
            <span className="text-flame" aria-hidden="true">
              „
            </span>
            {lp.agenda.quote}
            <span className="text-flame" aria-hidden="true">
              ”
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            {lp.agenda.lead}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {lp.agenda.items.map((item, i) => (
            <Reveal key={item.n} delay={0.1 + i * 0.08} className="h-full">
              <li className="flex h-full flex-col rounded-4xl border border-gold-ink/20 bg-white p-8 shadow-[0_30px_60px_-50px_rgba(3,61,75,0.6)]">
                <span
                  className="text-4xl font-black text-gold-ink/45"
                  aria-hidden="true"
                >
                  {item.n}
                </span>
                <h3 className="mt-4 text-xl font-black text-ink sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-2">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.4}>
          <p className="mt-12 max-w-3xl text-lg leading-relaxed text-ink-2">
            {lp.agenda.outro}
          </p>
        </Reveal>

        <Reveal delay={0.46}>
          <div className="mt-10 flex flex-col gap-8 rounded-4xl bg-ink p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <p className="max-w-xl text-xl leading-snug font-bold text-paper sm:text-2xl">
              {lp.agenda.promise}
            </p>
            <a
              href={registerAnchor}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-flame px-8 py-4 text-base font-bold text-white transition hover:brightness-105"
            >
              {lp.cta.short}
              <ArrowLeft
                className="size-5 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="bg-paper px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{lp.proof.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-3xl font-black text-ink sm:text-5xl">
              {lp.proof.title}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <GoldRule className="mt-8" />
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {lp.proof.shots.map((shot, i) => (
            <Reveal
              key={shot.src}
              delay={0.1 + i * 0.08}
              className="w-full max-w-md"
            >
              <figure className="overflow-hidden rounded-4xl border border-gold-ink/25 bg-white p-3 shadow-[0_30px_60px_-50px_rgba(3,61,75,0.6)]">
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
          <p className="mt-8 text-center text-xs text-ink-2/70">{lp.proof.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section
      id="register"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-paper-2 to-mist/60 px-5 py-24 sm:px-8 lg:py-32"
    >
      <ArcScatter className="pointer-events-none absolute -right-28 top-10 size-[26rem] opacity-50" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Image
            src={lp.poster.src}
            alt={lp.poster.alt}
            width={1086}
            height={1448}
            sizes="(max-width: 1024px) 85vw, 38rem"
            className="mx-auto w-full max-w-sm rounded-4xl shadow-[0_40px_80px_-50px_rgba(3,61,75,0.65)] lg:max-w-none"
          />
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{lp.register.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-5 flex flex-wrap items-center gap-x-3 text-3xl leading-tight font-black text-ink sm:text-4xl">
              עושים אהבה
              <Heart
                className="size-7 fill-flame text-flame sm:size-8"
                aria-hidden="true"
              />
              עם הפחד מכסף
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-4 text-lg font-bold text-flame-dp">
              {lp.register.sub}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-3 leading-relaxed text-ink-2">{lp.register.body}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-8">
              <RegisterForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold-ink/25 bg-paper px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 text-xs text-ink-2 sm:flex-row sm:items-center sm:justify-between">
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
