/**
 * Which surface a route's first band presents to the fixed header.
 *
 * `Hero` (home) and `PageHeader` (every category page) open on the teal
 * band, so the bar starts as light type on dark. A product page, the
 * checkout and the legal documents open straight onto paper, where that
 * same light type is invisible: the wordmark measured 1.07:1 against
 * ivory before this existed.
 *
 * Keep this in step with the sections a route opens with. A new route that
 * does not start with `PageHeader` belongs in the light list below.
 */
const OPENS_ON_PAPER = [
  /^\/store\/[^/]+/, // a product page opens on the breadcrumb, not a band
  /^\/checkout/,
  /^\/legal/,
];

export function opensOnPaper(pathname: string): boolean {
  return OPENS_ON_PAPER.some((re) => re.test(pathname));
}
