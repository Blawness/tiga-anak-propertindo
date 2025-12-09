import CTAButton from "./cta-button";
import { FadeIn } from "./motion";

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
    <section className="relative isolate w-full overflow-hidden bg-brand-paper">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_BACKGROUND}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-brand-gradient opacity-70" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/20 to-white/15 backdrop-blur-[1px]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-5 px-6 py-14 md:py-16">
        <FadeIn>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              {eyebrow}
            </p>
          ) : null}
        </FadeIn>
        <FadeIn delay={0.05} className="flex flex-col gap-4 md:max-w-3xl">
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-lg text-white/85">{subtitle}</p>
          ) : null}
        </FadeIn>
        {ctaLabel && ctaHref ? (
          <FadeIn delay={0.1}>
            <CTAButton href={ctaHref}>{ctaLabel}</CTAButton>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}

