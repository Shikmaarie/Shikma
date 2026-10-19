import { createFileRoute } from "@tanstack/react-router";
import MoneyTimePage, {
  MONEY_TIME_DESCRIPTION,
  MONEY_TIME_TITLE,
} from "@/components/money-time/MoneyTimePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: MONEY_TIME_TITLE },
      { name: "description", content: MONEY_TIME_DESCRIPTION },
      { property: "og:title", content: MONEY_TIME_TITLE },
      { property: "og:description", content: MONEY_TIME_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/brand/money-time-hero.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: MoneyTimePage,
});
