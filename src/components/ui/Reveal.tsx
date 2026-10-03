"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-triggered entrance.
 *
 * The hidden state is CSS behind `.js`, never an inline style, so the markup
 * this renders on the server is readable on its own. If the script never
 * runs the content simply shows; if it does, the observer brings each block
 * in as it arrives. Reduced motion is handled in the stylesheet.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  /** Seconds, to match the call sites this replaced. */
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Anything already on screen when the page loads should not wait.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "-80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={
        {
          "--reveal-delay": `${Math.round(delay * 1000)}ms`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
