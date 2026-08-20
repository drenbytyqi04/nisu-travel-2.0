"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * First-visit departure sequence. Shows once per session — a loading screen
 * on every navigation is an obstacle, not an experience.
 */
export function LoadingScreen() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem("nisu:arrived")) return;
    setVisible(true);
    document.documentElement.style.overflow = "hidden";
    const timer = setTimeout(() => {
      sessionStorage.setItem("nisu:arrived", "1");
      setVisible(false);
      document.documentElement.style.overflow = "";
    }, 1900);
    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] } }}
          aria-hidden="true"
        >
          <div className="w-full max-w-md px-8 text-center">
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Nisu Travel
            </motion.p>
            <motion.p
              className="display-xl text-3xl text-paper"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Preparing your departure
            </motion.p>
            {/* The line draws like a route between two points. */}
            <div className="relative mx-auto mt-10 h-px w-full max-w-xs bg-line">
              <motion.div
                className="absolute inset-y-0 left-0 bg-jade"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
