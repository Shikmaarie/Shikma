import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import SkipLink from "@/components/ui/SkipLink";

/**
 * The main site: everything that carries the header, footer and cart.
 *
 * The route group leaves URLs untouched — `(site)/about` is still `/about`.
 * Pages that need to stand on their own (the US seminar landing page) live
 * outside this group and therefore render without any of this chrome.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
