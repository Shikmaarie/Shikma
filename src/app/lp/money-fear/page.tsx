import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import LandingHeader from "@/components/lp/LandingHeader";
import RegisterForm from "@/components/lp/RegisterForm";
import Reveal from "@/components/ui/Reveal";
import { BrandStar } from "@/components/ui/Wordmark";
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

export default function MoneyFearLandingPage() {
  return (
    <>
      <LandingHeader />

      <Hero />
      <Story />
      <Why />
      <Agenda />
      <Proof />
      <Register />
      <LandingFooter />
    </>
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
      className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-4 text-base font-bold text-void shadow-[0_10px_45px_-12px_rgba(212,169,95,0.85)] transition hover:brightness-110 ${className}`}
    >
      {children}
      <ArrowLeft
        className="size-5 transition-transform group-hover:-translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-20 sm:px-8 lg:pt-40 lg:pb-28">
      <span
        className="pointer-events-none absolute right-[-10rem] top-[-8rem] size-[34rem] rounded-full bg-teal/40 blur-3xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-[-12rem] top-40 size-[30rem] rounded-full bg-coral/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-teal/40 px-4 py-2 text-xs font-medium tracking-[0.16em] text-gold-lt backdrop-blur-md">
              <BrandStar className="size-3 text-gold" aria-hidden="true" />
              {lp.hero.badge}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 font-display text-2xl leading-tight font-bold text-cream/80 sm:text-3xl">
              {lp.hero.kicker}{" "}
              <span className="text-coral">{lp.hero.kickerAccent}</span>
            </p>
          </Reveal>

          <h1 className="mt-3 font-display text-[2.6rem] leading-[1.08] font-black tracking-tight sm:text-6xl lg:text-[4.2rem]">
            {lp.hero.title.map((line, i) => (
              <Reveal key={line.text} delay={0.12 + i * 0.08}>
                <span className="block">
                  <span className={line.gold ? "text-gradient-gold" : "text-cream"}>
                    {line.text}
                  </span>
                </span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl border-r-2 border-coral/60 pr-5 text-lg leading-relaxed font-semibold text-cream/85 sm:text-xl">
              {lp.hero.lead}
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/60 sm:text-lg">
              {lp.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.46}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Cta>{lp.cta.label}</Cta>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-cream/55">
                {lp.hero.facts.map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <BrandStar className="size-2.5 text-gold/70" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <span
              className="absolute inset-x-6 bottom-0 top-10 rounded-[2.5rem] border border-gold/25"
              aria-hidden="true"
            />
            <Image
              src={lp.hero.portrait.src}
              alt={lp.hero.portrait.alt}
              width={442}
              height={1158}
              priority
              sizes="(max-width: 1024px) 80vw, 34vw"
              className="relative mx-auto w-full rounded-[2.5rem] object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative border-y border-gold/10 bg-night px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <Eyebrow>{lp.story.eyebrow}</Eyebrow>
        </Reveal>

        <ul className="mt-8 flex flex-col gap-3">
          {lp.story.denials.map((line, i) => (
            <Reveal key={line} delay={0.06 * i}>
              <li className="font-display text-2xl font-bold text-cream sm:text-4xl">
                {line}
              </li>
            </Reveal>
          ))}
        </ul>

        {lp.story.paragraphs.map((p, i) => (
          <Reveal key={p} delay={0.24 + i * 0.06}>
            <p className="mt-7 text-lg leading-relaxed text-cream/70">{p}</p>
          </Reveal>
        ))}

        <Reveal delay={0.4}>
          <div className="mt-12 rounded-4xl border border-gold/20 bg-void/50 p-8 sm:p-10">
            <p className="font-display text-2xl leading-snug font-bold text-gradient-gold sm:text-3xl">
              {lp.story.question}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-cream/75">
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
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <span
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-coral/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <Eyebrow center>{lp.why.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <blockquote className="mt-8 font-display text-3xl leading-[1.25] font-black text-cream sm:text-5xl">
            {lp.why.quote}
          </blockquote>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-12 text-lg text-cream/55">{lp.why.intro}</p>
        </Reveal>

        <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-3">
          {lp.why.notList.map((item, i) => (
            <Reveal key={item} delay={0.22 + i * 0.06}>
              <li className="rounded-full border border-cream/15 bg-void/40 px-5 py-2.5 text-base text-cream/60 line-through decoration-coral/70 decoration-2">
                {item}
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.5}>
          <p className="mt-10 font-display text-3xl font-black text-gradient-gold sm:text-4xl">
            {lp.why.turn}
          </p>
        </Reveal>

        <Reveal delay={0.58}>
          <p className="mt-6 text-lg text-cream/70">{lp.why.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Agenda() {
  return (
    <section className="relative border-y border-gold/10 bg-night px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <Eyebrow>{lp.agenda.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-3xl font-display text-3xl leading-tight font-black text-cream sm:text-5xl">
            <span className="text-coral" aria-hidden="true">
              „
            </span>
            {lp.agenda.quote}
            <span className="text-coral" aria-hidden="true">
              ”
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
            {lp.agenda.lead}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {lp.agenda.items.map((item, i) => (
            <Reveal key={item.n} delay={0.1 + i * 0.08} className="h-full">
              <li className="flex h-full flex-col rounded-4xl glass p-8">
                <span
                  className="font-display text-4xl font-black text-gold/30"
                  aria-hidden="true"
                >
                  {item.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-cream sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-cream/60">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.4}>
          <p className="mt-12 max-w-3xl text-lg leading-relaxed text-cream/70">
            {lp.agenda.outro}
          </p>
        </Reveal>

        <Reveal delay={0.46}>
          <div className="mt-10 flex flex-col gap-8 rounded-4xl border border-gold/20 bg-void/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <p className="max-w-xl font-display text-xl leading-snug font-bold text-cream sm:text-2xl">
              {lp.agenda.promise}
            </p>
            <Cta className="shrink-0">{lp.cta.short}</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <Reveal>
            <Eyebrow center>{lp.proof.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-3xl font-black text-cream sm:text-5xl">
              {lp.proof.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {lp.proof.shots.map((shot, i) => (
            <Reveal key={shot.src} delay={0.1 + i * 0.08} className="w-full max-w-md">
              <figure className="overflow-hidden rounded-4xl border border-gold/20 bg-void/60 p-3">
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
          <p className="mt-8 text-center text-xs text-cream/40">{lp.proof.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section
      id="register"
      className="scroll-mt-24 border-t border-gold/15 bg-gradient-to-b from-night via-teal/25 to-void px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Image
            src={lp.poster.src}
            alt={lp.poster.alt}
            width={1086}
            height={1448}
            sizes="(max-width: 1024px) 85vw, 38vw"
            className="mx-auto w-full max-w-sm rounded-4xl border border-gold/20 lg:max-w-none"
          />
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{lp.register.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 flex flex-wrap items-center gap-x-3 font-display text-3xl leading-tight font-black text-cream sm:text-4xl">
              עושים אהבה
              <Heart
                className="size-7 fill-coral text-coral sm:size-8"
                aria-hidden="true"
              />
              עם הפחד מכסף
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-4 text-lg font-semibold text-gold-lt">
              {lp.register.sub}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-3 leading-relaxed text-cream/65">
              {lp.register.body}
            </p>
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
    <footer className="border-t border-gold/10 bg-void px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <p className="ltr-nums">
          © {year} {site.name} · כל הזכויות שמורות | עיצוב ובנייה: {site.credit}
        </p>
        <div className="flex flex-wrap gap-6">
          <Link href="/" className="transition hover:text-gold-lt">
            לאתר הראשי
          </Link>
          <Link href="/legal/terms" className="transition hover:text-gold-lt">
            תקנון ותנאי שימוש
          </Link>
          <Link href="/legal/privacy" className="transition hover:text-gold-lt">
            מדיניות פרטיות
          </Link>
        </div>
      </div>
    </footer>
  );
}

function Eyebrow({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold/80 ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-8 bg-gradient-to-l from-gold to-transparent" />
      {children}
    </span>
  );
}
