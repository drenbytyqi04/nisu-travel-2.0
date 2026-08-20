import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-32">
      <Container>
        <div className="max-w-xl">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-jade" aria-hidden="true" />
            404 — off the route
          </p>
          <h1 className="display-xl text-[clamp(2.5rem,7vw,4.5rem)] text-paper">
            This page has already departed.
          </h1>
          <p className="pretty mt-7 text-lg leading-relaxed text-paper-dim">
            The page you were looking for is not here. The destinations,
            however, are all still where we left them.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/destinations">Explore Destinations</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
