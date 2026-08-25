"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { partnerships } from "@/data/partnerships";

/**
 * Small-screen conversion bar.
 *
 * Appears once the hero button has scrolled away and hides again over the
 * registration form, so it never covers the fields it is pointing at. Desktop
 * doesn't get it — the form is visible alongside the copy there.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const anchor = document.getElementById("register");
    if (!anchor) return;

    const update = () => {
      const past = window.scrollY > window.innerHeight * 0.8;
      const rect = anchor.getBoundingClientRect();
      // The form is on screen — the bar would only be in the way.
      const formInView = rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(past && !formInView);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { y: 90 }}
          animate={{ y: 0 }}
          exit={reduced ? undefined : { y: 90 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-ivory/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
        >
          <a
            href="#register"
            className="flex items-center justify-center rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-6 py-3.5 text-center text-base font-black text-ink"
          >
            {partnerships.ctaShort}
          </a>
          <p className="mt-2 text-center text-[11px] text-ink-soft">
            ללא עלות · מספר המקומות מוגבל
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
