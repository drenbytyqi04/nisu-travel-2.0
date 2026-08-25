"use client";

import {motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionPreference";
import { MessagesSquare, PlaneTakeoff, Route, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/section";

/**
 * These numbers are load-bearing: this is a real sequence, and the order
 * carries information. That is the only reason 01/02/03 markers are here.
 */
const steps = [
  {
    n: "01",
    title: "Tell Us Where You Want to Go",
    body: "Your destination, dates and preferences. A rough idea is enough to start — most people begin with less than they think.",
    icon: MessagesSquare,
  },
  {
    n: "02",
    title: "Get Your Personalised Offer",
    body: "We prepare a travel option built around your needs and budget, with the alternatives laid out so you can see what each one changes.",
    icon: Route,
  },
  {
    n: "03",
    title: "We Organise Everything",
    body: "Flights, hotels, transfers and arrangements are handled by Nisu Travel. One booking, one point of contact, no loose ends.",
    icon: Sparkles,
  },
  {
    n: "04",
    title: "Just Nisu",
    body: "Nisu means to set off. Enjoy the journey while we take care of the details — including the ones that come up mid-trip.",
    icon: PlaneTakeoff,
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="how-it-works" className="bg-ink-2/40">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title={"Four Steps, and\nOne of Them Is Packing."}
          intro="No forms to fight, no booking engine. A conversation, an offer, and then it is handled."
        />

        <div ref={ref} className="relative mt-20">
          {/* The connecting line draws itself as the steps come into view. */}
          <div
            aria-hidden="true"
            className="absolute left-[1.4rem] top-2 hidden h-[calc(100%-3rem)] w-px bg-line sm:block"
          >
            <motion.div
              className="h-full w-full origin-top bg-jade"
              style={reduced ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ol className="space-y-14 sm:space-y-20">
            {steps.map((step, i) => (
              <li key={step.n}>
                <Reveal delay={i * 0.04}>
                  <div className="grid gap-6 sm:grid-cols-[3rem_1fr] sm:gap-10">
                    <div className="relative">
                      <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-line bg-ink text-jade">
                        <step.icon className="size-5" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-12">
                      <span className="tnum font-display text-5xl leading-none text-paper/15 lg:text-7xl">
                        {step.n}
                      </span>
                      <div className="max-w-xl">
                        <h3 className="font-display text-2xl text-paper sm:text-3xl">
                          {step.title}
                        </h3>
                        <p className="pretty mt-3 text-base leading-relaxed text-paper-dim">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
