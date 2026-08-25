"use client";

import {motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/MotionPreference";
import { cn } from "@/lib/utils";

/**
 * Background-layer parallax only — never wraps body copy or controls.
 * Collapses to a static layer under reduced motion.
 */
export function Parallax({
  children,
  className,
  distance = 60,
  scale,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-[-12%]"
        style={reduced ? undefined : { y, scale: scale ? s : 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
