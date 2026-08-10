import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import EventHero from "@/components/event/EventHero";
import TiltedQuotes from "@/components/event/TiltedQuotes";
import { Band, BandEyebrow, BandTitle, PillLink } from "@/components/ui/Band";
import Reveal from "@/components/ui/Reveal";
import { BrandStar } from "@/components/ui/Wordmark";
import { eventPage, site, testimonials } from "@/data/site";

export const metadata: Metadata = {
  title: "לצאת לעצמאות — כנס אונליין",
  description:
    "כנס אונליין עם רחלי חדד לשכירות שרוצות להקים עסק משלהן: איך למצוא רעיון מנצח, לבנות תוכנית עסקית ולצאת לדרך בביטחון. מספר המקומות מוגבל.",
};

/**
 * Registration runs through WhatsApp for now — the site has no lead-capture
 * endpoint, and a form that posts nowhere would be worse than a channel that
 * actually reaches Racheli. Swap this for the form action once one exists.
 */
const registerHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "היי רחלי, אני רוצה להירשם לכנס האונליין „לצאת לעצמאות”",
)}`;

export default function IndependenceEventPage() {
  const { reflect, mission, fear, risk, learn, story, finalCta } = eventPage;

  return (
    <>
      <EventHero registerHref={registerHref} />

      {/* ---- The mirror: where will you be if nothing changes ---- */}
      <Band tone="cream">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <BandEyebrow>{reflect.eyebrow}</BandEyebrow>
          </Reveal>

          <div className="mt-10 flex flex-col gap-9">
            {reflect.questions.map((item, i) => (
              <Reveal key={item.q} delay={0.06 * i}>
                <div className="rounded-4xl border border-[var(--band-rule)] bg-[var(--band-panel)] px-7 py-9 sm:px-10">
                  <p className="font-display text-2xl leading-snug font-bold text-[var(--band-ink)] sm:text-3xl">
                    {item.q}
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-[var(--band-quiet)]">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <p className="mt-12 font-display text-3xl leading-tight font-black text-teal sm:text-4xl">
              {reflect.punch}
            </p>
          </Reveal>
        </div>
      </Band>

      {/* ---- Why Racheli is running this ---- */}
      <Band tone="sand">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <BandEyebrow>{mission.eyebrow}</BandEyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <BandTitle className="mt-7">{mission.title}</BandTitle>
            </Reveal>
          </div>

          <div className="lg:pt-16">
            <Reveal delay={0.12}>
              <p className="text-lg leading-relaxed text-[var(--band-body)]">
                {mission.body}
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-3.5">
              {mission.wants.map((want, i) => (
                <li key={want}>
                  <Reveal delay={0.16 + i * 0.06}>
                    <span className="flex items-center gap-3 rounded-full border border-[var(--band-rule)] bg-cream px-6 py-3.5">
                      <Check
                        className="size-5 shrink-0 text-teal"
                        aria-hidden="true"
                      />
                      <span className="font-display text-xl font-bold text-[var(--band-ink)]">
                        {want}
                      </span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.36}>
              <p className="mt-8 font-display text-xl leading-relaxed font-bold text-teal">
                {mission.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- The fear, then the reframe ---- */}
      <Band tone="teal">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Reveal>
              <BandEyebrow center>{fear.eyebrow}</BandEyebrow>
            </Reveal>

            <ul className="mt-9 flex flex-wrap justify-center gap-3">
              {fear.doubts.map((doubt, i) => (
                <li key={doubt}>
                  <Reveal delay={0.06 * i}>
                    <span className="block rounded-full border border-cream/20 bg-void/30 px-6 py-3 text-base text-cream/70 sm:text-lg">
                      {doubt}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.24}>
              <p className="mt-14 font-display text-3xl leading-tight font-black text-gradient-gold sm:text-4xl">
                {fear.turn}
              </p>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {fear.reframes.map((line, i) => (
              <li key={line} className="h-full">
                <Reveal delay={0.3 + i * 0.07} className="h-full">
                  <span className="flex h-full items-start gap-3.5 rounded-4xl border border-gold/25 bg-void/25 p-7">
                    <BrandStar className="mt-1 size-4 shrink-0 text-gold" />
                    <span className="text-lg leading-relaxed text-cream/85">
                      {line}
                    </span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ---- The only real risk ---- */}
      <Band tone="cream">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <BandTitle>{risk.title}</BandTitle>
          </Reveal>

          <div className="mt-9 flex flex-col gap-5">
            {risk.paragraphs.map((p, i) => (
              <Reveal key={p} delay={0.06 * (i + 1)}>
                <p className="text-lg leading-relaxed text-[var(--band-body)]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.28}>
            <p className="mt-11 rounded-4xl border border-[var(--band-rule)] bg-[var(--band-panel)] px-8 py-9 text-lg leading-relaxed font-semibold text-[var(--band-ink)]">
              {risk.close}
            </p>
          </Reveal>
        </div>
      </Band>

      {/* ---- What you'll learn ---- */}
      <Band tone="sand">
        <div className="text-center">
          <Reveal>
            <BandEyebrow center>{learn.eyebrow}</BandEyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <BandTitle className="mt-7">{learn.title}</BandTitle>
          </Reveal>
        </div>

        <ol className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {learn.items.map((item, i) => (
            <li key={item} className="h-full">
              <Reveal delay={0.08 * i} className="h-full">
                <div className="flex h-full flex-col rounded-4xl border border-[var(--band-rule)] bg-cream p-8">
                  <span
                    className="ltr-nums font-display text-4xl font-black text-gold-dp/40"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-lg leading-relaxed font-semibold text-[var(--band-ink)]">
                    {item}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col items-center gap-3">
            <PillLink href={registerHref} external>
              <Sparkles className="size-5" aria-hidden="true" />
              {eventPage.hero.cta}
            </PillLink>
            <span className="text-sm font-bold text-teal">
              {eventPage.hero.ctaNote}
            </span>
          </div>
        </Reveal>
      </Band>

      {/* ---- Racheli's own story ---- */}
      <Band tone="cream">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <BandEyebrow>{story.eyebrow}</BandEyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <BandTitle className="mt-7">{story.title}</BandTitle>
          </Reveal>

          <div className="mt-9 flex flex-col gap-5 border-r-2 border-gold-dp/35 pr-7">
            {story.paragraphs.map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.06}>
                <p className="text-lg leading-relaxed text-[var(--band-body)]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.34}>
            <Link
              href={story.cta.href}
              className="group mt-9 inline-flex items-center gap-2 font-bold text-teal transition hover:text-gold-dp"
            >
              {story.cta.label}
              <ArrowLeft
                className="size-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </Band>

      {/* ---- What participants say ---- */}
      <Band tone="dark">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <BandEyebrow center>{eventPage.testimonials.eyebrow}</BandEyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <BandTitle className="mt-7">
              {eventPage.testimonials.title}
            </BandTitle>
          </Reveal>
        </div>

        <div className="mt-16">
          <TiltedQuotes items={testimonials} />
        </div>
      </Band>

      {/* ---- Final call ---- */}
      <Band tone="teal">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <BandEyebrow center>{finalCta.eyebrow}</BandEyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <BandTitle className="mt-7">{finalCta.title}</BandTitle>
          </Reveal>

          <div className="mt-9 flex flex-col gap-5">
            {finalCta.paragraphs.map((p, i) => (
              <Reveal key={p} delay={0.12 + i * 0.06}>
                <p className="text-lg leading-relaxed text-cream/80">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col items-center gap-3">
              <PillLink href={registerHref} external className="text-lg">
                {finalCta.cta}
                <ArrowLeft className="size-5" aria-hidden="true" />
              </PillLink>
              <span className="text-sm font-bold text-gold-lt">
                {finalCta.note}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-10 text-sm text-cream/75">
              מעדיפה לכתוב במייל?{" "}
              <a
                href={`mailto:${site.email}`}
                className="ltr-nums font-semibold text-gold-lt underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
