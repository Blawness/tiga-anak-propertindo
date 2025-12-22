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
  size?: 'default' | 'large';
};

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  ctaLabel,
  ctaHref,
  size = 'default',
}: PageHeroProps) {
  const isLarge = size === 'large';

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_BACKGROUND}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40" />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 20%, rgba(111,55,21,0.16), transparent 35%)`
        }}
        aria-hidden
      />

      <div className={`section-shell relative flex flex-col gap-6 ${isLarge
        ? "py-24 md:py-32 lg:py-48 min-h-[60vh] justify-center"
        : "py-16 md:py-20 lg:py-24"
        }`}>
        <FadeIn className={`flex flex-col gap-3 ${isLarge ? "md:max-w-4xl" : "md:max-w-3xl"}`}>
          {eyebrow ? (
            <Badge className="self-start bg-white/15 text-white ring-1 ring-white/15">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className={`font-heading font-semibold leading-tight !text-white ${isLarge
            ? "text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
            : "text-4xl md:text-5xl lg:text-6xl"
            }`}>
            {title}
          </h1>
          {subtitle ? (
            <p className={`text-white/80 ${isLarge
              ? "text-lg md:text-xl lg:text-2xl max-w-2xl"
              : "text-base md:text-lg"
              }`}>{subtitle}</p>
          ) : null}
        </FadeIn>
        {ctaLabel && ctaHref ? (
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-4">
              <CTAButton href={ctaHref} size={isLarge ? "lg" : "md"}>
                {ctaLabel}
              </CTAButton>
            </div>
          </FadeIn>
        ) : null}

      </div>

      {isLarge && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 transition-opacity hover:opacity-100">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />

    </section>
  );
}


