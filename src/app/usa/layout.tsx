import SkipLink from "@/components/ui/SkipLink";

/**
 * Standalone landing page shell. It sits outside the `(site)` route group on
 * purpose, so it inherits no header, footer or cart — a landing page keeps the
 * reader on one path.
 */
export default function UsaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <main id="main">{children}</main>
    </>
  );
}
