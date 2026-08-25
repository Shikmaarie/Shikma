"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The hero motif: a network that draws itself.
 *
 * The page is about business connections, so the backdrop is a literal one —
 * nodes joined by edges that trace in, with light travelling along them. It
 * replaces the site's three.js helix here on purpose: a landing page is judged
 * on how fast the offer lands, and an SVG costs a few kilobytes against the
 * helix's WebGL bundle.
 *
 * Coordinates are hand-placed in a 900×760 space rather than generated, so the
 * cluster reads as a deliberate constellation instead of random scatter.
 */

type Node = { id: string; x: number; y: number; r: number };

const NODES: Node[] = [
  { id: "core", x: 452, y: 372, r: 15 },
  { id: "a", x: 214, y: 176, r: 7 },
  { id: "b", x: 690, y: 190, r: 8.5 },
  { id: "c", x: 762, y: 452, r: 6.5 },
  { id: "d", x: 588, y: 618, r: 9 },
  { id: "e", x: 296, y: 596, r: 7 },
  { id: "f", x: 122, y: 404, r: 8 },
  { id: "g", x: 448, y: 108, r: 6 },
  { id: "h", x: 828, y: 296, r: 5 },
  { id: "i", x: 168, y: 664, r: 5.5 },
  { id: "j", x: 742, y: 664, r: 5 },
];

const BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));

/** Spokes from the core, then the outer ring that makes it a web, not a star. */
const EDGES: [string, string][] = [
  ["core", "a"],
  ["core", "b"],
  ["core", "c"],
  ["core", "d"],
  ["core", "e"],
  ["core", "f"],
  ["core", "g"],
  ["a", "g"],
  ["g", "b"],
  ["b", "h"],
  ["h", "c"],
  ["c", "j"],
  ["j", "d"],
  ["d", "e"],
  ["e", "i"],
  ["i", "f"],
  ["f", "a"],
];

/** Edges the travelling pulse runs along, with its own offset in the cycle. */
const PULSES: { from: string; to: string; delay: number }[] = [
  { from: "a", to: "core", delay: 0 },
  { from: "b", to: "core", delay: 1.1 },
  { from: "d", to: "core", delay: 2.2 },
  { from: "f", to: "core", delay: 3.3 },
  { from: "core", to: "c", delay: 1.7 },
  { from: "core", to: "e", delay: 2.9 },
];

export default function ConnectionWeb({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  /*
   * The page renders this twice — once for desktop, once for mobile — and only
   * one of them is displayed at a time. Hard-coded ids would collide, and
   * `url(#…)` resolves to the first match in the document, which is the copy
   * inside the `display: none` container. Chrome then drops the paint server
   * and the edges vanish on whichever instance loses the race.
   */
  const uid = useId();
  const id = (name: string) => `${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 900 760"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/*
          userSpaceOnUse throughout: the default objectBoundingBox collapses on
          a perfectly horizontal or vertical line — zero height or width — and
          the stroke disappears. Several edges here are close to axis-aligned.
        */}
        <linearGradient id={id("cw-edge")} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="900" y2="760">
          <stop offset="0%" stopColor="#14606a" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#d3a96a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#14606a" stopOpacity="0.15" />
        </linearGradient>

        <radialGradient id={id("cw-core")} gradientUnits="userSpaceOnUse" cx="452" cy="372" r="120">
          <stop offset="0%" stopColor="#edd4a2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#edd4a2" stopOpacity="0" />
        </radialGradient>

        <filter id={id("cw-glow")} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Halo behind the central node */}
      <circle cx="452" cy="372" r="120" fill={`url(#${id("cw-core")})`} />

      {/*
        Each edge carries non-scaling-stroke — the property does not inherit,
        so it cannot sit on the group. Without it the viewBox is scaled to a
        third of its size on a phone, the 1.25px stroke goes with it, and the
        web renders as loose dots with no connections between them.
      */}
      <g stroke={`url(#${id("cw-edge")})`} strokeWidth="1.25" strokeLinecap="round" fill="none">
        {EDGES.map(([from, to], i) => {
          const a = BY_ID[from];
          const b = BY_ID[to];
          const length = Math.hypot(b.x - a.x, b.y - a.y);

          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              vectorEffect="non-scaling-stroke"
              {...(reduced
                ? {}
                : {
                    strokeDasharray: length,
                    initial: { strokeDashoffset: length, opacity: 0 },
                    animate: { strokeDashoffset: 0, opacity: 1 },
                    transition: {
                      duration: 1.4,
                      // Spokes trace out first, then the outer ring closes.
                      delay: 0.3 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1] as const,
                    },
                  })}
            />
          );
        })}
      </g>

      {/* Light travelling between partners — the whole point of the motif. */}
      {!reduced &&
        PULSES.map(({ from, to, delay }) => {
          const a = BY_ID[from];
          const b = BY_ID[to];

          return (
            <motion.circle
              key={`${from}>${to}`}
              r="3"
              fill="#edd4a2"
              filter={`url(#${id("cw-glow")})`}
              initial={{ cx: a.x, cy: a.y, opacity: 0 }}
              animate={{
                cx: [a.x, b.x],
                cy: [a.y, b.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.6,
                delay: 1.6 + delay,
                repeat: Infinity,
                repeatDelay: 3.4,
                ease: "easeInOut",
                times: [0, 0.15, 0.85, 1],
              }}
            />
          );
        })}

      <g>
        {NODES.map((node, i) => {
          const isCore = node.id === "core";

          return (
            <motion.g
              key={node.id}
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.4 },
                    animate: { opacity: 1, scale: 1 },
                    transition: {
                      duration: 0.7,
                      delay: 0.2 + i * 0.09,
                      ease: [0.22, 1, 0.36, 1] as const,
                    },
                  })}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + (isCore ? 14 : 8)}
                fill="none"
                stroke="#d3a96a"
                strokeOpacity={isCore ? 0.35 : 0.16}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={isCore ? "#edd4a2" : "#d3a96a"}
                fillOpacity={isCore ? 1 : 0.75}
                filter={isCore ? `url(#${id("cw-glow")})` : undefined}
              />
            </motion.g>
          );
        })}
      </g>
    </svg>
  );
}
