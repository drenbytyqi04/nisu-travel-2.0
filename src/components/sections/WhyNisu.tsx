import {
  BadgeCheck,
  Compass,
  Handshake,
  LifeBuoy,
  ScrollText,
  UserRound,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/section";

const reasons = [
  {
    title: "Personal Service",
    body: "Every journey is planned around you — not assembled from whatever the system returns first.",
    icon: UserRound,
  },
  {
    title: "Transparent Offers",
    body: "Clear travel options without unnecessary complexity. You see what you are choosing between.",
    icon: ScrollText,
  },
  {
    title: "Travel Support",
    body: "Support before and during your journey. A delayed connection at midnight is still our problem.",
    icon: LifeBuoy,
  },
  {
    title: "Carefully Selected Options",
    body: "We help you find flights, hotels and experiences that match your needs, from places we actually know.",
    icon: Compass,
  },
  {
    title: "Stress-Free Travel",
    body: "You enjoy the journey. We handle the details — including the ones you had not thought of.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted Partner",
    body: "A reliable travel partner for individuals, families and groups, booking after booking.",
    icon: Handshake,
  },
];

export function WhyNisu() {
  return (
    <Section id="why">
      <Container>
        <SectionHeading
          eyebrow="Why Nisu"
          title="Why Travel With Nisu?"
          intro="Booking a flight is easy. Knowing which flight, which hotel and which week is the part people come to us for."
        />

        <Stagger className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="group border-t border-line pt-7 transition-colors duration-500 hover:border-jade">
                <reason.icon
                  className="size-6 text-jade transition-transform duration-500 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-display text-xl text-paper">
                  {reason.title}
                </h3>
                <p className="pretty mt-3 text-sm leading-relaxed text-paper-dim">
                  {reason.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
