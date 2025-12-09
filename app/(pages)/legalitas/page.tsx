import { buildMetadata } from "@/lib/meta";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";

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
        <FadeIn className="card-surface">
          <p className="text-base font-semibold text-brand-black">
            {siteConfig.legal.status}
          </p>
          <p className="mt-3 text-base text-brand-neutral">
            {siteConfig.legal.statement}
          </p>
        </FadeIn>
      </Section>
    </div>
  );
}

