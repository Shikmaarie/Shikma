---
name: landing-page-designer
description: Design and build high-converting Hebrew (RTL) landing pages for webinars, workshops, courses and services, from the client's copy, reference images, photos and logo, then publish them to a shareable URL and keep Figma in sync. Use whenever Shikma asks for a landing page, sales page, webinar page, registration page, "דף נחיתה", "דף הרשמה", "דף לוובינר", or uploads copy plus inspiration images for a page. Also use for follow-up changes to a page built this way (sections, fonts, images, mobile view, footer, deploy).
---

# Landing Page Designer

Builds landing pages the way the Meital Avrahami webinar page was built: a single static `index.html` plus an `assets/` folder, Hebrew RTL, mobile-first, with a working registration form, then a live URL and a Figma copy.

The finished reference page is `template/reference-landing.html`. Read it before building; reuse its structure, tokens, components and scripts instead of starting from zero. Detailed rules live in:

- `references/design-system.md`: type scale, colours, spacing, header, footer, every section pattern
- `references/rtl-and-mobile.md`: RTL rules, phone layout, animations
- `references/assets.md`: photos, logos, transparency, backgrounds
- `references/form-and-deploy.md`: form, countdown, calendar, Vercel, Figma, QA

## Who is who

Shikma Oshri Arie is the designer and builder. The client (the page owner) supplies the copy and photos. Put Shikma's credit in the footer only: "עיצוב ובניית אתרים: שקמה אושרי אריה" linking to `https://celebrated-duckanoo-c56f2b.netlify.app/#contact`.

## Workflow

1. **Intake.** Read everything Shikma sends: the copy (often a .docx), reference screenshots, photos, icons, logo. List what is missing and ask in one short message, only for things that block the page:
   - form destination (webhook / mailing system), privacy-policy link
   - event date, time and length (for countdown and calendar)
   - logo file (transparent PNG or SVG), host photo
   - whether testimonials are real and approved
   Never invent prices, testimonials, credentials, numbers or promises. Copy that is not in the source stays out.

2. **Read the references for direction, never copy them.** Take palette, mood, layout ideas and decorative motifs. Do not reuse another brand's name, logo or text.

3. **Structure the copy into a conversion story** (details in `design-system.md`):
   hook hero → recognition ("זה אני") → curiosity / the hidden story → the approach and the hope → what the event covers → the host → testimonials → FAQ → registration → footer.
   When Shikma pastes a long block of copy, split it along these beats: a short, strong H1 with a punch line, one supporting sentence, then recognition cards, then the deeper explanation.

4. **Build** from the template: copy `template/reference-landing.html` to `landing-pages/<client-slug>/index.html`, replace content and assets, adapt the palette tokens in `:root`. Keep text in the HTML only (no copy hidden in CSS/JS).

5. **Check before showing anything** (see QA in `form-and-deploy.md`): screenshot desktop 1440 and phone 390 with Playwright, confirm `scrollWidth` equals the viewport, look at every section, fix, re-check once.

6. **Publish**: commit and push to the working branch, update the private preview artifact, deploy to Vercel, verify the live URL returns the page and images, give Shikma the link (and a QR code when she wants to look on her phone).

7. **Figma**: mirror the page in the Figma file as editable layers with local components, colour variables and text styles. After Shikma edits Figma, read her changes (text styles, notes placed beside sections) and apply only what she marked.

## Working with Shikma

- Do exactly the changes she lists; leave everything else untouched. If a change she asked for creates a side problem (contrast, readability, a word alone on a line), fix the direct cause and mention the rest instead of changing it silently.
- When something is ambiguous (which version, which section), make the most likely choice, do it, and say which choice was made.
- Reply in Hebrew, short, no emoji, no em dash. Say what changed, where to see it, and anything she must decide.
- Images she pastes mid-task are not saved as files. If you need the file (logo, photo), ask her to send it again as its own message.
