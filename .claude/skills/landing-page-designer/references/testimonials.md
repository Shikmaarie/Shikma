# Testimonials: videos and WhatsApp screenshots

Only real testimonials. Never invent quotes, names or ages; typed testimonials that cannot be traced to a real person are removed. Real screenshots beat typed quotes.

## Videos

- Probe with `ffprobe`; look at a contact sheet (`fps=1,scale=116:-1,tile=12x6`) before cutting. When Shikma names a timestamp, find the spoken words in the burned-in subtitles; if the time and the words disagree, cut at the words and tell her.
- Encode: `-c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart`; a short `afade` in when trimming. Poster jpg from a frame where the face is clear.
- Markup: `<figure class="vid"><div class="vbox"><video controls playsinline preload="none" poster=...></video>{frame svg}</div><figcaption>name, role</figcaption></figure>`. Captions come from the video's own text; unknown speaker gets a neutral caption and a question to Shikma.
- Desktop: one row, `minmax(200px,250px)` columns. Phones: horizontal swipe row, `scroll-snap-align:start`, set `scrollLeft=0` on load so RTL starts at the right-hand clip; videos inside the row must not use `.rv` (off-screen clips would stay invisible).

## WhatsApp screenshots

- Crop to the message bubbles only: no status bar, chat header, keyboard, input bar, notifications or floating buttons. Skip duplicates. Do not publish photos of children (even without a face); keep only the text.
- Blur the whole sender line (name and the nickname after it) and profile photos that show faces; check the blur at 2x zoom. Leave the message text sharp.
- Resize to max 760px wide, quality ~86, real width/height on the `<img>`.
- Gallery `.shots` of `<figure class="shot">`:
  - Desktop/tablet: CSS columns (3), each card rises in (`translateY(34px)` to 0) one after another, 160ms apart, in page order.
  - Phones: one column max 360px, cards tilted ±1-2deg, each slides out from under the one above as it scrolls in; `max-height:400px` with a bottom fade for long messages (smaller for the card right before the button); only 4 shown, then a "לעוד עדויות" button.
  - Tap any card to open it full size in a `<dialog>` lightbox; a small hint line under the gallery says so.
- Animated frame on every screenshot and video: inline SVG `<rect width="100%" height="100%" rx=..>` over the card, stroke light sage `#c2cfb5`, 1.2px; set `--len` from `getTotalLength()` in JS (`pathLength` is not reliable), dashoffset `--len` to 0 over 2.4s, starting after the card has appeared. Shikma liked this; keep it subtle.
