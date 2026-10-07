"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A figure that counts up to itself once it is scrolled into view.
 *
 * The final value is what renders on the server, so the markup is correct
 * before a single script runs and a screen reader never hears a number
 * mid-climb. The animation only ever replaces a value that is already
 * right, and it is skipped entirely for reduced motion.
 */
export default function CountUp({
  value,
  className = "",
  duration = 1400,
}: {
  /** The figure as it should finally read, e.g. "18", "1,000+", "0". */
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split "1,000+" into the number to climb and whatever trails it.
    const match = value.match(/^([\d,]+)(.*)$/);
    if (!match) return;
    const target = Number(match[1].replace(/,/g, ""));
    const suffix = match[2];
    if (!Number.isFinite(target) || target <= 0) return;

    let raf = 0;
    let start = 0;
    const grouped = match[1].includes(",");

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      // Fast out of the gate, settling on the figure rather than hitting it.
      const eased = 1 - Math.pow(1 - t, 3);
      const n = Math.round(target * eased);
      setShown((grouped ? n.toLocaleString("en-US") : String(n)) + suffix);
      if (t < 1) raf = requestAnimationFrame(step);
      else setShown(value);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          setShown("0" + suffix);
          raf = requestAnimationFrame(step);
        }
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    // `tabular-nums` so the box does not twitch while the digits change.
    <span ref={ref} className={`ltr-nums [font-variant-numeric:tabular-nums] ${className}`}>
      {shown}
    </span>
  );
}
