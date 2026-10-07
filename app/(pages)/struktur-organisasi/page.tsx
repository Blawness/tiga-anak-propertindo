import { buildMetadata } from "@/lib/meta";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import OrgStructure from "@/components/org-structure";
import ContactSection from "@/components/contact-section";

const DESCRIPTION =
  "Garis pelaporan yang jelas agar setiap fungsi memiliki penanggung jawab dan akuntabilitas yang tegas.";

export const metadata = buildMetadata({
  title: "Struktur Organisasi",
  description: DESCRIPTION,
});

export default function StrukturOrganisasiPage() {
  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title="Struktur organisasi"
        subtitle={DESCRIPTION}
        image={siteConfig.images.meeting}
        imageAlt="Rumah modern bermaterial kayu dan beton"
      />

      <Section index="01" eyebrow="Organisasi" title="Siapa bertanggung jawab atas apa.">
        <OrgStructure />
      </Section>

      <ContactSection index="02" />
    </>
  );
}
