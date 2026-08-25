import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Gift, Lock, Users, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Wordmark, { BrandStar } from "@/components/ui/Wordmark";
import { Eyebrow } from "@/components/ui/Section";
import { partnerships } from "@/data/partnerships";
import { site } from "@/data/site";
import ConnectionWeb from "./ConnectionWeb";
import RegistrationForm from "./RegistrationForm";
import StickyCta from "./StickyCta";

const p = partnerships;

export const metadata: Metadata = {
  title: "קשרים עסקיים ושת״פים מנצחים — הדרכה חינמית",
  description:
    "הדרך להביא לקוחות, כסף והזדמנויות דרך קשרים ושת״פים, בלי להוציא עוד שקל על פרסום. מועדון העסקים של רחלי חדד פותח את שעריו ליום אחד — הדרכה ללא עלות, בהרשמה מראש.",
  alternates: { canonical: "/partnerships" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: `${site.url}/partnerships`,
    title: "קשרים עסקיים ושת״פים מנצחים — הדרכה חינמית",
    description:
      "הכסף האמיתי נמצא בקשרים העסקיים ובשת״פים שתבנו. הדרכה פתוחה ליום אחד, ללא עלות.",
  },
};

/** Chips that state only what has been confirmed — see `event` in the data. */
function factChips() {
  const facts: string[] = [...p.badges];
  if (p.event.date) facts.unshift([p.event.date, p.event.time].filter(Boolean).join(" · "));
  if (p.event.platform) facts.push(p.event.platform);
  return facts;
}

export default function PartnershipsPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-5 pt-14 pb-20 sm:px-8 lg:pt-20 lg:pb-28">
        {/* The network sits behind the copy on desktop and above it on mobile,
            where a backdrop would fight the headline for contrast. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[58%] lg:block"
          aria-hidden="true"
        >
          <ConnectionWeb className="h-full w-full opacity-70" />
        </div>

        <div
          className="pointer-events-none absolute -top-40 right-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-teal/45 blur-[130px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-void to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label={`${site.name} — לעמוד הבית`}>
              <Wordmark size="md" className="!items-start" />
            </Link>

            <a
              href="#register"
              className="hidden rounded-full border border-gold/35 px-5 py-2.5 text-sm font-semibold text-cream transition hover:border-gold/70 hover:text-gold-lt sm:inline-block"
            >
              {p.ctaShort}
            </a>
          </div>

          <div className="mt-14 max-w-2xl lg:mt-16">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-teal/40 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-gold-lt backdrop-blur-md sm:text-xs">
                <BrandStar className="size-3 text-gold" />
                {p.eyebrow}
              </span>
            </Reveal>

            <h1 className="mt-7 font-display text-[2.25rem] leading-[1.1] font-black tracking-tight sm:text-5xl lg:text-[3.6rem]">
              {p.title.map((line, i) => (
                <Reveal
                  key={line.text}
                  as="span"
                  delay={0.08 + i * 0.07}
                  className={`block ${line.gold ? "text-gradient-gold" : "text-cream"}`}
                >
                  {line.text}
                </Reveal>
              ))}
            </h1>

            {/* The one line that carries the whole promise — set apart. */}
            <Reveal delay={0.4}>
              <p className="mt-8 border-r-2 border-gold/60 pr-5 font-display text-xl leading-relaxed font-bold text-gold-lt sm:text-2xl">
                {p.lede}
              </p>
            </Reveal>

            {/* Mobile gets the motif here, where it reads as an illustration. */}
            <Reveal delay={0.45}>
              <ConnectionWeb className="mt-10 h-64 w-full opacity-85 sm:h-80 lg:hidden" />
            </Reveal>

            <Reveal delay={0.5}>
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {factChips().map((fact) => (
                  <li
                    key={fact}
                    className="rounded-full border border-gold/20 bg-void/50 px-4 py-2 text-xs font-semibold text-cream/75 sm:text-sm"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.58}>
              <a
                href="#register"
                className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-4.5 text-base font-black text-void shadow-[0_16px_55px_-16px_rgba(212,169,95,0.95)] transition hover:brightness-110 sm:text-lg"
              >
                {p.ctaPrimary}
                <ArrowLeft
                  className="size-5 shrink-0 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The invitation                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative border-y border-gold/12 bg-gradient-to-b from-void via-night to-void px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold/80">
              <Lock className="size-3.5" aria-hidden="true" />
              {p.invitation.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-3xl leading-[1.2] font-bold text-cream sm:text-4xl lg:text-5xl">
              {p.invitation.title}
              <br />
              <span className="text-gradient-gold">{p.invitation.titleAccent}</span>
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-5">
            {p.invitation.paragraphs.map((text, i) => (
              <Reveal key={text} delay={0.16 + i * 0.06}>
                <p className="text-lg leading-relaxed text-cream/70">{text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.38}>
            <div className="mt-12 inline-flex flex-col items-center rounded-4xl border border-gold/30 bg-void/60 px-8 py-7 sm:px-12">
              <span className="text-xs font-bold tracking-[0.22em] text-gold/70">
                הנושא
              </span>
              <span className="mt-3 font-display text-2xl font-black text-gradient-gold sm:text-3xl">
                {p.invitation.banner}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Two ways to grow                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow>{p.fork.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-3xl leading-[1.15] font-bold text-cream sm:text-4xl lg:text-5xl">
                {p.fork.title}
                <br />
                <span className="text-gradient-gold">{p.fork.titleAccent}</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Reveal className="h-full">
              <ForkCard variant="hard" {...p.fork.hard} />
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <ForkCard variant="smart" {...p.fork.smart} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Curriculum                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-gold/12 bg-gradient-to-b from-void via-night to-void px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow>{p.curriculum.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-3xl leading-[1.15] font-bold text-cream sm:text-4xl lg:text-5xl">
                {p.curriculum.title}{" "}
                <span className="text-gradient-gold">{p.curriculum.titleAccent}</span>
              </h2>
            </Reveal>
          </div>

          <ol className="mt-14 grid gap-5 md:grid-cols-2">
            {p.curriculum.items.map((item, i) => (
              <li
                key={item.title}
                // The fifth card sits alone on the last row; centring it keeps
                // the grid from looking like it lost a card.
                className={
                  i === p.curriculum.items.length - 1
                    ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.625rem)]"
                    : ""
                }
              >
                <Reveal delay={0.06 * i} className="h-full">
                  <article className="group flex h-full gap-5 rounded-4xl glass p-7 transition duration-500 hover:border-gold/45 hover:shadow-[0_28px_80px_-50px_rgba(212,169,95,0.8)] sm:p-8">
                    <span
                      className="ltr-nums shrink-0 font-display text-3xl font-black text-gold/35 transition group-hover:text-gold/70"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-display text-xl font-bold text-cream">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 leading-relaxed text-cream/60">
                        {item.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.36}>
            <p className="mt-10 text-center text-sm font-semibold text-gold/75">
              {p.curriculum.more}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Who is teaching                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <span
                className="absolute -inset-4 -z-10 rounded-[2.75rem] bg-gold/10 blur-2xl"
                aria-hidden="true"
              />
              <Image
                src={p.host.portrait.src}
                alt={p.host.portrait.alt}
                width={1000}
                height={1000}
                sizes="(min-width: 1024px) 30rem, 24rem"
                className="w-full rounded-5xl border border-gold/25 object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>{p.host.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-3xl font-black text-cream sm:text-4xl lg:text-5xl">
                {p.host.name}
              </h2>
              <p className="mt-3 text-sm font-semibold tracking-[0.14em] text-gold/80">
                {p.host.role}
              </p>
            </Reveal>

            <div className="mt-7 flex flex-col gap-4">
              {p.host.body.map((text, i) => (
                <Reveal key={text} delay={0.14 + i * 0.06}>
                  <p className="leading-relaxed text-cream/70">{text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.34}>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                {p.host.stats.map((stat) => (
                  <div key={stat.label} className="border-r border-gold/20 pr-4">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="ltr-nums block font-display text-3xl font-black text-gradient-gold">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-gold/70">
                        {stat.suffix}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-cream/50">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Registration                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="register"
        className="relative scroll-mt-8 overflow-hidden border-t border-gold/12 bg-gradient-to-b from-night to-void px-5 py-24 sm:px-8 lg:py-28"
      >
        <span
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-void/60 px-4 py-2 text-xs font-bold text-gold-lt">
                <Gift className="size-4" aria-hidden="true" />
                {p.form.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-3xl leading-[1.15] font-black text-cream sm:text-4xl lg:text-5xl">
                {p.form.title}{" "}
                <span className="text-gradient-gold">{p.form.titleAccent}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mx-auto mt-5 max-w-lg leading-relaxed text-cream/65">
                {p.form.sub}
              </p>
            </Reveal>

            {p.event.date && (
              <Reveal delay={0.18}>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-void/50 px-5 py-2.5 text-sm font-semibold text-gold-lt">
                  <Users className="size-4" aria-hidden="true" />
                  {[p.event.date, p.event.time, p.event.platform]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <RegistrationForm />
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-14 text-center">
              <h3 className="font-display text-2xl leading-snug font-bold text-cream sm:text-3xl">
                {p.closing.title}
                <br />
                <span className="text-gradient-gold">{p.closing.titleAccent}</span>
              </h3>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-cream/60">
                {p.closing.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Minimal footer — the page carries no site nav on purpose, but the  */}
      {/* legal links have to remain reachable from every page.             */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-gold/12 px-5 py-10 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-right">
          <Link href="/" aria-label={`${site.name} — לעמוד הבית`}>
            <Wordmark size="sm" />
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-cream/50">
            <Link href="/legal/terms" className="transition hover:text-gold-lt">
              תקנון
            </Link>
            <Link href="/legal/privacy" className="transition hover:text-gold-lt">
              פרטיות
            </Link>
            <Link href="/legal/accessibility" className="transition hover:text-gold-lt">
              נגישות
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="ltr-nums transition hover:text-gold-lt"
            >
              {site.email}
            </a>
          </nav>
        </div>
      </footer>

      {/* Bottom padding so the sticky bar never covers the footer links. */}
      <div className="h-24 lg:hidden" aria-hidden="true" />

      <StickyCta />
    </>
  );
}

function ForkCard({
  variant,
  label,
  body,
  points,
}: {
  variant: "hard" | "smart";
  label: string;
  body: string;
  points: readonly string[];
}) {
  const smart = variant === "smart";
  const Icon = smart ? Check : X;

  return (
    <article
      className={`flex h-full flex-col rounded-4xl border p-8 sm:p-9 ${
        smart
          ? "border-gold/35 bg-gradient-to-t from-void via-teal/45 to-void shadow-[0_30px_90px_-60px_rgba(212,169,95,0.9)]"
          : "border-cream/12 bg-void/50"
      }`}
    >
      <span
        className={`text-xs font-bold tracking-[0.24em] ${
          smart ? "text-gold" : "text-cream/40"
        }`}
      >
        {label}
      </span>

      <p
        className={`mt-5 mb-7 text-lg leading-relaxed ${
          smart ? "text-cream/85" : "text-cream/55"
        }`}
      >
        {body}
      </p>

      {/* mt-auto so the two cards' lists line up even when the copy above
          them runs to a different number of lines. */}
      <ul className="mt-auto flex flex-col gap-3.5 border-t border-gold/12 pt-6">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                smart ? "bg-gold/20 text-gold" : "bg-cream/8 text-cream/35"
              }`}
            >
              <Icon className="size-3" aria-hidden="true" />
            </span>
            <span
              className={`text-sm leading-relaxed ${
                smart ? "text-cream/75" : "text-cream/45"
              }`}
            >
              {point}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
