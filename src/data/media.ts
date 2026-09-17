import type { PhotoSlot } from "@/components/ui/Editorial";

/**
 * Every photograph the site expects, in one place.
 *
 * The design is photography-led: Racheli appears in the hero, in the
 * story chapter and beside the pull-quote. Until the real files are
 * dropped into `public/photos/`, each slot renders a branded stand-in
 * that names the shot it is waiting for — see README, „תמונות”.
 *
 * To connect a photograph: save it under `public/photos/` and set `src`
 * to its path. Nothing else changes.
 *
 * Rule from CLAUDE.md: professional portraits of Racheli are fine.
 * Family photographs showing children's faces must not be published
 * without her explicit approval, so no slot here asks for one.
 */
export const photos = {
  hero: {
    src: null,
    alt: "רחלי חדד",
    brief: "פורטרט ראשי — רחלי בפול־בודי או שלושת רבעי, רקע נקי, מבט למצלמה",
  },
  quote: {
    src: null,
    alt: "רחלי חדד מרצה מול קהל",
    brief: "רחלי על הבמה מול קהל — לרוחב, פורמט קטן",
  },
  story: {
    src: null,
    alt: "רחלי חדד",
    brief: "פורטרט יושבת, אווירה חמה — לצד פרק הסיפור האישי",
  },
  podcast: {
    src: null,
    alt: "רחלי חדד מקליטה את הפודקאסט",
    brief: "רחלי עם מיקרופון בהקלטת הפודקאסט",
  },
} satisfies Record<string, PhotoSlot>;

/** Slots still waiting for a file — surfaced by `npm run check:media`. */
export const missingPhotos = Object.entries(photos)
  .filter(([, slot]) => slot.src === null)
  .map(([key]) => key);
