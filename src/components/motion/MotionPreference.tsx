"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Mode = "full" | "reduced";

type MotionState = {
  /** True when large movement (parallax, travel, zoom, pinning) must be avoided. */
  reduced: boolean;
  /** What the operating system asks for. */
  systemReduced: boolean;
  /** Explicit visitor override, or null to follow the system. */
  override: Mode | null;
  setOverride: (mode: Mode | null) => void;
  /** True once the real preference has been read, one effect after mount. */
  ready: boolean;
};

const MotionContext = createContext<MotionState>({
  reduced: false,
  systemReduced: false,
  override: null,
  setOverride: () => {},
  ready: false,
});

const STORAGE_KEY = "nisu:motion";

/**
 * Motion preference, with an override.
 *
 * The operating system decides by default — a visitor who asked for less
 * motion gets less motion. But an OS-level setting is a blunt instrument:
 * Windows turns `prefers-reduced-motion` on whenever "Animation effects" is
 * off, which many people switch off for battery or performance rather than
 * for motion sensitivity. So the footer offers an explicit override, stored
 * per browser.
 *
 * State starts as `reduced` on both server and first client render, so
 * markup matches and nothing animates mid-hydration. The real preference is
 * applied one effect later.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(false);
  const [override, setOverrideState] = useState<Mode | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(query.matches);
    sync();
    query.addEventListener("change", sync);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "full" || stored === "reduced") setOverrideState(stored);
    } catch {
      // Private mode or blocked storage — fall back to the system preference.
    }

    setReady(true);
    return () => query.removeEventListener("change", sync);
  }, []);

  const setOverride = (mode: Mode | null) => {
    setOverrideState(mode);
    try {
      if (mode) localStorage.setItem(STORAGE_KEY, mode);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Non-fatal: the choice simply will not persist.
    }
  };

  // Before the preference is known we assume full motion, so the server and
  // the first client render produce identical markup. Every mode-dependent
  // animation targets the same final state in both modes, so flipping to
  // reduced mid-entrance still lands correctly — it just stops travelling.
  const reduced = ready && (override ? override === "reduced" : systemReduced);

  // Mirror the effective mode onto <html> so the CSS rules below can follow
  // the override too, not just the raw media query.
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [ready, reduced]);

  return (
    <MotionContext.Provider
      value={{ reduced, systemReduced, override, setOverride, ready }}
    >
      {children}
    </MotionContext.Provider>
  );
}

/**
 * Replaces framer-motion's `useReducedMotion` throughout the app so the
 * override is honoured everywhere, including GSAP and Lenis.
 */
export function useMotion() {
  return useContext(MotionContext);
}

/** Convenience: true when large movement should be avoided. */
export function useReducedMotion() {
  return useContext(MotionContext).reduced;
}
