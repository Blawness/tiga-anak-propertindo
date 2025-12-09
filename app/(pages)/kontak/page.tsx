import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import SectionWithImage from "@/components/section-with-image";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "Kontak",
  description: siteConfig.pages.contact.subtitle,
});

export default function KontakPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Kontak"
        title={siteConfig.pages.contact.title}
        subtitle={siteConfig.pages.contact.subtitle}
        ctaLabel="Email Kami"
        ctaHref={mailto}
      />

      {/* Saluran Resmi - with office image */}
      <SectionWithImage
        title="Saluran resmi"
        description={siteConfig.pages.contact.availability}
        imageSrc={siteConfig.images.office}
        imageAlt="Modern office workspace"
        imagePosition="right"
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description="Kami merespons secara terjadwal untuk menjaga kualitas diskusi."
        />
      </SectionWithImage>

      {/* Additional visual element - Location/Office vibe */}
      <section className="py-12 md:py-16">
        <div className="section-shell">
          <Card className="relative overflow-hidden border-slate-200">
            <div className="relative h-64 md:h-80">
              <Image
                src={siteConfig.images.property}
                alt="Property development"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
              <Badge className="mb-3 bg-white/20 text-white ring-0">Komitmen</Badge>
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                Membangun Kepercayaan Bersama
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/80 md:text-base">
                Kami berkomitmen memberikan respons yang berkualitas untuk setiap pertanyaan dan diskusi Anda.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
