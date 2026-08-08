import { Eyebrow } from "./Section";

export default function PageHeader({
  eyebrow,
  title,
  accent,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Rendered in gold on its own line, under the main title. */
  accent?: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-5 pt-40 pb-14 sm:px-8">
      <span
        className="absolute left-1/2 top-0 h-72 w-[52rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <Eyebrow>{eyebrow}</Eyebrow>

        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.1] font-black text-cream sm:text-5xl lg:text-6xl">
          {title}
          {accent && (
            <>
              <br />
              <span className="text-gradient-gold">{accent}</span>
            </>
          )}
        </h1>

        {sub && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/65">
            {sub}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
