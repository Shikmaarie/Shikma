/**
 * Keyboard escape hatch to the main content. Every layout that renders a
 * `<main id="main">` should render this above it.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:font-bold focus:text-void"
    >
      דילוג לתוכן הראשי
    </a>
  );
}
