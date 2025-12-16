import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import SectionWithImage from "@/components/section-with-image";
import { siteConfig } from "@/lib/site-config";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: siteConfig.pages.article.title,
  description: siteConfig.pages.article.subtitle,
});

export default function ArtikelPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Artikel"
        title={siteConfig.pages.article.title}
        subtitle={siteConfig.pages.article.subtitle}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
      />

      <SectionWithImage
        title={siteConfig.pages.article.statusTitle}
        description={siteConfig.pages.article.statusNote}
        imageSrc={siteConfig.images.communication}
        imageAlt="Perencanaan konten dan diskusi editorial"
        imagePosition="right"
      >
        <Card className="flex flex-col gap-4 border-slate-200 bg-white/90 p-6 shadow-sm">
          <Badge className="w-fit bg-brand-primary/10 text-brand-primary">
            Coming Soon
          </Badge>
          <p className="text-base font-semibold text-slate-900">
            {siteConfig.pages.article.contentNote}
          </p>
          <p className="text-base text-slate-600">
            {siteConfig.pages.article.nextStepNote}
          </p>
        </Card>
      </SectionWithImage>

      <SectionWithImage
        title="Kontak"
        description={siteConfig.pages.article.contactNote}
        imageSrc={siteConfig.images.office}
        imageAlt="Diskusi kebutuhan konten dan komunikasi"
        imagePosition="left"
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description={siteConfig.pages.contact.availability}
        />
      </SectionWithImage>
    </div>
  );
}



