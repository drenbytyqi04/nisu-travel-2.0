"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappLink, whatsappMessage } from "@/content/site.config";

/**
 * Mobile conversion bar. Sits above the gesture area via safe-area padding
 * and only appears after the hero, so it never covers the first screen.
 */
export function StickyMobileCTA() {
  const href = whatsappLink(whatsappMessage);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t px-4 pt-3 md:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <Link
            href="/request"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-jade text-sm font-medium text-ink"
          >
            Request a Trip
          </Link>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-jade/40 bg-jade/10 px-5 text-sm font-medium text-jade"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
