"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandStar } from "@/components/ui/Wordmark";
import { usaSeminar } from "@/data/usaSeminar";

/**
 * Floating conversion bar. Appears once the hero is out of the way and hides
 * again over the registration form, so it never covers the fields it is
 * pointing at.
 */
export default function UsaStickyCta() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;

      const form = document.getElementById("register");
      const formInView = form
        ? form.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(past && !formInView);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 rounded-full px-5 py-3 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.9)] sm:px-7">
            <p className="flex min-w-0 items-center gap-2.5 text-sm">
              <BrandStar className="size-3.5 shrink-0 text-gold" />
              <span className="truncate font-bold text-cream">
                {usaSeminar.title}
              </span>
              <span className="hidden text-cream/50 sm:inline">
                {usaSeminar.urgency}
              </span>
            </p>

            <a
              href={usaSeminar.registerHref}
              className="shrink-0 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-6 py-2.5 text-sm font-bold text-void transition hover:brightness-110"
            >
              {usaSeminar.cta.sticky}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
