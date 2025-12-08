import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Proyek",
  description: siteConfig.pages.project.subtitle,
});

export default function ProyekPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Proyek"
        title={siteConfig.pages.project.title}
        subtitle={siteConfig.pages.project.subtitle}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
      />

      <Section
        title="Status"
        description="Kami memastikan kesiapan dokumen, tata kelola, dan struktur kemitraan sebelum publikasi proyek."
      >
        <FadeIn className="rounded-2xl border border-brand-black/8 bg-white p-6 shadow-[0_18px_32px_-24px_rgba(25,25,25,0.28)]">
          <p className="text-base font-semibold text-brand-black">
            {siteConfig.pages.project.statusNote}
          </p>
          <p className="mt-3 text-base text-brand-neutral">
            {siteConfig.legal.statement}
          </p>
        </FadeIn>
      </Section>

      <Section
        title="Kontak"
        description="Untuk penjajakan awal atau pertanyaan seputar kesiapan proyek."
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

