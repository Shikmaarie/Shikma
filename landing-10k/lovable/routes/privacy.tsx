import { createFileRoute } from "@tanstack/react-router";

import { Privacy10k } from "../components/Legal10k";
import challengeCss from "../challenge.css?url";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "מדיניות פרטיות | אתגר ה־10,000 ₪ לשכירים · רחלי חדד" }],
    links: [{ rel: "stylesheet", href: challengeCss }],
  }),
  component: Privacy10k,
});
