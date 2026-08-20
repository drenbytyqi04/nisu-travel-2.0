import Link from "next/link";
import { Media } from "@/components/media/Media";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/section";
import type { ImageRef } from "@/lib/images";

/** Inner-page masthead. Shorter than the home hero, same grammar. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  artKey,
  breadcrumb,
  meta,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: ImageRef;
  artKey: string;
  breadcrumb?: { label: string; href: string }[];
  meta?: string;
}) {
  return (
    <section className="grain relative isolate flex min-h-[64vh] items-end overflow-hidden pb-16 pt-40 sm:min-h-[72vh] sm:pb-20">
      <div className="absolute inset-0 -z-10">
        <Media image={image} artKey={artKey} priority decorative sizes="100vw" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/35"
      />

      <Container>
        {breadcrumb && breadcrumb.length > 0 && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper-faint">
                {breadcrumb.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    <Link href={crumb.href} className="transition-colors hover:text-jade">
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <Reveal>
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-block h-px w-8 bg-jade" aria-hidden="true" />
            {eyebrow}
            {meta && (
              <>
                <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                <span className="tnum">{meta}</span>
              </>
            )}
          </p>
        </Reveal>

        <AnimatedText
          as="h1"
          text={title}
          className="display-xl mt-6 max-w-4xl text-[clamp(2.5rem,8vw,6rem)] text-paper"
        />

        {intro && (
          <Reveal delay={0.12}>
            <p className="pretty mt-7 max-w-2xl text-lg leading-relaxed text-paper-dim">
              {intro}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
