import { buildMetadata } from "@/lib/meta";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import ContactSection from "@/components/contact-section";
import OrgStructure from "@/components/org-structure";
import { RevealGroup, RevealItem, ScrollText } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Tentang Kami",
  description: siteConfig.about.currentFocus,
});

export default function AboutPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title="Fondasi tata kelola sebelum eksekusi proyek"
        subtitle={siteConfig.description}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
        image={siteConfig.images.team}
        imageAlt="Ruang keluarga modern dengan dinding kayu dan cahaya alami"
      />

      <SectionWithImage
        index="01"
        eyebrow="Siapa kami"
        title="Disiplin sejak langkah pertama."
        imageSrc={siteConfig.images.meeting}
        imageAlt="Rumah modern bermaterial kayu dan beton"
        imagePosition="right"
      >
        <div className="flex flex-col gap-6">
          {siteConfig.about.overview.map((paragraph) => (
            <p key={paragraph} className="text-lead text-ink/75">
              {paragraph}
            </p>
          ))}
        </div>
      </SectionWithImage>

      <section className="section-y bg-surface text-paper">
        <div className="section-shell">
          <p className="eyebrow mb-10 text-sand-soft">Fokus saat ini</p>
          <ScrollText
            text={siteConfig.about.currentFocus}
            className="max-w-[24ch] font-display text-[clamp(2rem,4.8vw,4.75rem)] font-light leading-[1.06] tracking-[-0.02em]"
          />
        </div>
      </section>

      <Section
        index="02"
        eyebrow="Prinsip"
        title="Prinsip kerja"
        description="Pendekatan operasional yang kami terapkan untuk menjaga akuntabilitas dan kejelasan."
        tone="bone"
      >
        <RevealGroup as="ol" className="grid border-t border-line md:grid-cols-2">
          {siteConfig.about.principles.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              className="flex flex-col gap-4 border-b border-line py-10 md:px-10 md:odd:border-r md:odd:pl-0 md:even:pr-0"
            >
              <span className="eyebrow text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-h3">{item.title}</h3>
              <p className="max-w-[42ch] text-ink/65">{item.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        id="struktur"
        index="03"
        eyebrow="Organisasi"
        title="Struktur perusahaan"
        description="Garis pelaporan yang jelas agar setiap fungsi memiliki penanggung jawab dan akuntabilitas yang tegas."
      >
        <OrgStructure />
      </Section>

      <ContactSection
        index="04"
        title="Kami terbuka untuk diskusi awal dan penjajakan kemitraan."
        note="Silakan jadwalkan percakapan; kami merespons secara terstruktur."
      />
    </>
  );
}
