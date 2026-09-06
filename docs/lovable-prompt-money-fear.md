# פרומט ל-Lovable — דף נחיתה „עושים אהבה עם הפחד מכסף”

הפרומט כתוב באנגלית כי זו השפה שבה הסוכן של Lovable מדייק הכי טוב,
והקופי בעברית מצוטט בתוכו מילה במילה. להעתיק הכל, מ-`---` ועד `---`.

לפני ההדבקה: להעלות ל-Lovable שתי תמונות —
`racheli-portrait.jpg` (הפורטרט החתוך) ו-`money-fear-poster.jpg` (הקריאייטיב המלא).

---

Build a single-page Hebrew landing page for a free two-day online summit.
One route (`/`), no navigation menu, one conversion goal: registration.

## Language and direction

- `<html lang="he" dir="rtl">`. The whole page is RTL Hebrew.
- Fonts: Heebo (300/400/500/700/900) from Google Fonts as the only family.
  Headlines are Heebo 900. Load with `display=swap` and a real fallback stack.
- Never reverse or reorder Hebrew text manually. The browser handles bidi.
  Numbers like `2,000,000 ₪` stay inside normal RTL paragraphs.

## Design tokens

Put these in `index.css` as HSL CSS variables and use them everywhere.
No hardcoded colors in components.

```css
--paper:      42 45% 94%;   /* #f7f3ea  cream ground */
--paper-2:   103 23% 94%;   /* #eef3ec  mint tinted cream */
--mist:      144 23% 87%;   /* #d7e6dd  highlight blocks, quiet cards */
--mint-wash: 144 27% 78%;   /* #b9d7c5  the watercolour in the corners */
--ink:       192 92% 15%;   /* #033d4b  headlines, buttons, brand teal */
--ink-2:     196 25% 32%;   /* #3d5b66  body copy */
--flame:      11 84% 62%;   /* #ef6a4d  accent, large text only */
--flame-dp:   11 65% 49%;   /* #cf4a2c  accent at body sizes, hover */
--gold:       35 52% 49%;   /* #c08a3c  hairlines, dots, numerals */
```

Rules for the palette:
- Ground is always cream. There is no dark section anywhere on the page.
- Deep teal (`--ink`) is used for type and for the pill buttons, never as a
  section background.
- Coral (`--flame`) only on text above 24px, on underlines and on icons.
  For small text use `--flame-dp`.
- No pure white. Cards sit at `hsl(var(--paper) / 0.85)`.

## The background wash

The page ground is a cream sheet with watercolour mint bleeding in from the
corners. Two utility classes, applied per section and alternating so two
neighbouring sections never repeat the same corner:

```css
.paper-wash {
  background-color: hsl(var(--paper));
  background-image:
    radial-gradient(116% 78% at 0% 0%,
      hsl(var(--mint-wash) / 0.78) 0%,
      hsl(var(--mint-wash) / 0.24) 42%,
      transparent 68%),
    radial-gradient(70% 52% at 100% 108%,
      hsl(var(--mint-wash) / 0.45) 0%, transparent 62%);
}
.paper-wash-alt {
  background-color: hsl(var(--paper));
  background-image:
    radial-gradient(104% 72% at 100% 0%,
      hsl(var(--mint-wash) / 0.62) 0%,
      hsl(var(--mint-wash) / 0.20) 44%,
      transparent 70%),
    radial-gradient(74% 56% at 0% 104%,
      hsl(var(--mint-wash) / 0.52) 0%, transparent 64%);
}
```

Apply the wash to each section, not once to the page body. Stretched over the
full scroll height the gradient flattens out and disappears.

## Line-art ornaments (inline SVG, no icon library)

1. `GoldRule` — a horizontal hairline in `--gold` at 55% opacity with a filled
   gold dot at each end and one in the middle. Used as a section divider.
2. `ArcScatter` — three concentric circles in `--gold` (1.1px stroke, 50%
   opacity, the innermost dashed `3 9`) plus five small filled dots scattered
   outside them. Placed bleeding off the corners of the hero, the "why"
   section and the registration section.
3. `Marker` — a `--mist` rounded rectangle behind a run of text
   (`box-decoration-break: clone` so it survives a line break).

Icons elsewhere: `lucide-react` only (`ArrowLeft`, `Heart`, `Check`,
`AlertCircle`, `Loader2`).

## Page structure

### Sticky header
Transparent at rest; on scroll past 24px it gets `hsl(var(--paper) / 0.9)`,
`backdrop-blur-xl` and a `--gold` bottom hairline.
Right side (RTL start): a deep teal circle with a small four-point star, then
`רחלי חדד` in Heebo 900 and under it, from `md` up, `מכפילה עסקים · בונה אימפריות`.
Left side: the text `4-5 באוקטובר · יומיים | כנס אונליין חינמי` (hidden below `md`)
and a deep teal pill button `להרשמה חינם` that scrolls to `#register`.

### 1. Hero — `.paper-wash`, two columns from `lg` up
Text column first in the DOM (right side in RTL), portrait column second.

- Deep teal pill: `כנס אונליין חינמי · 4-5 באוקטובר`
- Kicker, Heebo 700, ~30px: `הפסיכולוגיה הסמויה` in `--ink` plus
  `של הכסף` in `--flame`
- H1, Heebo 900, clamp 42px to 64px, line-height 1.06, two lines:
  line 1 `מ־2,000,000 ₪ חוב` in `--ink`
  line 2 `לחופש כלכלי` in `--flame`
- `GoldRule`
- Lead paragraph, Heebo 600, ~20px, `--ink`, exactly this composition:
  `מה באמת מנהל` inside a `Marker`, then the plain text
  ` את כמות הכסף שאתם מרוויחים `, then
  `בלי שאתם בכלל מודעים לזה?` underlined with a 3px `--flame` underline,
  6px offset.
- Sub, `--ink-2`, ~18px:
  `תנו לי יומיים ואגלה לכם את החוקים הסמויים שמנהלים את מערכת היחסים שלכם עם כסף.`
- Deep teal pill CTA `לשמור לי מקום, חינם` with an `ArrowLeft` that slides on
  hover, linking to `#register`.
- Next to it, a row of four facts separated by small gold dots:
  `4-5 באוקטובר` · `יומיים` · `אונליין` · `ללא עלות`
- Portrait column: `racheli-portrait.jpg` in a `3/4` box,
  `object-cover object-top`, `rounded-[2.5rem]`, soft teal shadow. The image is
  a content element: it keeps its aspect ratio and is never stretched.
- `ArcScatter` bleeding off the top-left corner of the section.

### 2. Story — `.paper-wash-alt`, single column, max-width 48rem
Eyebrow in `--gold`, letter-spaced: `מאיפה אני מגיעה`
Three lines, Heebo 900, ~36px, stacked:
```
לא נולדתי למשפחה עשירה.
לא קיבלתי ירושה.
ולא זכיתי בלוטו.
```
`GoldRule`, then two paragraphs in `--ink-2`, 18px, generous leading:
```
גדלתי עם הרבה מאוד פחד סביב כסף, ובשלב מסוים אפילו מצאתי את עצמי עם 2,000,000 ₪ חוב.
```
```
אני הייתי במקום שאתם נמצאים בו. עשיתי את הטעויות, שילמתי עליהן מחיר כבד, ואז הבנתי את המשחק. עכשיו אני רוצה לקצר לכם את הדרך.
```
Then a card, `--mist` at 55%, gold hairline border, `rounded-[2rem]`:
question in `--flame` Heebo 900 ~28px:
`אז איך עברתי משם לחופש כלכלי, השקעות ומיליונים?`
answer under it in `--ink`, 18px:
`את הסיפור המלא אני הולכת לפתוח בכנס האונליין החינמי.`

### 3. Why it matters — `.paper-wash`, centred, max-width 56rem
Eyebrow: `למה זה חשוב לי`
Pull quote, Heebo 900, clamp 30px to 48px, `--ink`:
`הדבר הכי גדול שכסף נתן לי הוא לא כסף. הוא נתן לי אפשרות להראות לילדים שלי עולם אחר.`
`GoldRule` centred. Then `עולם שבו כסף הוא` in `--ink-2`.
Four pills, wrapped and centred, cream at 80%, thin `--ink` border, each with a
2px `--flame` strike-through:
`לא פחד.` · `לא חובות.` · `לא מריבות.` · `ולא משהו שצריך לברוח ממנו.`
Then, Heebo 900 ~34px in `--flame`: `אלא כלי ליצירת חופש.`
Then in `--ink-2`: `וזה בדיוק מה שאני רוצה להעביר לכם.`
`ArcScatter` bleeding off the bottom-left corner.

### 4. What happens at the summit — `.paper-wash-alt`, max-width 64rem
Eyebrow: `מה יהיה בכנס`
H2 in quotes, Heebo 900, clamp 30px to 48px, the quotation marks in `--flame`:
`„אני לא הולכת ללמד אתכם איך להתעשר”`
Sub in `--ink-2`:
`אני הולכת לספר לכם איך אנחנו עברנו מ־2,000,000 ₪ חוב לחופש כלכלי.`
Then four cards, 2 columns from `sm` up, cream at 85%, gold hairline,
`rounded-[2rem]`, soft shadow. Each has a large `--gold` numeral at 45%
opacity, a Heebo 900 title, and a line of body copy. The numbering is real
sequence, keep the order:
```
01  מה השתנה בדרך            נקודות המפנה האמיתיות, לא הסיפור המצונזר.
02  מה הפסקנו לעשות          ההרגלים וההחלטות שעלו לנו הכי הרבה כסף.
03  מה התחלנו לעשות          המהלכים שהזיזו את המחט, בסדר שבו עשינו אותם.
04  אילו אמונות היינו צריכים לשבור   האמונות על כסף שהחזיקו אותנו בחוב.
```
Under the grid, in `--ink-2`:
`מה למדתי בדרך על כסף, פחד, עושר והחלטות שאף אחד לא לימד אותי בבית.`
Then a `--mist` band at 55% with a gold hairline: on one side, Heebo 700 ~24px
in `--ink`:
`תנו לי יומיים ואקח אתכם למסע ששינה את מערכת היחסים שלי עם כסף. ואולי ישנה גם את שלכם.`
and on the other, the deep teal pill `להרשמה חינם` linking to `#register`.

### 5. Social proof — `.paper-wash`, centred
Eyebrow `ממשתתפות בכנס`, H2 `מה כותבים אחרי`, `GoldRule`.
Then a single screenshot in a cream card with a gold hairline and 12px padding,
max-width 28rem, centred. Under it, 12px `--ink-2` at 70%:
`צילום מסך מהודעה שהתקבלה אחרי הכנס. פרטי השולחת אינם מופיעים בתמונה.`
Do not invent additional testimonials. If more screenshots are supplied later,
they lay out in the same row, still centred.

### 6. Registration — `.paper-wash-alt`, id `register`, two columns from `lg`
Left column: `money-fear-poster.jpg`, max-width 24rem, `rounded-[2rem]`, gold
ring, soft shadow, aspect ratio preserved.
Right column:
- Eyebrow `הרשמה`
- H2 Heebo 900 ~36px: `עושים אהבה`, a filled coral `Heart` icon, `עם הפחד מכסף`
- In `--flame-dp` Heebo 700: `4-5 באוקטובר | יומיים | כנס אונליין חינמי`
- In `--ink-2`: `משאירים פרטים ואני שולחת לכם את קישור הכניסה ואת השעות המדויקות.`
- The signup form, in a cream card at 90% with a gold hairline,
  `rounded-[2rem]`, padding 28px to 36px.

### Footer
Cream, gold hairline on top, 12px `--ink-2`:
`© 2026 רחלי חדד · כל הזכויות שמורות | עיצוב ובנייה: שקמה אושרי אריה`
and links: `תקנון ותנאי שימוש`, `מדיניות פרטיות`.

## The signup form

Do not build your own form fields. The form is an external RavPage embed:

```html
<script type='text/javascript' src='//form2.ravpage.co.il/b78f889d4baad9d8bc0c76623a3a35ad6A9DC44D?__loveable__=true' charset='UTF-8'></script>
```

A `<script>` tag written in JSX never executes, so mount it from an effect into
its own container:

```tsx
function RavPageForm() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || el.dataset.loaded) return;
    el.dataset.loaded = "true";

    const s = document.createElement("script");
    s.src = "//form2.ravpage.co.il/b78f889d4baad9d8bc0c76623a3a35ad6A9DC44D?__loveable__=true";
    s.type = "text/javascript";
    s.charset = "UTF-8";
    s.async = true;
    el.appendChild(s);
  }, []);

  return <div ref={host} className="min-h-[320px]" />;
}
```

Notes:
- The guard matters: React 18 StrictMode runs effects twice in development and
  without it the form is injected twice.
- Reserve a minimum height on the container so the page does not jump when the
  form loads.
- The embed brings its own styling. Do not restyle its internals, only the card
  around it.

## Behaviour

- Every CTA on the page (header, hero, mid-page band) links to `#register`,
  with `scroll-margin-top` on the section so the sticky header does not cover
  the heading. Use CSS `scroll-behavior: smooth`.
- Sections fade and rise in on scroll, 0.7s, once, small stagger. Everything
  must be readable in its resting state before any animation runs, and all of
  it is disabled under `prefers-reduced-motion`.
- Fully responsive from 360px up: the whole page fills the viewport width, no
  horizontal scroll, no letterboxing. Layout containers stretch; images keep
  their aspect ratio.
- Visible focus ring in `--ink` on every link, button and form control.

## Meta

- Title: `הפסיכולוגיה הסמויה של הכסף | כנס אונליין חינמי, 4-5 באוקטובר`
- Description: `מ־2,000,000 ₪ חוב לחופש כלכלי. 4-5 באוקטובר, כנס אונליין חינמי בן יומיים עם רחלי חדד על החוקים הסמויים שמנהלים את מערכת היחסים שלכם עם כסף.`
- Open Graph image: `money-fear-poster.jpg`, locale `he_IL`.

## Do not

- Do not add prices, times of day, a countdown, a bonus stack or a guarantee.
  Nothing on this page is priced and nothing beyond the two dates is confirmed.
- Do not invent testimonials, logos, participant counts or press mentions.
- Do not name family members and do not mention how many children Racheli has.
- Do not add a navigation menu, a chat widget or a second competing CTA.
- Do not swap Heebo for a different family and do not introduce a dark section.

---
