import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CTAButton from "@/components/cta-button";

export const metadata = buildMetadata({
  title: "Layanan",
  description: siteConfig.pages.services.subtitle,
});

export default function LayananPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Layanan"
        title={siteConfig.pages.services.title}
        subtitle={siteConfig.pages.services.subtitle}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
      />

      {/* Pilar Layanan - with images */}
      <Section
        title="Pilar layanan"
        description={siteConfig.pages.services.pillarsIntro}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.coreServices.map((service, index) => {
            const images = [
              siteConfig.images.property,
              siteConfig.images.legal,
              siteConfig.images.handshake,
              siteConfig.images.collaboration,
            ];
            return (
              <div
                key={service.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <FadeIn delay={0.05 * index} className="flex h-full flex-col">
                  {/* Image */}
                  <div className="relative h-44 shrink-0 overflow-hidden">
                    <Image
                      src={images[index]}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-brand-primary shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="text-base text-slate-600">
                      {service.shortDescription}
                    </p>
                    <div className="mt-auto pt-2">
                      <CTAButton
                        href={`/layanan/${service.slug}`}
                        variant="outline"
                        className="w-full justify-center text-sm"
                      >
                        Selengkapnya
                      </CTAButton>
                    </div>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Pendekatan Operasional - with meeting image */}
      <SectionWithImage
        title="Pendekatan operasional"
        description={siteConfig.about.currentFocus}
        imageSrc={siteConfig.images.meeting}
        imageAlt="Business meeting and planning session"
        imagePosition="left"
      >
        <div className="grid gap-4">
          {siteConfig.about.principles.map((item, index) => (
            <FadeIn key={item.title} delay={0.05 * index}>
              <Card className="flex gap-4 border-slate-200 bg-white/90 p-5">
                <Badge className="h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  {String(index + 1).padStart(2, "0")}
                </Badge>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </SectionWithImage>

      {/* Kontak - with office image */}
      <SectionWithImage
        title="Kontak"
        description="Diskusi awal membantu memetakan kebutuhan dan prioritas kolaborasi."
        imageSrc={siteConfig.images.professional}
        imageAlt="Professional business environment"
        imagePosition="right"
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
