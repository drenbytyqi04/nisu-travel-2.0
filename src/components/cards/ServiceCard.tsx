import {
  ArrowUpRight,
  Bed,
  Briefcase,
  Car,
  Heart,
  Home,
  Plane,
  Route,
  TreePalm,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import type { ImageKey } from "@/data/images";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

const icons: Record<Service["icon"], LucideIcon> = {
  plane: Plane,
  bed: Bed,
  palm: TreePalm,
  car: Car,
  route: Route,
  users: Users,
  family: UsersRound,
  heart: Heart,
  home: Home,
  briefcase: Briefcase,
};

export function ServiceCard({
  service,
  className,
  index,
}: {
  service: Service;
  className?: string;
  index: number;
}) {
  const Icon = icons[service.icon];

  return (
    <Link
      href={`/services#${service.id}`}
      id={service.id}
      className={cn(
        "group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-plate border border-line bg-ink-2 p-7 scroll-mt-28",
        className,
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-60 transition-all duration-[1200ms] ease-out group-hover:scale-[1.06] group-hover:opacity-80">
          <Media
            imageKey={`svc-${service.id}` as ImageKey}
            decorative
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30 transition-colors duration-700 group-hover:from-ink group-hover:via-ink/60"
        />
      </div>

      <div className="relative">
        <div className="mb-auto flex items-center justify-between">
          <span className="flex size-11 items-center justify-center rounded-full border border-line-strong text-jade transition-colors duration-500 group-hover:border-jade group-hover:bg-jade group-hover:text-ink">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.18em] text-paper-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="eyebrow mt-8">{service.label}</p>
        <h3 className="mt-3 font-display text-2xl text-paper transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
          {service.title}
        </h3>
        <p className="pretty mt-3 text-sm leading-relaxed text-paper-dim">
          {service.description}
        </p>

        <span className="mt-5 flex translate-y-2 items-center gap-2 text-sm font-medium text-jade opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          Learn more
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
