import type { Product } from "@/data/products";

/**
 * Generative cover art for a product.
 *
 * There are no photographs of these offers, and stock imagery would read as
 * filler, so each product gets a drawn "sigil" instead: a motif chosen by
 * category, varied deterministically by the slug so two products in the same
 * category never look identical, and tinted with the product's accent.
 *
 * Deterministic on purpose — the same product renders the same art on every
 * build, on the server and the client alike.
 */

const palette = {
  gold: { a: "#d3a96a", b: "#edd4a2" },
  coral: { a: "#f5877b", b: "#ffc3ba" },
  peri: { a: "#85c9bc", b: "#c7dad5" },
} as const;

/** Small stable hash so the variation survives rebuilds. */
function seedOf(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) % 100000;
  }
  return h;
}

export default function ProductSigil({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const seed = seedOf(product.slug);
  const { a, b } = palette[product.accent];
  const gid = `sig-${product.slug}`;

  return (
    <svg
      // 400x150 matches the card's cover band closely enough that "slice"
      // trims only a sliver, so no motif gets beheaded.
      viewBox="0 0 400 150"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/*
          userSpaceOnUse is required, not stylistic: the default
          objectBoundingBox units collapse on a zero-width bounding box, which
          would make every straight vertical or horizontal line invisible.
        */}
        <linearGradient
          id={`${gid}-stroke`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="400"
          y2="150"
        >
          <stop offset="0" stopColor={a} stopOpacity="0.15" />
          <stop offset="0.5" stopColor={b} stopOpacity="0.85" />
          <stop offset="1" stopColor={a} stopOpacity="0.2" />
        </linearGradient>
        <radialGradient
          id={`${gid}-glow`}
          gradientUnits="userSpaceOnUse"
          cx="200"
          cy="75"
          r="190"
        >
          <stop offset="0" stopColor={a} stopOpacity="0.35" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="75" rx="190" ry="74" fill={`url(#${gid}-glow)`} />

      <g
        stroke={`url(#${gid}-stroke)`}
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        <Motif category={product.category} seed={seed} accent={a} gid={gid} />
      </g>
    </svg>
  );
}

function Motif({
  category,
  seed,
  accent,
  gid,
}: {
  category: Product["category"];
  seed: number;
  accent: string;
  gid: string;
}) {
  switch (category) {
    /* Ascending steps — growth, scale, the climb to six figures. */
    case "business": {
      const bars = 8 + (seed % 3);
      const lift = 5 + (seed % 4);
      const base = 128;
      return (
        <>
          {Array.from({ length: bars }, (_, i) => {
            const x = 40 + i * (320 / (bars - 1));
            const h = 14 + i * lift + ((seed >> i) % 9);
            return (
              <g key={i}>
                <line x1={x} y1={base} x2={x} y2={base - h} strokeWidth="1.6" />
                <circle
                  cx={x}
                  cy={base - h}
                  r={2.6}
                  fill={accent}
                  stroke="none"
                  opacity={0.85}
                />
              </g>
            );
          })}
          <line x1="28" y1={base} x2="372" y2={base} strokeWidth="1" opacity="0.5" />
        </>
      );
    }

    /* Concentric ripples — the inner work spreading outward. */
    case "wealth": {
      const rings = 6 + (seed % 3);
      const cx = 200;
      const cy = 75;
      const emphasis = 1 + (seed % 3);
      return (
        <>
          {Array.from({ length: rings }, (_, i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={24 + i * 24 + (seed % 9)}
              ry={11 + i * 9 + (seed % 4)}
              strokeWidth={i === emphasis ? "1.9" : "1"}
              opacity={1 - i * 0.1}
            />
          ))}
          <circle cx={cx} cy={cy} r="4" fill={accent} stroke="none" />
        </>
      );
    }

    /* Interlocking circles — the community holding each other. */
    case "club": {
      const nodes = 6 + (seed % 2);
      const r = 60;
      return (
        <>
          {Array.from({ length: nodes }, (_, i) => {
            const angle = (i / nodes) * Math.PI * 2 + seed / 1000;
            return (
              <circle
                key={i}
                cx={200 + Math.cos(angle) * r}
                cy={75 + Math.sin(angle) * r * 0.5}
                r={26}
                strokeWidth="1.2"
                opacity="0.8"
              />
            );
          })}
          <circle cx="200" cy="75" r="26" strokeWidth="1.9" />
        </>
      );
    }

    /* Stacked pages fanning open. */
    case "books": {
      const leaves = 7 + (seed % 4);
      const spread = 6 + (seed % 5);
      const emphasis = 2 + (seed % 3);
      const top = 26;
      const step = (110 - top) / leaves;
      return (
        <>
          {Array.from({ length: leaves }, (_, i) => {
            const y = top + i * step + 14;
            const fan = 18 + i * spread;
            return (
              <path
                key={i}
                d={`M ${200 - fan} ${y} Q 200 ${y - 11} ${200 + fan} ${y}`}
                strokeWidth={i === emphasis ? "1.8" : "1"}
                opacity={1 - i * 0.07}
              />
            );
          })}
          <line x1="200" y1={top} x2="200" y2="132" strokeWidth="1" opacity="0.45" />
        </>
      );
    }
  }
}
