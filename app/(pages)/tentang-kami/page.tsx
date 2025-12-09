import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Tentang Kami",
  description: siteConfig.about.currentFocus,
});

export default function AboutPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Tentang Kami"
        title="Fondasi tata kelola sebelum eksekusi proyek"
        subtitle={siteConfig.description}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
      />

      {/* Siapa Kami - with team image */}
      <SectionWithImage
        title="Siapa kami"
        description={siteConfig.about.currentFocus}
        imageSrc={siteConfig.images.team}
        imageAlt="Professional team collaboration"
        imagePosition="right"
      >
        <div className="flex flex-col gap-4">
          {siteConfig.about.overview.map((paragraph, index) => (
            <FadeIn key={paragraph} delay={0.05 * index}>
              <Card className="border-slate-200 bg-white/90 p-5">
                <p className="text-base text-slate-600">{paragraph}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </SectionWithImage>

      {/* Prinsip Kerja - with images */}
      <Section
        title="Prinsip kerja"
        description="Pendekatan operasional yang kami terapkan untuk menjaga akuntabilitas dan kejelasan."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.about.principles.map((item, index) => {
            const images = [
              siteConfig.images.documents,
              siteConfig.images.legal,
              siteConfig.images.handshake,
              siteConfig.images.planning,
            ];
            return (
              <div
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <FadeIn delay={0.05 * index}>
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={images[index]}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-brand-primary shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2 p-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-base text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Kontak - with image */}
      <SectionWithImage
        title="Kontak"
        description="Kami terbuka untuk diskusi awal dan penjajakan kemitraan."
        imageSrc={siteConfig.images.communication}
        imageAlt="Business communication"
        imagePosition="left"
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description="Silakan jadwalkan percakapan; kami merespons secara terstruktur."
        />
      </SectionWithImage>
    </div>
  );
}
