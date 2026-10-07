import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import CTAButton from "./cta-button";
import HeroShell from "./hero-shell";
import { Reveal, SplitText } from "./motion";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  size?: "default" | "large";
  image?: string;
  imageAlt?: string;
};

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  ctaLabel,
  ctaHref,
  size = "default",
  image = siteConfig.images.hero,
  imageAlt = "",
}: PageHeroProps) {
  const isLarge = size === "large";

  return (
    <HeroShell
      image={image}
      imageAlt={imageAlt}
      className={isLarge ? "h-[100svh] min-h-[640px]" : "h-[78svh] min-h-[560px]"}
    >
      <div className="section-shell flex h-full flex-col justify-end pb-14 pt-32 md:pb-20">
        {eyebrow ? (
          <Reveal delay={0.1} y={16} className="mb-8 md:mb-10">
            <span className="eyebrow flex items-center gap-3 text-paper/80">
              <span aria-hidden className="h-px w-10 bg-bronze" />
              {eyebrow}
            </span>
          </Reveal>
        ) : null}

        <SplitText
          as="h1"
          text={title}
          trigger="mount"
          delay={0.25}
          stagger={0.07}
          className={cn(
            "max-w-[16ch] text-paper",
            isLarge ? "text-display" : "text-h1",
          )}
        />

        {subtitle || (ctaLabel && ctaHref) ? (
          <div className="mt-10 grid gap-8 border-t border-line-light pt-8 md:mt-14 md:grid-cols-12 md:items-end">
            {subtitle ? (
              <Reveal delay={0.7} y={20} className="md:col-span-6 lg:col-span-5">
                <p className="text-lead text-paper/75">{subtitle}</p>
              </Reveal>
            ) : null}
            {ctaLabel && ctaHref ? (
              <Reveal
                delay={0.85}
                y={20}
                className="md:col-span-4 md:col-start-9 md:justify-self-end"
              >
                <CTAButton href={ctaHref} variant="light" size={isLarge ? "lg" : "md"}>
                  {ctaLabel}
                </CTAButton>
              </Reveal>
            ) : null}
          </div>
        ) : null}

        {isLarge ? (
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-[clamp(1.25rem,4vw,3rem)] hidden h-24 w-px overflow-hidden bg-line-light md:block"
          >
            <span className="block h-full w-full origin-top animate-[scroll-cue_2.4s_var(--ease-luxe)_infinite] bg-paper" />
          </div>
        ) : null}
      </div>
    </HeroShell>
  );
}
