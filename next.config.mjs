/** @type {import('next').NextConfig} */

/**
 * `STATIC_PREVIEW=1 npx next build` emits a plain folder of HTML that can be
 * opened anywhere, for showing the design before the site has a host. The
 * checkout routes cannot come along — a static folder has no server — so the
 * preview build leaves them out and the cart is for looking at only.
 */
const preview = process.env.STATIC_PREVIEW === "1";

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  ...(preview
    ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
    : {}),
};
export default nextConfig;
