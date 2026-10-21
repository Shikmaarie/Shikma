# RTL, phones and motion

## RTL

- `<html lang="he" dir="rtl">`. In flex/grid rows the first child sits on the right.
- Email and phone inputs: `direction:ltr; text-align:right`, placeholders `direction:rtl`.
- Icons that point "forward" point left (arrow, chevron).
- Hebrew quotation marks (״) render badly in large display type; in big statements use styling (strike, bold, colour) instead of quote marks.
- Countdown order on the page, right to left: minutes, hours, days (no seconds). In DOM order write minutes first.
- In Figma, auto-layout is LTR: append children in reverse visual order.

## Phone layout (≤760px, tablet ≤980px)

- Test at 390px. `document.documentElement.scrollWidth` must equal the viewport; anything absolutely positioned with a negative `left` (honeypot fields, decorations) can widen an RTL page, so clip it with `clip:rect(0 0 0 0)` instead.
- Grids collapse to one column; recognition cards become rows; header shows the compact logo; topbar button hidden; sticky CTA visible; footer centred with extra bottom padding for the sticky bar.
- Large display text that works on desktop can fill a phone; check subtitles and punch lines at 390px.
- Section backgrounds: a wide photo cropped to a tall phone section usually shows nothing useful. Provide a portrait image for phones via `<picture><source media="(max-width:760px)">`, pin it to the bottom, fill the area above with the photo's sky colour, fade the image's top edge with a mask, and add bottom padding so text ends where the important part of the photo begins (`padding-bottom: calc(<image-height-ratio × fraction> vw + gap)`).

## Motion

- Reveal on scroll with IntersectionObserver (`.rv` → `.in`). Preview builds force `.rv` visible.
- Everything respects `prefers-reduced-motion`: final state shown, no animation. Remember this when Shikma says "I don't see the animation".
- Connector lines (desktop): SVG layer inside the grid, computed from layout boxes with `offsetLeft/offsetTop` (not `getBoundingClientRect`, which includes the reveal transform). Draw with `pathLength="1"` and `stroke-dashoffset` 1→0, staggered; a sparkle pops at each card; a soft light keeps travelling along the lines.
- Connector lines (phones): one thread from the illustration down a rail on the right, drawn by scroll progress, lighting a sparkle at each card.
- Never name a state class with a word the page already uses (`done`, `open`, `active`): the form's `.done{display:none}` once hid the finished lines. Prefix animation states (`is-drawn`).
