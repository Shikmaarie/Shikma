import { Eyebrow } from "./Section";
import { ScriptLine } from "./Editorial";

/**
 * The opening band of every inner page.
 *
 * Deliberately the same deep teal as the home hero: it gives the fixed
 * header a dark ground to sit on at the top of any route, so the bar's
 * light-to-ink flip on scroll behaves identically everywhere.
 */
export default function PageHeader({
  eyebrow,
  title,
  accent,
  sub,
  script,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Rendered lighter on its own line, under the main title. */
  accent?: string;
  sub?: string;
  /** Optional handwritten aside. One short line. */
  script?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      data-surface="dark"
      className="relative overflow-hidden bg-gradient-to-bl from-teal-2 via-teal to-night px-5 pt-36 pb-16 sm:px-8 sm:pt-40 lg:pb-20"
    >
      <span
        className="pointer-events-none absolute -top-32 left-1/4 size-[32rem] rounded-full bg-mint/12 blur-3xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -bottom-40 -right-20 size-[28rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <Eyebrow>{eyebrow}</Eyebrow>

        <h1 className="mt-6 max-w-4xl font-display text-[2.2rem] leading-[1.1] font-black tracking-tight text-fg sm:text-5xl lg:text-[3.6rem]">
          {title}
          {accent && (
            <>
              <br />
              <span className="font-light text-gold-lt">{accent}</span>
            </>
          )}
        </h1>

        {script && <ScriptLine className="mt-5">{script}</ScriptLine>}

        {sub && (
          <p className="mt-6 max-w-2xl leading-relaxed text-fg2 sm:text-lg">
            {sub}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
