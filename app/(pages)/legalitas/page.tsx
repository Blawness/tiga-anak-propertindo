import { buildMetadata } from "@/lib/meta";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Legalitas",
  description: siteConfig.pages.legal.subtitle,
});

export default function LegalitasPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Legalitas"
        title={siteConfig.pages.legal.title}
        subtitle={siteConfig.pages.legal.subtitle}
      />

      <Section title="Status legalitas" description={siteConfig.pages.legal.documentsNote}>
        <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-[0_18px_32px_-24px_rgba(11,31,58,0.35)]">
          <p className="text-base font-semibold text-brand-dark">
            {siteConfig.legal.status}
          </p>
          <p className="mt-3 text-base text-brand-navy/80">
            {siteConfig.legal.statement}
          </p>
        </div>
      </Section>
    </div>
  );
}

