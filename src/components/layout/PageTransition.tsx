"use client";

import {motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionPreference";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** A short cross-fade on route change. Deliberately restrained. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.3 : 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
