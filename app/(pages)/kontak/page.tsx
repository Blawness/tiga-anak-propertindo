import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Kontak",
  description: siteConfig.pages.contact.subtitle,
});

export default function KontakPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Kontak"
        title={siteConfig.pages.contact.title}
        subtitle={siteConfig.pages.contact.subtitle}
        ctaLabel="Email Kami"
        ctaHref={mailto}
      />

      <Section title="Saluran resmi" description={siteConfig.pages.contact.availability}>
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description="Kami merespons secara terjadwal untuk menjaga kualitas diskusi."
        />
      </Section>
    </div>
  );
}

