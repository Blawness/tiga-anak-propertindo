import CTAButton from "./cta-button";
import { ParallaxImage, Reveal, ScrollScale, SplitText } from "./motion";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt?: string;
};

/** Full-bleed image band that opens up on scroll, with a centred call to action. */
export default function CtaBand({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  image,
  imageAlt = "",
}: CtaBandProps) {
  return (
    <section className="overflow-hidden bg-paper py-[clamp(1.25rem,3vw,2.5rem)]">
      <ScrollScale from={0.88}>
        <div className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden text-paper h-[88svh]">
          <div className="absolute inset-0 -z-10">
            <ParallaxImage
              src={image}
              alt={imageAlt}
              sizes="100vw"
              className="h-full w-full"
              strength={12}
              reveal={false}
            />
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60" />

          <div className="section-shell flex flex-col items-center gap-8 text-center">
            {eyebrow ? (
              <Reveal y={12}>
                <p className="eyebrow flex items-center gap-4 text-sand">
                  <span aria-hidden className="h-px w-10 bg-current" />
                  {eyebrow}
                  <span aria-hidden className="h-px w-10 bg-current" />
                </p>
              </Reveal>
            ) : null}
            <SplitText text={title} className="text-h1 max-w-[16ch]" />
            {description ? (
              <Reveal delay={0.25} y={20}>
                <p className="text-lead max-w-[48ch] text-paper/75">{description}</p>
              </Reveal>
            ) : null}
            <Reveal delay={0.4} y={20}>
              <CTAButton href={ctaHref} variant="light" size="lg">
                {ctaLabel}
              </CTAButton>
            </Reveal>
          </div>
        </div>
      </ScrollScale>
    </section>
  );
}
