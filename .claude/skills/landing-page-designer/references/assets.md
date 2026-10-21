# Photos, logos and backgrounds

## First, check what the file already is

Many files Shikma sends already have a transparent background (RGBA webp/png). Check before processing:

```python
from PIL import Image
im = Image.open(path); print(im.mode, im.size)
if 'A' in im.mode: print(im.getchannel('A').getextrema())
```

If it has alpha, use it as is. Converting an RGBA image to RGB turns the transparent area black; background removal on top of that produces jagged edges.

## Background removal (only when there is no alpha)

`pip install "rembg[cpu]"`, session `birefnet-portrait` for people and figures. Check the result composited on the page colour before using it.

## Sizes and formats

- Save each photo as `.webp` (quality ~80) plus a smaller `-960.webp` for `srcset`; keep a `.png` fallback for transparent images.
- Crop transparent images to their alpha bounding box (`alpha > 30`) so layout sizes are exact.
- Record the real width/height in the `<img>` tags.

## Logos

From one transparent logo make three files:
- `logo.webp/png`: full logo with tagline (desktop header)
- `logo-compact.webp/png`: mark + name, no tagline (phone header). Find the gap columns/rows in the alpha channel to split mark, name and tagline, then recompose.
- `logo-mark.webp/png`: the mark alone (footer, favicon ideas)
Never place a white or frosted box behind a logo; use the glow filter from the design system.

## Host photo

- Prefer a professional photo with a transparent background; it stands on the bottom edge of the host section.
- Never publish family photos where children's faces are visible without explicit approval.

## Decorative imagery

- Branches and leaves can be cut from the hero photo and blended with `mix-blend-mode:multiply` (light sections) or `soft-light` (colour bands) and a radial mask.
- Textured section backgrounds (plaster, light and shadow) go on the section itself, `background-size:cover`; on phones show only the top part and fade into the page colour.

## Figma

- Upload with `upload_assets` and POST raw bytes (`Content-Type` header), not multipart, so layer names stay intact.
- Upload JPG/PNG to Figma; webp uploads may not render.
- Upload a repeated image once and copy its `imageHash` to the other nodes.
