import { Media } from "@/components/media/Media";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Container, RouteDivider, Section } from "@/components/ui/section";
import { img } from "@/lib/images";

const big = img("A wide coastline seen from the air in morning light", "aegean", "coast");
const small = img("A quiet hotel terrace before the day begins", "tropic", "tropic");

/**
 * Asymmetric editorial block. The small plate overlaps the large one and
 * moves at a different rate on scroll, which is what makes it read as depth
 * rather than as two images side by side.
 */
export function TravelExperience() {
  return (
    <Section bleed>
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-jade" aria-hidden="true" />
                The Nisu approach
              </p>
            </Reveal>

            <AnimatedText
              text={"Travel More.\nWorry Less."}
              className="display-xl text-[clamp(2.5rem,6.5vw,5rem)] text-paper"
            />

            <Reveal delay={0.1}>
              <p className="pretty mt-8 max-w-lg text-lg leading-relaxed text-paper-dim">
                Nisu Travel makes travel simple. From finding the right flight
                and hotel to organising complete holiday experiences, we take
                care of the details so you can focus on enjoying the journey.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <RouteDivider className="mt-10 max-w-sm" />
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-8 gap-y-7">
                {[
                  { term: "One point of contact", desc: "The same person from first message to final landing." },
                  { term: "Answers in minutes", desc: "Including while you are already travelling." },
                  { term: "Booked from experience", desc: "Hotels we know, not listings we found." },
                  { term: "Nothing hidden", desc: "You see the options and what each one costs." },
                ].map((item) => (
                  <div key={item.term}>
                    <dt className="text-sm font-medium text-paper">{item.term}</dt>
                    <dd className="pretty mt-1.5 text-sm leading-relaxed text-paper-dim">
                      {item.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="relative order-1 lg:order-2">
            <Reveal y={28}>
              <Parallax
                className="aspect-[4/5] w-full rounded-plate border border-line sm:aspect-[3/4]"
                distance={34}
                scale
              >
                <Media image={big} artKey="experience-primary" sizes="(max-width: 1024px) 92vw, 46vw" />
              </Parallax>
            </Reveal>

            {/* Overlapping plate — pulled outside the grid on the left. */}
            <Reveal delay={0.18} y={34}>
              <div className="absolute -bottom-10 -left-6 w-[46%] max-w-[16rem] sm:-left-10 lg:-left-16">
                <Parallax
                  className="aspect-square rounded-card border border-line-strong shadow-[0_24px_70px_-20px_rgba(0,0,0,0.8)]"
                  distance={-26}
                >
                  <Media image={small} artKey="experience-secondary" sizes="240px" />
                </Parallax>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="absolute -right-2 top-8 hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-faint [writing-mode:vertical-rl] lg:block">
                42.6629° N · 21.1655° E · Prishtina
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
