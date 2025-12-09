import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Fokus Usaha",
  description: siteConfig.pages.focus.subtitle,
});

export default function FokusUsahaPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Fokus Usaha"
        title={siteConfig.pages.focus.title}
        subtitle={siteConfig.pages.focus.subtitle}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
      />

      <Section
        title="Pilar fokus"
        description={siteConfig.pages.focus.pillarsIntro}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.focusAreas.map((area, index) => (
            <div
              key={area.title}
              className="card-surface flex h-full flex-col gap-3"
            >
              <FadeIn delay={0.05 * index}>
                <h3 className="text-xl font-semibold text-brand-black">
                  {area.title}
                </h3>
                <p className="text-base text-brand-neutral">
                  {area.description}
                </p>
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
              className="card-surface flex h-full flex-col gap-3"
            >
              <FadeIn delay={0.05 * index}>
                <h3 className="text-xl font-semibold text-brand-black">
                  {item.title}
                </h3>
                <p className="text-base text-brand-neutral">
                  {item.description}
                </p>
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

