"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Reveal-on-scroll that cannot strand content.
 *
 * `whileInView` alone has a failure mode: if the visitor arrives already past
 * an element — an anchor link, a restored scroll position, End, or a jump
 * from a pinned section — the observer reports "not intersecting" and the
 * element stays at its hidden opacity forever.
 *
 * So this checks position on mount first: anything at or above the fold is
 * shown immediately, and only genuinely-below-the-fold elements wait for the
 * observer.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible, or already scrolled past.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return shown;
}
