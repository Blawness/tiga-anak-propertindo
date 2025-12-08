import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import { siteConfig } from "@/lib/site-config";

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
          {siteConfig.focusAreas.map((area) => (
            <div
              key={area.title}
              className="flex h-full flex-col gap-3 rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-[0_18px_32px_-24px_rgba(11,31,58,0.35)]"
            >
              <h3 className="text-xl font-semibold text-brand-dark">
                {area.title}
              </h3>
              <p className="text-base text-brand-navy/80">{area.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Pendekatan operasional"
        description={siteConfig.about.currentFocus}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.about.principles.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col gap-3 rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-[0_18px_32px_-24px_rgba(11,31,58,0.35)]"
            >
              <h3 className="text-xl font-semibold text-brand-dark">
                {item.title}
              </h3>
              <p className="text-base text-brand-navy/80">{item.description}</p>
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

