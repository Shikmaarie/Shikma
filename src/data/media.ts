import type { PhotoSlot } from "@/components/ui/Editorial";

/**
 * Every photograph the site uses, in one place.
 *
 * Two of them are cut out of their ground. `hero` was supplied that way;
 * `story` was cut here from a white studio frame, which is why it sits on
 * a pale band and not on the teal — its hair edge is clean against paper
 * and shows a faint wisp against deep colour.
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
    src: "/photos/racheli-office.webp",
    alt: "רחלי חדד",
    brief: "פורטרט במשרד, ממוסגר — פס הפתיחה",
  },
  /** Same shoot as the opening band — the same blazer and the same hand on
   *  the chin — so the two must not share a page. Held for another one. */
  portraitCut: {
    src: "/photos/racheli-portrait.webp",
    alt: "רחלי חדד",
    brief: "פורטרט חתוך מרקע, ז'קט תכלת",
  },
  quote: {
    src: "/photos/racheli-stage.webp",
    alt: "רחלי חדד על הבמה מול אולם מלא",
    brief: "רחלי על הבמה מול קהל — לרוחב, פורמט קטן",
  },
  story: {
    src: "/photos/racheli-story.webp",
    alt: "רחלי חדד",
    brief: "פורטרט חתוך מרקע, ז'קט קורל — לצד פרק הסיפור האישי",
  },
  /** The dark studio frame. Held for a band that wants a framed photograph
   *  rather than a figure standing on the ground. */
  studio: {
    src: "/photos/racheli-hero.webp",
    alt: "רחלי חדד",
    brief: "פורטרט סטודיו, תאורת זהב על רקע כהה",
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
