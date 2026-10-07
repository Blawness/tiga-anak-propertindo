import { buildMetadata } from "@/lib/meta";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/page-hero";
import SectionWithImage from "@/components/section-with-image";
import ContactSection from "@/components/contact-section";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "Proyek",
  description: siteConfig.pages.project.subtitle,
});

export default function ProyekPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <>
      <PageHero
        eyebrow="Proyek"
        title={siteConfig.pages.project.title}
        subtitle={siteConfig.pages.project.subtitle}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
        image={siteConfig.images.construction}
        imageAlt="Fasad rumah modern dengan panel kayu"
      />

      <SectionWithImage
        index="01"
        eyebrow="Status"
        title="Segera diumumkan."
        description="Kami memastikan kesiapan dokumen, tata kelola, dan struktur kemitraan sebelum publikasi proyek."
        imageSrc={siteConfig.images.blueprint}
        imageAlt="Hunian putih dengan kolam renang"
        imagePosition="right"
      >
        <div className="flex flex-col gap-6 border-t border-line pt-8">
          <Badge>Coming soon</Badge>
          <p className="text-h3">{siteConfig.pages.project.statusNote}</p>
          <p className="max-w-[44ch] text-ink/65">{siteConfig.legal.statement}</p>
        </div>
      </SectionWithImage>

      <ContactSection
        index="02"
        title="Untuk penjajakan awal atau pertanyaan seputar kesiapan proyek."
        note={siteConfig.pages.contact.availability}
      />
    </>
  );
}
