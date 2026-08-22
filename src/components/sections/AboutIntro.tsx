import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Container, RouteDivider, Section } from "@/components/ui/section";


const pillars = [
  "Personalised service",
  "Professional travel assistance",
  "Attention to detail",
  "Flexible travel solutions",
  "Customer-focused planning",
  "Support throughout the journey",
];

export function AboutIntro({ full = false }: { full?: boolean }) {
  return (
    <Section id="about" bleed>
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal y={24}>
            <Parallax className="aspect-[4/5] rounded-plate border border-line" distance={30} scale>
              <Media imageKey="about-plate" sizes="(max-width: 1024px) 92vw, 46vw" />
            </Parallax>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-jade" aria-hidden="true" />
                About Nisu Travel
              </p>
            </Reveal>

            <AnimatedText
              text="Travel Starts With Trust."
              className="display-xl text-[clamp(2.25rem,5.5vw,4.25rem)] text-paper"
            />

            <Reveal delay={0.1}>
              <p className="pretty mt-8 text-lg leading-relaxed text-paper-dim">
                Nisu Travel is a travel agency in Prishtina, and Nisu means to
                set off. That is the whole idea: the moment a trip stops being
                an idea and becomes a departure.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="pretty mt-5 text-base leading-relaxed text-paper-dim">
                We are not a booking engine with a phone number attached. We are
                the people who answer when the connection is delayed, who know
                which hotel is worth the extra fifty euro, and who will tell you
                honestly when a week in June is a better idea than a week in
                August.
              </p>
            </Reveal>

            {full && (
              <Reveal delay={0.18}>
                <p className="pretty mt-5 text-base leading-relaxed text-paper-dim">
                  Most of our work is for people travelling from Kosovo and for
                  families in the diaspora moving between here and Germany,
                  Switzerland, Austria and beyond. Those journeys have their own
                  rhythm — the summer weeks, the New Year flights, the trips
                  arranged at short notice for reasons that are not holidays.
                  Knowing that rhythm is most of the job.
                </p>
              </Reveal>
            )}

            <Reveal delay={0.22}>
              <RouteDivider className="mt-10 max-w-sm" />
            </Reveal>

            <Reveal delay={0.26}>
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {pillars.map((pillar) => (
                  <li key={pillar} className="flex items-start gap-3 text-sm text-paper-dim">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-jade" aria-hidden="true" />
                    {pillar}
                  </li>
                ))}
              </ul>
            </Reveal>

            {!full && (
              <Reveal delay={0.3}>
                <div className="mt-10">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/about">
                      More About Us
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
