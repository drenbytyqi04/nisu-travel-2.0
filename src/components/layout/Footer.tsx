import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import {
  contact,
  footerNav,
  locationLine,
  mailLink,
  site,
  socialLinks,
  telLink,
} from "@/content/site.config";

export function Footer() {
  const mail = mailLink("Trip enquiry");
  const tel = telLink();
  const socials = socialLinks();

  return (
    <footer className="relative border-t border-line bg-ink">
      {/* The subtle green divider the brand brief asks for. */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-jade/60 to-transparent" />

      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <p className="font-display text-3xl tracking-tight text-paper">
              NISU TRAVEL
            </p>
            <p className="eyebrow mt-3">{site.tagline}</p>
            <p className="pretty mt-6 max-w-xs text-sm leading-relaxed text-paper-dim">
              A travel agency in Prishtina planning journeys for travellers
              across Kosovo and the Albanian diaspora.
            </p>
            <div className="mt-8">
              <WhatsAppLink size="sm" />
            </div>
          </div>

          <nav aria-label="Explore">
            <h2 className="eyebrow mb-5">Explore</h2>
            <ul className="space-y-3">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-paper-dim transition-colors duration-300 hover:text-jade"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="eyebrow mb-5">Services</h2>
            <ul className="space-y-3">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-paper-dim transition-colors duration-300 hover:text-jade"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5">Contact</h2>
            <ul className="space-y-4 text-sm text-paper-dim">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-jade" aria-hidden="true" />
                <span>{locationLine()}</span>
              </li>
              {tel && (
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-jade" aria-hidden="true" />
                  <a href={tel} className="wrap-anywhere transition-colors hover:text-jade">
                    {contact.phone}
                  </a>
                </li>
              )}
              {mail && (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-jade" aria-hidden="true" />
                  <a href={mail} className="wrap-anywhere transition-colors hover:text-jade">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>

            {socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line px-4 text-xs text-paper-dim transition-colors duration-300 hover:border-jade hover:text-jade"
                    >
                      {s.label}
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-paper-faint">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-paper-faint">
            Prishtina, Kosovo · 42.6629° N, 21.1655° E
          </p>
        </div>
      </div>
    </footer>
  );
}
