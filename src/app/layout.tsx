import type { Metadata, Viewport } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/store/CartDrawer";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-frank",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "רחלי חדד מלווה נשים לעסק שמוכר בלי למכור, הכנסה יציבה וחופש כלכלי אמיתי. תוכניות ליווי, מועדון מאסטריות וקורסים דיגיטליים.",
  keywords: [
    "רחלי חדד",
    "מנטורית עסקית",
    "ליווי עסקי לנשים",
    "חופש כלכלי",
    "DNA של עסק",
    "מועדון מאסטריות",
  ],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description:
      "מעובדת לחופש כלכלי. עסק שמוכר בלי למכור, הכנסה יציבה, וחיים שחוזרים אלייך.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: "מעובדת לחופש כלכלי.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06040a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frank.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:font-bold focus:text-void"
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
