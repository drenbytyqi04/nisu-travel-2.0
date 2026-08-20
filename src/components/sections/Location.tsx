import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import {
  contact,
  locationLine,
  mailLink,
  socialLinks,
  telLink,
} from "@/content/site.config";

/**
 * Split-screen contact block.
 *
 * Every channel is conditional: nothing renders for a value that has not been
 * filled in in site.config.ts, so the page never shows a dead link.
 */
export function Location() {
  const tel = telLink();
  const mail = mailLink("Trip enquiry");
  const socials = socialLinks();

  return (
    <Section id="location" className="bg-ink-2/40">
      <Container>
        <SectionHeading
          eyebrow="Find us"
          title="Let's Plan Your Next Journey."
          intro="Message us, call us, or come in. Whichever is easiest — the answer is the same person either way."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-plate border border-line bg-ink p-8 sm:p-10">
              <div>
                <p className="font-display text-3xl text-paper">Nisu Travel</p>
                <p className="mt-2 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-jade">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {locationLine()}
                </p>

                <ul className="mt-9 space-y-5">
                  {tel && (
                    <li className="flex items-start gap-4">
                      <Phone className="mt-0.5 size-4 shrink-0 text-jade" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-xs text-paper-faint">Phone</p>
                        <a href={tel} className="wrap-anywhere text-base text-paper hover:text-jade">
                          {contact.phone}
                        </a>
                      </div>
                    </li>
                  )}
                  {mail && (
                    <li className="flex items-start gap-4">
                      <Mail className="mt-0.5 size-4 shrink-0 text-jade" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-xs text-paper-faint">Email</p>
                        <a href={mail} className="wrap-anywhere text-base text-paper hover:text-jade">
                          {contact.email}
                        </a>
                      </div>
                    </li>
                  )}
                  <li className="flex items-start gap-4">
                    <MessageCircle className="mt-0.5 size-4 shrink-0 text-jade" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs text-paper-faint">WhatsApp</p>
                      <p className="text-base text-paper">
                        {contact.whatsapp
                          ? "The fastest way to reach us"
                          : "Add a number in site.config.ts to switch this on"}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <WhatsAppLink />
                {contact.mapsUrl && (
                  <Button asChild variant="outline">
                    <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                      Get Directions
                      <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {socials.map((s) => (
                  <Button asChild variant="ghost" key={s.key}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                      <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full min-h-[24rem] overflow-hidden rounded-plate border border-line bg-ink">
              {contact.mapsEmbedUrl ? (
                <iframe
                  src={contact.mapsEmbedUrl}
                  title="Nisu Travel location on Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0 grayscale-[0.4] contrast-125"
                />
              ) : (
                /* Placeholder, clearly labelled — not a fake map. */
                <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[repeating-linear-gradient(90deg,var(--color-line)_0_1px,transparent_1px_64px),repeating-linear-gradient(0deg,var(--color-line)_0_1px,transparent_1px_64px)] opacity-60"
                  />
                  <span className="relative flex size-14 items-center justify-center rounded-full border border-jade/40 bg-jade/10 text-jade">
                    <MapPin className="size-6" aria-hidden="true" />
                  </span>
                  <p className="relative font-display text-2xl text-paper">
                    Prishtina, Kosovo
                  </p>
                  <p className="pretty relative max-w-xs text-sm leading-relaxed text-paper-dim">
                    Map placeholder. Add{" "}
                    <code className="wrap-anywhere font-mono text-xs text-jade">
                      contact.mapsEmbedUrl
                    </code>{" "}
                    in site.config.ts and the live map replaces this panel.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
