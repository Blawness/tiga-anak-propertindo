import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import SectionWithImage from "@/components/section-with-image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

      {/* Status Section - with blueprint image */}
      <SectionWithImage
        title="Status"
        description="Kami memastikan kesiapan dokumen, tata kelola, dan struktur kemitraan sebelum publikasi proyek."
        imageSrc={siteConfig.images.blueprint}
        imageAlt="Architectural blueprint and project planning"
        imagePosition="right"
      >
        <FadeIn>
          <Card className="overflow-hidden border-slate-200">
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-primary/8 to-brand-primary/4">
              <Image
                src={siteConfig.images.construction}
                alt="Construction site"
                fill
                className="object-cover opacity-30"
                sizes="100vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/85 shadow">
                  <svg
                    className="h-8 w-8 text-brand-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <Badge>Coming Soon</Badge>
              </div>
            </div>
            <div className="p-6">
              <p className="text-base font-semibold text-slate-900">
                {siteConfig.pages.project.statusNote}
              </p>
              <p className="mt-3 text-base text-slate-600">
                {siteConfig.legal.statement}
              </p>
            </div>
          </Card>
        </FadeIn>
      </SectionWithImage>

      {/* Kontak - with image */}
      <SectionWithImage
        title="Kontak"
        description="Untuk penjajakan awal atau pertanyaan seputar kesiapan proyek."
        imageSrc={siteConfig.images.collaboration}
        imageAlt="Business collaboration"
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
