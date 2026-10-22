import { createFileRoute } from "@tanstack/react-router";

import { Accessibility10k } from "../components/Legal10k";
import challengeCss from "../challenge.css?url";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [{ title: "הצהרת נגישות | אתגר ה־10,000 ₪ לשכירים · רחלי חדד" }],
    links: [{ rel: "stylesheet", href: challengeCss }],
  }),
  component: Accessibility10k,
});
