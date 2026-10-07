import { buildMetadata } from "@/lib/meta";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/page-hero";
import ContactSection from "@/components/contact-section";
import CtaBand from "@/components/cta-band";

export const metadata = buildMetadata({
  title: "Kontak",
  description: siteConfig.pages.contact.subtitle,
});

export default function KontakPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <>
      <PageHero
        eyebrow="Kontak"
        title={siteConfig.pages.contact.title}
        subtitle={siteConfig.pages.contact.subtitle}
        ctaLabel="Email Kami"
        ctaHref={mailto}
        image={siteConfig.images.office}
        imageAlt="Ruang kerja berdinding kaca dengan meja panjang"
      />

      <ContactSection
        index="01"
        description={siteConfig.pages.contact.availability}
        note="Kami merespons secara terjadwal untuk menjaga kualitas diskusi."
      />

      <CtaBand
        eyebrow="Komitmen"
        title="Membangun kepercayaan bersama"
        description="Kami berkomitmen memberikan respons yang berkualitas untuk setiap pertanyaan dan diskusi Anda."
        ctaLabel="Email Kami"
        ctaHref={mailto}
        image={siteConfig.images.property}
      />
    </>
  );
}
