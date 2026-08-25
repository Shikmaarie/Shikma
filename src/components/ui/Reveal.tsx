"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered entrance. Respects reduced-motion by rendering the content
 * in its final state with no transform at all.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /**
   * The element to render. `span` exists for places where a div would be
   * invalid markup — inside a heading, for instance. Style it `block`
   * yourself; this only picks the tag.
   */
  as?: "div" | "span";
}) {
  const reduced = useReducedMotion();
  const Tag = as === "span" ? "span" : "div";
  const Motion = as === "span" ? motion.span : motion.div;

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion>
  );
}
