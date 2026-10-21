# Form, QA, deploy and Figma

## Registration form

Configuration constants at the top of the page script:

```js
const FORM_ENDPOINT = "";            // webhook URL (Make / Zapier / Apps Script / mailing system)
const EVENT_START = new Date("2026-11-05T20:00:00+02:00");   // Israel time: +02:00 in winter, +03:00 in summer
const EVENT_MINUTES = 90;
const EVENT_TITLE = "...";
```

- Fields: full name, email, Israeli mobile (`/^(?:972|0)?5\d{8}$/` on digits), required consent checkbox, honeypot.
- POST `URLSearchParams`: name, email, phone, consent, event id, `variant`, page, submitted_at, plus any `utm_*`, `fbclid`, `gclid` from the URL.
- While `FORM_ENDPOINT` is empty, show a visible "טופס לא מחובר (מצב תצוגה)" tag so leads are never lost silently.
- After success: thank-you state, Google Calendar link and an `.ics` download with a 30-minute reminder; fire `fbq('track','CompleteRegistration')` and `gtag('event','sign_up')` when present.
- Countdown in the form card only, switches to "השידור התחיל / הסתיים".

## QA before every hand-off

Playwright with the preinstalled Chromium (import from `$(npm root -g)/playwright/index.mjs`):
- Full-page screenshots at 1440×900 and 390×844 (`isMobile`, `deviceScaleFactor:2`); add a style tag forcing `.rv` visible.
- `scrollWidth` equals the viewport width at both sizes.
- Fill and submit the form once: errors show for empty fields; valid data reaches the thank-you state.
- For animations, take screenshots at several moments after scrolling the section into view.
- Look at each crop yourself: clipped text, single words on the last line of headings, contrast on coloured bands, images that show nothing useful on phones.

## Publishing

1. Commit with a clear message and push to the working branch.
2. Preview artifact: strip the document skeleton, force `.rv` visible, rename the form tag to "תצוגה מקדימה: הטופס לא שומר פרטים", publish with the needed assets in `files`.
3. Vercel (team "SHIKMA"): the network here blocks direct uploads of large files and other hosts, and the Vercel GitHub app is not installed, so deploy two small files:
   - `vercel.json` rewriting `/page.html` and `/assets/:path*` to `https://raw.githubusercontent.com/<owner>/<repo>/<commit-sha>/landing-pages/<slug>/...` (pin the exact commit sha of the push).
   - `index.html`: a small loader with the real `<title>`, description and absolute `og:*` tags that fetches `/page.html` and `document.write`s it.
   Do not proxy the page HTML itself as `/`: GitHub serves it as text/plain and browsers cache that response, so phones and desktops show raw code. jsDelivr is unreliable for fresh commits; use raw.githubusercontent.com.
4. Turn off Vercel SSO protection on the project (`ssoProtection: null`) so the client can open the link, and add a clean `<name>.vercel.app` project domain.
5. Verify with `web_fetch_vercel_url`: `/` returns the loader, `/page.html` contains the new content, one asset returns 200 with the right size and content type.
6. Give Shikma the URL; when she wants to see it on her phone, also send a QR code (`pip install qrcode`).

## Figma

- One page per version, a wrapper frame "Desktop · 1440", a "Components" section beside it.
- Create a colour-variable collection and text styles; bind fills to variables (pass the opacity inside the paint given to `setBoundVariableForPaint`, then verify it).
- Componentise repeated elements: button variants, cards (with TEXT and INSTANCE_SWAP properties), FAQ item with an Open boolean, form field with icon swap.
- `resize()` resets sizing modes to FIXED; set `primaryAxisSizingMode='AUTO'` again afterwards or content collapses.
- Shikma may change text styles or leave annotated copies beside sections. Inspect the page first (`children` of the page, text-style fonts), load the fonts actually used, and apply only the marked changes.
