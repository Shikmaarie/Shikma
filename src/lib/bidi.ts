/**
 * Visual reordering for right-to-left text in OG images.
 *
 * Satori — the renderer behind `next/og` — does not implement the Unicode
 * bidirectional algorithm. Setting `direction: rtl` aligns a block to the
 * right but leaves the glyphs in logical order, so Hebrew comes out spelled
 * backwards. The fix is to hand Satori text already in visual order and let
 * it lay that out left-to-right.
 *
 * This is only for image generation. Never use it for HTML — browsers do
 * bidi properly, and pre-reversed text there would break selection, search
 * and screen readers.
 */

/** Hebrew, Arabic and their presentation forms. */
const RTL = /[֐-׿؀-ۿ܀-ݏיִ-﷿ﹰ-﻿]/;
/**
 * Runs that keep their own left-to-right order, e.g. "DNA", "100K", "6".
 *
 * Interior spaces are included so a multi-word phrase like "Platinum
 * Business" is restored as one unit rather than having its words swapped.
 * Interior dots, underscores and @ keep emails and domains intact.
 *
 * Deliberately excludes the hyphen: in "ה-DNA" the hyphen belongs to the
 * Hebrew side of the word, so swallowing it into the Latin run would move it
 * to the wrong side of "DNA".
 */
const LTR_RUN = /[A-Za-z0-9]+(?:[ ._@][A-Za-z0-9]+)*/g;

/** Characters whose shape must flip when the reading direction flips. */
const MIRROR: Record<string, string> = {
  "(": ")",
  ")": "(",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "<": ">",
  ">": "<",
  "„": "”",
  "”": "„",
};

/**
 * Returns `text` in the visual order an RTL reader expects.
 *
 * Reverses the whole string, then restores any embedded left-to-right runs
 * so Latin words and numbers still read correctly inside the Hebrew.
 */
export function toVisualRtl(text: string): string {
  // Array.from so surrogate pairs and combining marks survive the reverse.
  const reversed = Array.from(text)
    .reverse()
    .map((ch) => MIRROR[ch] ?? ch)
    .join("");

  // The reverse also flipped Latin/digit runs — put those back.
  return reversed.replace(LTR_RUN, (run) => Array.from(run).reverse().join(""));
}

/** True when the string contains any right-to-left script. */
export function hasRtl(text: string): boolean {
  return RTL.test(text);
}

/** Applies visual reordering only where it's actually needed. */
export function visual(text: string): string {
  return hasRtl(text) ? toVisualRtl(text) : text;
}
