"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The two texture layers the landing page reuses between sections: slow
 * drifting colour fields, and a fine grain that keeps the large flat darks
 * from banding on wide screens.
 */

/** Soft brand-coloured light behind a section. Purely decorative. */
export function Aurora({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const reduced = useReducedMotion();

  const blobs = [
    { color: "var(--color-teal-2)", size: 46, x: "12%", y: "18%", delay: 0 },
    { color: "var(--color-gold)", size: 34, x: "78%", y: "26%", delay: 1.6 },
    { color: "var(--color-coral)", size: 26, x: "58%", y: "82%", delay: 3.1 },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {blobs.map((blob) => (
        <motion.span
          key={blob.x + blob.y}
          className="absolute rounded-full blur-[90px]"
          style={{
            background: blob.color,
            width: `${blob.size}rem`,
            height: `${blob.size}rem`,
            left: blob.x,
            top: blob.y,
            translate: "-50% -50%",
            opacity: 0.16 * intensity,
          }}
          animate={
            reduced
              ? undefined
              : { x: [0, 26, -18, 0], y: [0, -22, 16, 0], scale: [1, 1.08, 0.96, 1] }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Film grain. An inline data URI rather than a file so it costs no request,
 * and `mix-blend-overlay` keeps it from lifting the blacks.
 */
export function Grain({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
