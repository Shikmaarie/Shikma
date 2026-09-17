import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { isLiveSite } from "@/lib/site-url";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/store/CartDrawer";

/**
 * The whole site is set in Rubik.
 *
 * Loaded as the variable font rather than seven static cuts: the `wght`
 * axis runs 300–900 continuously, so every weight the design uses — and
 * every value in between — comes out of one file instead of seven.
 */
const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description:
    "להפסיק לרדוף אחרי הכסף — ולבנות אימפריה שמנוהלת מבפנים החוצה. תוכניות ליווי עסקי, מסלולי שפע ומיינדסט, מועדון עסקים, ספרים ומדריכים.",
  keywords: [
    "רחלי חדד",
    "ליווי עסקי",
    "חופש כלכלי",
    "DNA של העסק",
    "DNA של העושר",
    "מועדון עסקים",
    "פלטינום ביזנס",
  ],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description:
      "18 שנות ניסיון, 3 עסקים בשש ספרות בחודש, וחיים של חופש אמיתי. הגיע הזמן ללמוד את חוקי ה-DNA של העסק והעושר שלך.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: "מעבר מהישרדות לשפע אמיתי.",
  },
  // robots.txt alone is advisory and does not get an already-crawled
  // preview dropped, so the meta tag carries the same rule.
  robots: isLiveSite
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#0f4a50",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body data-surface="light" className="min-h-screen bg-ivory antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal focus:px-5 focus:py-2 focus:font-bold focus:text-ivory"
        >
          דילוג לתוכן הראשי
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
