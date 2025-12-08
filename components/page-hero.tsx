import CTAButton from "./cta-button";

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
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-14 md:py-16">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex flex-col gap-4 md:max-w-3xl">
          <h1 className="text-4xl font-semibold text-brand-dark md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-lg text-brand-navy/80">{subtitle}</p>
          ) : null}
        </div>
        {ctaLabel && ctaHref ? (
          <CTAButton href={ctaHref}>{ctaLabel}</CTAButton>
        ) : null}
      </div>
    </section>
  );
}

