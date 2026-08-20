"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappLink, whatsappMessage } from "@/content/site.config";

/** Appears once the hero is behind you. Hidden on small screens — the sticky bar covers those. */
export function FloatingWhatsApp() {
  const href = whatsappLink(whatsappMessage);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!href) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-7 right-7 z-50 hidden size-14 items-center justify-center rounded-full bg-jade text-ink shadow-[0_12px_40px_-8px_rgba(93,187,99,0.55)] transition-transform duration-300 hover:scale-105 md:flex"
        >
          <MessageCircle className="size-6" aria-hidden="true" />
          <span className="sr-only">Message Nisu Travel on WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
