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
- While `FORM_ENDPOINT` is empty only `console.warn`. Shikma does not want a visible tag on the page, so remind her plainly, in every hand-off, that leads are not saved until the endpoint is connected.
- After success fire `fbq('track','CompleteRegistration')` and `gtag('event','sign_up')` when present, then redirect to `thanks.html` (template: `template/reference-thanks.html`): host voice, date chip, Google Calendar button and a real `/webinar.ics` file (data: URIs do not open in Instagram/Facebook in-app browsers), three next steps, signature.
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
2. Vercel (team "SHIKMA", project per client): the network here blocks direct uploads of large files and the Vercel GitHub app is not installed, so the deployment holds only `vercel.json` (and small text files such as `webinar.ics`), and everything else is rewritten to `https://raw.githubusercontent.com/<owner>/<repo>/<commit-sha>/landing-pages/<slug>/...`, pinned to the exact pushed sha:
   - rewrites: `/` and `/thanks.html` to the HTML files, `/favicon.ico` to `assets/favicon.ico`, `/assets/:path*` to the assets folder.
   - headers on the HTML routes override what GitHub sends: `Content-Type: text/html; charset=utf-8`, `Content-Security-Policy: default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'` (GitHub sends a sandbox CSP that would block everything), `X-Frame-Options: SAMEORIGIN`, `Cache-Control: public, max-age=0, must-revalidate`.
   - `/assets/testimonials/(.*)\\.mp4` gets `Content-Type: video/mp4`; `webinar.ics` gets `text/calendar`.
   - Never use the old loader (fetch + `document.write`): it shows the hero a second late and leaves no-JS tools a blank page.
3. Each change: commit, push, deploy with the new sha, then verify on the deployment URL (the alias can lag a few seconds) that the HTML contains the change and one asset returns 200 with the right content type.
4. Turn off Vercel SSO protection on the project (`ssoProtection: null`) so the client can open the link, and add a clean `<name>.vercel.app` project domain.
6. Give Shikma the URL; when she wants to see it on her phone, also send a QR code (`pip install qrcode`).

## Figma

- One page per version, a wrapper frame "Desktop · 1440", a "Components" section beside it.
- Create a colour-variable collection and text styles; bind fills to variables (pass the opacity inside the paint given to `setBoundVariableForPaint`, then verify it).
- Componentise repeated elements: button variants, cards (with TEXT and INSTANCE_SWAP properties), FAQ item with an Open boolean, form field with icon swap.
- `resize()` resets sizing modes to FIXED; set `primaryAxisSizingMode='AUTO'` again afterwards or content collapses.
- Shikma may change text styles or leave annotated copies beside sections. Inspect the page first (`children` of the page, text-style fonts), load the fonts actually used, and apply only the marked changes.

## Full QA before a hand-off

Run Playwright at 320, 390, 820, 1280 and 1440 and check: `scrollWidth` equals the viewport, no console errors, no broken images, no duplicate ids (SVG sprites!), no `.rv` left at opacity 0 after scrolling, no button taller than one line on phones, the form (empty, invalid, valid then redirect), calendar links, show-more, lightbox, sticky CTA, and the page with JavaScript disabled. The bundled Chromium cannot play H.264, so check videos on the live server (`video/mp4`, right size).

## Hand-off to a developer

Send a zip, not just the HTML: `index.html`, `thanks.html`, `webinar.ics`, `favicon.ico`, only the assets the pages reference, and a Hebrew `README.md` covering: form endpoint and fields, pixel/analytics, privacy-policy links still on `#`, replacing the vercel.app domain in `og:*`, server headers for mp4/ics, the event constants in both pages and the ics, and the designer credit. Give Shikma a ready message to paste to the developer listing what she still has to supply.
