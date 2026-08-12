import type { Metadata, Viewport } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06040a",
  width: "device-width",
  initialScale: 1,
};

/**
 * Document shell only. The site chrome — header, footer, cart — lives in
 * `(site)/layout.tsx`, so standalone landing pages such as `/usa` can opt out
 * of it simply by sitting outside that route group.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frank.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
