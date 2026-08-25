"use client";

import { Sparkles } from "lucide-react";
import { useMotion } from "@/components/motion/MotionPreference";

/**
 * Lets a visitor turn the site's motion on even when their OS asks for less.
 *
 * Windows reports `prefers-reduced-motion: reduce` whenever "Animation
 * effects" is off — a setting people commonly switch off for battery or
 * performance, not because motion bothers them. The OS still decides by
 * default; this only exists so that choice can be overridden per browser.
 */
export function MotionToggle() {
  const { reduced, systemReduced, override, setOverride, ready } = useMotion();

  if (!ready) return null;

  const enabled = !reduced;

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => {
          const next = enabled ? "reduced" : "full";
          // Choosing the same thing the OS asks for goes back to following it.
          setOverride(next === (systemReduced ? "reduced" : "full") ? null : next);
        }}
        className="group inline-flex h-11 cursor-pointer items-center gap-3 rounded-full border border-line px-4 text-xs text-paper-dim transition-colors duration-300 hover:border-jade hover:text-paper"
      >
        <Sparkles className="size-3.5 text-jade" aria-hidden="true" />
        <span>Animations</span>
        <span
          aria-hidden="true"
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-300 ${
            enabled ? "bg-jade" : "bg-ink-4"
          }`}
        >
          <span
            className={`absolute top-0.5 size-4 rounded-full bg-paper transition-transform duration-300 ${
              enabled ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>

      {systemReduced && override === null && (
        <p className="pretty max-w-[15rem] text-xs leading-relaxed text-paper-faint">
          Your system asks for reduced motion, so animations are off. Turn them
          on here if you like.
        </p>
      )}
    </div>
  );
}
