import type { PhotoSlot } from "@/components/ui/Editorial";

/**
 * Every photograph the site uses, in one place.
 *
 * The design is photography-led: Racheli appears in the hero, beside
 * the pull-quote, in the story chapter and in the podcast band. The
 * files come from her own shoots — see README, „תמונות”.
 *
 * Rule from CLAUDE.md: professional portraits of Racheli are fine.
 * Family photographs showing children's faces must not be published
 * without her explicit approval, so none are used here — the source
 * folder holds several and every one of them is deliberately left out.
 *
 * To swap a photograph: drop the file in `public/photos/` and change
 * `src`. Nothing else moves.
 */
export const photos = {
  hero: {
    src: "/photos/racheli-hero.webp",
    alt: "רחלי חדד",
    brief: "פורטרט ראשי — סטודיו, תאורת זהב על רקע כהה",
  },
  quote: {
    src: "/photos/racheli-stage.webp",
    alt: "רחלי חדד על הבמה מול אולם מלא",
    brief: "רחלי על הבמה מול קהל — לרוחב, פורמט קטן",
  },
  story: {
    src: "/photos/racheli-story.webp",
    alt: "רחלי חדד",
    brief: "פורטרט חתוך מרקע — לצד פרק הסיפור האישי",
  },
  podcast: {
    src: "/photos/racheli-speaking.webp",
    alt: "רחלי חדד מרצה עם מיקרופון",
    brief: "רחלי עם מיקרופון ראש, באמצע הרצאה",
  },
} satisfies Record<string, PhotoSlot>;

/** Slots still waiting for a file. Empty is the goal. */
export const missingPhotos = Object.entries(photos)
  .filter(([, slot]) => slot.src === null)
  .map(([key]) => key);
