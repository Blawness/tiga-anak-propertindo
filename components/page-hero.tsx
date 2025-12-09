import CTAButton from "./cta-button";
import { FadeIn } from "./motion";
import { Badge } from "./ui/badge";

const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_BACKGROUND}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(111,55,21,0.16),transparent_35%)]" />

      <div className="section-shell relative flex flex-col gap-6 py-16 md:py-20 lg:py-24">
        <FadeIn className="flex flex-col gap-3 md:max-w-3xl">
          {eyebrow ? (
            <Badge className="self-start bg-white/15 text-white ring-1 ring-white/15">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className="font-heading text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-base text-white/80 md:text-lg">{subtitle}</p>
          ) : null}
        </FadeIn>
        {ctaLabel && ctaHref ? (
          <FadeIn delay={0.05}>
            <CTAButton href={ctaHref} variant="secondary">
              {ctaLabel}
            </CTAButton>
          </FadeIn>
        ) : null}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
    </section>
  );
}

