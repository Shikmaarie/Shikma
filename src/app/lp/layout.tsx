/**
 * Landing pages are set in Rubik. Rubik One is asked for on the big headlines,
 * but Google ships it with Latin and Cyrillic only — there is no Hebrew cut —
 * so it sits ahead of Rubik in the display stack and Hebrew falls through to
 * Rubik's heaviest weight. It is linked here rather than in the root layout so
 * only the landing pages pay for it.
 */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Rubik+One&display=swap"
        precedence="default"
      />
      {children}
    </>
  );
}
