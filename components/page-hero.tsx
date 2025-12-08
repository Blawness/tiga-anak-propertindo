import CTAButton from "./cta-button";
import { FadeIn } from "./motion";

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
    <section className="w-full bg-brand-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-14 md:py-16">
        <FadeIn>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {eyebrow}
            </p>
          ) : null}
        </FadeIn>
        <FadeIn delay={0.05} className="flex flex-col gap-4 md:max-w-3xl">
          <h1 className="text-4xl font-semibold text-brand-black md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-lg text-brand-neutral">{subtitle}</p>
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

