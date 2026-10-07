import { siteConfig } from "@/lib/site-config";
import { RevealGroup, RevealItem, ScrollLine } from "@/components/motion";
import SectionHeading from "@/components/section-heading";

export default function RoadmapSection() {
  const { title, subtitle, phases } = siteConfig.roadmap;

  return (
    <section className="section-y bg-bone">
      <div className="section-shell grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading index="03" eyebrow="Roadmap" title={title} description={subtitle} />
          </div>
        </div>

        <ScrollLine className="lg:col-span-6 lg:col-start-7" lineClassName="left-[0.3125rem]">
          <RevealGroup as="ol" className="flex flex-col" stagger={0.15}>
            {phases.map((phase, index) => (
              <RevealItem
                as="li"
                key={phase.title}
                className="relative grid gap-4 pb-16 pl-12 last:pb-0 md:pb-24 md:pl-16"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-3 h-[0.6875rem] w-[0.6875rem] rotate-45 border border-accent bg-bone"
                />
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span aria-hidden className="font-display text-[clamp(3rem,6vw,5.5rem)] font-light leading-none text-ink/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow text-accent">{phase.period}</span>
                  <span className="eyebrow text-stone">· {phase.status}</span>
                </div>
                <h3 className="text-h3">{phase.title}</h3>
                <p className="max-w-[42ch] text-ink/65">{phase.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </ScrollLine>
      </div>
    </section>
  );
}
