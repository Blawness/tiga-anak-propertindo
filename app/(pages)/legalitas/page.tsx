import { buildMetadata } from "@/lib/meta";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/page-hero";
import SectionWithImage from "@/components/section-with-image";
import ContactSection from "@/components/contact-section";
import { RevealGroup, RevealItem } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Legalitas",
  description: siteConfig.pages.legal.subtitle,
});

const DOCUMENTS = ["Akta Pendirian", "NPWP Perusahaan", "NIB & OSS", "Domisili Usaha"];

export default function LegalitasPage() {
  return (
    <>
      <PageHero
        eyebrow="Legalitas"
        title={siteConfig.pages.legal.title}
        subtitle={siteConfig.pages.legal.subtitle}
        image={siteConfig.images.legal}
        imageAlt="Arsitektur putih bersudut tegas di bawah langit cerah"
      />

      <SectionWithImage
        index="01"
        eyebrow="Status legalitas"
        title="Dalam proses finalisasi."
        description={siteConfig.pages.legal.documentsNote}
        imageSrc={siteConfig.images.documents}
        imageAlt="Interior terang dengan dinding kaca"
        imagePosition="right"
      >
        <div className="flex flex-col gap-4">
          <p className="text-h3">{siteConfig.legal.status}</p>
          <p className="max-w-[44ch] text-ink/65">{siteConfig.legal.statement}</p>
        </div>

        <RevealGroup as="ul" className="mt-12 border-t border-line">
          {DOCUMENTS.map((label) => (
            <RevealItem
              as="li"
              key={label}
              className="flex items-center justify-between gap-6 border-b border-line py-5"
            >
              <span className="font-display text-2xl">{label}</span>
              <span className="eyebrow flex items-center gap-2.5 text-accent">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terracotta" />
                </span>
                Dalam proses
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionWithImage>

      <ContactSection index="02" />
    </>
  );
}
