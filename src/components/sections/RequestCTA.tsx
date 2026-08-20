"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Media } from "@/components/media/Media";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { img } from "@/lib/images";

const ctaArt = img("A runway at first light before departure", "jade", "aerial");

/** The climax CTA. Full screen, one decision. */
export function RequestCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="grain vignette relative isolate flex min-h-[90vh] items-center overflow-hidden py-28"
    >
      <motion.div className="absolute inset-[-12%] -z-10" style={reduced ? undefined : { y }}>
        <Media image={ctaArt} artKey="cta-runway" decorative sizes="100vw" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-8">Nisu — to set off</p>
          </Reveal>

          <AnimatedText
            text="Ready to Nisu?"
            className="display-xl text-[clamp(3rem,10vw,7.5rem)] text-paper"
          />

          <Reveal delay={0.12}>
            <p className="pretty mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper-dim sm:text-xl">
              Tell us where you want to go. We&rsquo;ll help you plan the rest.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/request">
                    Request a Trip
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </Button>
              </Magnetic>
              <WhatsAppLink size="lg" variant="outline" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
