import { site } from "@/data/site";

/** The origin this deployment is actually being served from. */
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/**
 * Whether this deployment is the real site.
 *
 * Search engines must only index the live domain. A preview build — a
 * `*.vercel.app` or `*.netlify.app` URL handed round for review — is a
 * complete copy of the site, and if it gets crawled it competes with
 * Racheli's own domain for her own name.
 *
 * The test is deliberately the origin rather than a hosting provider's
 * env var: set `NEXT_PUBLIC_SITE_URL` to wherever the build is served
 * from, and anything that isn't the live domain is noindex by default,
 * whoever hosts it.
 */
export const isLiveSite = baseUrl === site.url;
