import { Counter } from "@/components/motion/Counter";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/section";
import { stats } from "@/content/site.config";

/**
 * Values come from `stats` in site.config.ts. Set `enabled: false` there and
 * the section disappears rather than publishing numbers you cannot support.
 */
export function Stats() {
  if (!stats.enabled) return null;

  return (
    <Section className="border-y border-line bg-ink-2/60 !py-20">
      <Container>
        <Stagger as="ul" className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.items.map((item) => (
            <StaggerItem as="li" key={item.label}>
              <p className="font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-none text-paper">
                <Counter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-faint">
                {item.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
