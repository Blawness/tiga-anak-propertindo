import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Layanan",
  description: siteConfig.pages.services.subtitle,
});

export default function LayananPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Layanan"
        title={siteConfig.pages.services.title}
        subtitle={siteConfig.pages.services.subtitle}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
      />

      <Section
        title="Pilar layanan"
        description={siteConfig.pages.services.pillarsIntro}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.focusAreas.map((area, index) => (
            <div
              key={area.title}
              className="card-surface flex h-full flex-col gap-4"
            >
              <FadeIn delay={0.05 * index}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-paper text-sm font-semibold text-brand-primary">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-brand-black">
                    {area.title}
                  </h3>
                  <p className="text-base text-brand-neutral">
                    {area.description}
                  </p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Pendekatan operasional"
        description={siteConfig.about.currentFocus}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.about.principles.map((item, index) => (
            <div
              key={item.title}
              className="card-surface flex h-full flex-col gap-4"
            >
              <FadeIn delay={0.05 * index}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-paper text-sm font-semibold text-brand-primary">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-brand-black">
                    {item.title}
                  </h3>
                  <p className="text-base text-brand-neutral">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Kontak"
        description="Diskusi awal membantu memetakan kebutuhan dan prioritas kolaborasi."
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description={siteConfig.pages.contact.availability}
        />
      </Section>
    </div>
  );
}

