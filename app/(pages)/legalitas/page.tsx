import { buildMetadata } from "@/lib/meta";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import ContactSection from "@/components/contact-section";
import { RevealGroup, RevealItem } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Legalitas",
  description: siteConfig.pages.legal.subtitle,
});

function StatusDot({ done }: { done: boolean }) {
  return (
    <span aria-hidden className="relative flex h-1.5 w-1.5">
      {done ? null : (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60 motion-reduce:animate-none" />
      )}
      <span
        className={cn(
          "relative inline-flex h-1.5 w-1.5 rounded-full",
          done ? "bg-accent" : "bg-terracotta",
        )}
      />
    </span>
  );
}

export default function LegalitasPage() {
  const { legal } = siteConfig;

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
        eyebrow="Dokumen perusahaan"
        title="Terdaftar dan berizin."
        description={siteConfig.pages.legal.documentsNote}
        imageSrc={siteConfig.images.documents}
        imageAlt="Interior terang dengan dinding kaca"
        imagePosition="right"
      >
        <RevealGroup as="ul" className="border-t border-line">
          {legal.documents.map((doc) => (
            <RevealItem
              as="li"
              key={doc.label}
              className="flex flex-col gap-2 border-b border-line py-6"
            >
              <div className="flex items-center justify-between gap-6">
                <span className="eyebrow text-stone">{doc.label}</span>
                <span className="eyebrow flex items-center gap-2.5 text-accent">
                  <StatusDot done />
                  Terdaftar
                </span>
              </div>
              <span className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight tabular-nums lining-nums">
                {doc.value}
              </span>
              <span className="text-sm text-ink/65">{doc.detail}</span>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 max-w-[44ch] text-ink/65">{legal.statement}</p>
      </SectionWithImage>

      <Section
        index="02"
        eyebrow="Perizinan berusaha"
        title="Bidang usaha (KBLI)"
        description="Klasifikasi usaha yang tercantum dalam lampiran NIB."
        tone="bone"
      >
        <RevealGroup as="ol" className="border-t border-line">
          {legal.kbli.map((item) => (
            <RevealItem
              as="li"
              key={item.code}
              className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light leading-none tabular-nums lining-nums text-accent md:col-span-2">
                {item.code}
              </span>
              <div className="flex flex-col gap-1.5 md:col-span-6">
                <h3 className="text-h3">{item.title}</h3>
                <p className="text-ink/65">{item.scope}</p>
              </div>
              {/* Terracotta fails AA for small text on bone, so in-progress text uses warm brown */}
              <span
                className={cn(
                  "eyebrow flex items-center gap-2.5 md:col-span-4 md:justify-self-end",
                  item.done ? "text-accent" : "text-warm",
                )}
              >
                <StatusDot done={item.done} />
                {item.status}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <ContactSection index="03" />
    </>
  );
}
