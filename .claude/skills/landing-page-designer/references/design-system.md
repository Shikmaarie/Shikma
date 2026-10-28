# Design system

Everything here is implemented in `../template/reference-landing.html`. Change values through the `:root` tokens, not inline.

## Palette (tokens)

Start from the client's references and logo, then define 6 to 10 tokens. The reference page uses:

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#f8f4ec` | page background |
| `--cream` | `#efe7d8` | alternating sections (testimonials) |
| `--forest` / `--ink` | `#1c2620` / `#1d241f` | headings, primary button, footer |
| `--ink-soft` | `#4d574e` | body text |
| `--b-sage` | `#8b9a7f` | icons, circles, accents |
| `--b-sage-tint` | `#e3e8dc` | highlight boxes |
| `--b-sage-band` | `#76866c` | full-width colour band |
| `--gold` | `#c8a26a` | numbers, small accents, secondary button |
| `--b-clay` | `#b5653f` | form button (warm, high contrast) |

Rules: one dark neutral, one or two light neutrals with a warm bias, one band colour, one accent. Text on a coloured band is dark ink unless the band is very dark. Check contrast whenever a background changes: light-green text on a mid-green band disappears.

## Typography

- **Headings and display** (`--head`): `"Open Sans Hebrew Condensed", "Open Sans", Arial, sans-serif` with `font-stretch:75%`. Open Sans Hebrew Condensed is not on Google Fonts; load `Open+Sans:wdth,wght@75..100,400..800` and the 75% width gives the condensed look with full Hebrew. Weights: 700 for headings, 400 for a softer second line.
- **Body** (`--sans`): Open Sans at normal width (same Google Fonts request as the headings). Shikma chose this over Assistant: condensed for headings, Open Sans for everything else.
- Testimonial quotes, names and ages, dates and times also use the condensed heading face.
- Scale (desktop / phone via `clamp`):
  - H1 hero `clamp(2.6rem,7.4vw,5.4rem)`, second line `.62em`, weight 400
  - H2 section `clamp(2rem,4.6vw,3.1rem)`, `text-wrap:balance`
  - Card title `1.45rem` to `1.5rem`
  - Lead `1.15rem` to `1.22rem`, body `1.02rem` to `1.12rem`, line-height 1.6 to 1.7
  - Eyebrow `.86rem`, weight 600, letter-spacing .06em, short lines on both sides
  - Punch line (big statement) `clamp(1.8rem,4vw,2.8rem)` condensed 700
- Keep running text near 60 to 70 characters per line (`max-width` 620 to 760px).

## Header

- Absolute over the hero, `wrap` width, logo on the right (RTL start), small CTA button on the left (hidden on phones).
- Logo transparent, no box behind it. For legibility over photos use a glow only:
  `filter:drop-shadow(0 0 1px rgba(255,255,255,.9)) drop-shadow(0 0 10px rgba(250,247,240,.95)) drop-shadow(0 0 22px rgba(250,247,240,.8))`.
- Desktop: full logo with tagline, height 64px. Phone: compact version (mark + name, no tagline) via `<picture><source media="(max-width:760px)">`, height 40px.

## Hero

- Full-viewport photo, slow drift animation, soft radial light behind the text, fade to `--paper` at the bottom, a few floating light motes.
- Content centred: date pill with live dot, H1 hook (question that makes the reader stop), one supporting sentence, primary CTA in first person ("אני רוצה לגלות..."), small note under it ("ללא עלות · מספר המקומות מוגבל").
- No countdown in the hero; the countdown lives in the form card.

## Section patterns (in story order)

1. **Recognition ("זה מרגיש מוכר?")**: eyebrow + H2, 3 to 4 white cards with a green circle icon, then a sage-tint box with the "and still..." sentence. On phones the cards become compact rows (icon beside text).
2. **The hidden story**: H2 question, items as "roots": round sage icon on the right, white card with bold title and one sentence, a thin vertical line joining the icons. End with a punch line in large condensed type, second half in dark sage.
3. **The approach**: eyebrow + H2 + one or two short paragraphs, then a highlight box that swaps the reader's question: old question struck through in clay, arrow down, new question large and bold. Closing sentence, CTA.
4. **What we will cover**: colour band, four cards around a central illustration, fine connector lines drawn from the illustration to the cards (see animations), a live Q&A strip, CTA.
5. **The host**: textured photo background, host cut-out photo standing on the section's bottom edge (section `padding-bottom:0`, grid `align-items:end`), eyebrow "בהנחיית", name, stat ("+20 שנות ניסיון..."), bio. On phones text first, photo last.
6. **Testimonials**: cream background, three cards, condensed quote text, avatar initial and name/age in the condensed face. Leave a commented slot for screenshot testimonials.
7. **FAQ**: `<details>` accordion, first item open, plus/minus button.
8. **Register**: photo background (separate portrait image for phones), details panel (heading, date chip, benefits list) next to the form card (countdown, scarcity line, fields with icons, consent checkbox, clay button).
9. **Footer**: dark, logo mark + "© year name · field", policy link, divider, centred designer credit in gold. Centred column on phones.

## Buttons and CTAs

- On phones every button stays on one line at the same size: `white-space:nowrap; font-size:clamp(.82rem,3.9vw,.98rem); padding-inline:clamp(14px,4.5vw,22px)`. Check 320px.
- CTA wording along the page speaks to the reader's pain in first person ("אני רוצה לדעת מה מעכב אותי בחיים"); the form's own button says what happens ("שמרו לי מקום בשידור").

- Pill buttons, min-height 58px, arrow icon on the left (RTL end), lift on hover.
- Primary dark on light sections, gold on dark/colour bands, clay inside the form.
- The same CTA wording repeats at the end of every persuasive block; a sticky CTA bar appears on phones after the hero and hides while the form is on screen.

## Copy rules

- Keep the client's wording. You may split, order and emphasise; do not rewrite meaning or add claims.
- Plural address (אתם) unless the client writes for one gender; the consent line uses "מאשר/ת".
- Fix obvious typos and say so.

## Lessons from the Meital page (keep these)

- **Host voice:** the client speaks in first person and invites ("אני מיטל..., ואני מזמינה אתכם"); her personal story sits in its own box in the host section.
- **Hero:** host photo in the first screen. Desktop: text on the right, cut-out photo standing on the hero's bottom edge on the left (no drop-shadow inside a mask, it draws a visible edge). Phones: small round avatar centred above the invitation line. Pill above the H1: field · "וובינר חינמי בזום" · date and time. No entrance animation in the first screen.
- **Page always opens at the top:** `history.scrollRestoration="manual"`, strip any `#hash` on load.
- **No sideways panning on phones:** `html,body{overflow-x:clip}` (hidden fallback), `overflow:clip` on sections with tilted cards, `overscroll-behavior-x:contain` on horizontal rows.
- **Reveal only with JS:** `.js .rv{opacity:0}` and add the `js` class in `<head>`, so tools without JS see everything.
- **Favicon:** the client's logo mark, square, 32/48/192 PNG, `favicon.ico`, and a 180px `apple-touch-icon` on the page colour.
- **Medical claims:** personal healing stories and results in testimonials may block Meta ads. Say so once; the client decides.
