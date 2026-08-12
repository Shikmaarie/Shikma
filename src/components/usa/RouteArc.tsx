"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The signature graphic for the US seminar: a hairline arc between the two
 * host cities, with a gold spark travelling west → east along it.
 *
 * Geography drives the layout, not the page direction: Los Angeles sits left,
 * Miami right, even though the page itself is RTL.
 *
 * Every gradient here is `userSpaceOnUse`. The default objectBoundingBox space
 * collapses on the straight hairlines and makes them disappear — see CLAUDE.md.
 */
export default function RouteArc({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  const path = "M 74 150 C 200 34, 400 34, 526 122";

  return (
    <svg
      viewBox="0 0 600 190"
      className={className}
      role="img"
      aria-label="מסלול הסמינר: לוס אנג׳לס ומיאמי"
    >
      <defs>
        <linearGradient
          id="arc-stroke"
          gradientUnits="userSpaceOnUse"
          x1="74"
          y1="150"
          x2="526"
          y2="122"
        >
          <stop offset="0%" stopColor="var(--color-gold-dp)" stopOpacity="0.15" />
          <stop offset="35%" stopColor="var(--color-gold-lt)" stopOpacity="0.95" />
          <stop offset="65%" stopColor="var(--color-gold-lt)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--color-gold-dp)" stopOpacity="0.15" />
        </linearGradient>

        <linearGradient
          id="arc-rule"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="600"
          y2="0"
        >
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="arc-node" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1">
          <stop offset="0%" stopColor="var(--color-gold-lt)" />
          <stop offset="100%" stopColor="var(--color-gold-dp)" />
        </radialGradient>
      </defs>

      {/* Ground rule the two cities sit on */}
      <line x1="0" y1="168" x2="600" y2="168" stroke="url(#arc-rule)" strokeWidth="1" />

      {/* The route */}
      <path
        d={path}
        fill="none"
        stroke="url(#arc-stroke)"
        strokeWidth="1.5"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />

      {/* A solid overlay that draws itself in, so the arc reads as a journey */}
      {!reduced && (
        <motion.path
          d={path}
          fill="none"
          stroke="url(#arc-stroke)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
            times: [0, 0.15, 0.8, 1],
          }}
        />
      )}

      {/* A short comet running the route. Done with a dash offset rather than
          an offset-path so it behaves the same in every engine. The path is
          ~487 units long; the dash gap is padded past that so only one comet
          is ever on screen. */}
      {!reduced && (
        <motion.path
          d={path}
          fill="none"
          stroke="var(--color-gold-lt)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="16 480"
          animate={{ strokeDashoffset: [0, -496] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        />
      )}

      <CityNode x={74} y={150} align="start" latin="LOS ANGELES" reduced={Boolean(reduced)} />
      <CityNode x={526} y={122} align="end" latin="MIAMI" reduced={Boolean(reduced)} />
    </svg>
  );
}

function CityNode({
  x,
  y,
  align,
  latin,
  reduced,
}: {
  x: number;
  y: number;
  align: "start" | "end";
  latin: string;
  reduced: boolean;
}) {
  return (
    <g>
      {!reduced && (
        <motion.circle
          cx={x}
          cy={y}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1"
          animate={{ r: [4, 18], opacity: [0.55, 0] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeOut",
            delay: align === "start" ? 0 : 1.4,
          }}
        />
      )}
      <circle cx={x} cy={y} r="4" fill="url(#arc-node)" />
      {/* Drop line down to the ground rule */}
      <line
        x1={x}
        y1={y + 5}
        x2={x}
        y2="168"
        stroke="var(--color-gold)"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <text
        x={x}
        y="186"
        textAnchor="middle"
        direction="ltr"
        className="fill-cream/70 font-sans text-[11px] font-bold tracking-[0.22em]"
      >
        {latin}
      </text>
    </g>
  );
}
