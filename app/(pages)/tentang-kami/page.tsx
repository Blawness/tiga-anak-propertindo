import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Tentang Kami",
  description: siteConfig.about.currentFocus,
});

export default function AboutPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Tentang Kami"
        title="Fondasi tata kelola sebelum eksekusi proyek"
        subtitle={siteConfig.description}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
      />

      <Section title="Siapa kami" description={siteConfig.about.currentFocus}>
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.about.overview.map((paragraph, index) => (
            <div
              key={paragraph}
              className="card-surface"
            >
              <FadeIn delay={0.05 * index}>
                <p className="text-base text-brand-neutral">{paragraph}</p>
              </FadeIn>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Prinsip kerja"
        description="Pendekatan operasional yang kami terapkan untuk menjaga akuntabilitas dan kejelasan."
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
        description="Kami terbuka untuk diskusi awal dan penjajakan kemitraan."
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description="Silakan jadwalkan percakapan; kami merespons secara terstruktur."
        />
      </Section>
    </div>
  );
}

