import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import StatCard from "@/components/stat-card";
import CTAButton from "@/components/cta-button";
import RoadmapTimeline from "@/components/roadmap-timeline";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "Home",
});

export default function HomePage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        title={siteConfig.hero.title}
        subtitle={siteConfig.hero.subtitle}
        ctaLabel={siteConfig.hero.ctaLabel}
        ctaHref={mailto}
        eyebrow="PT Tiga Anak Propertindo"
      />

      <SectionWithImage
        title="Komitmen inti kami"
        description="Pendekatan prudent, transparan, dan patuh regulasi untuk memastikan setiap langkah pengembangan properti memiliki dasar yang kuat."
        imageSrc={siteConfig.images.building}
        imageAlt="Modern property building representing our commitment"
        imagePosition="right"
      >
        <div className="grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.credibility.map((item, index) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              primary={index === 0}
            />
          ))}
        </div>
      </SectionWithImage>

      <Section
        title="Layanan utama"
        description="Layanan prioritas untuk menyiapkan proyek yang tertata, patuh regulasi, dan siap dieksekusi."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.focusAreas.map((area, index) => {
            const images = [
              siteConfig.images.planning,
              siteConfig.images.handshake,
              siteConfig.images.construction,
              siteConfig.images.documents,
            ];

            return (
              <FadeIn key={area.title} delay={0.05 * index} className="h-full">
                <Card className="group flex h-full flex-col overflow-hidden border-slate-200">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={images[index]}
                      alt={area.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <Badge className="bg-white/90 text-brand-primary ring-0">
                        Layanan {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <Badge variant="outline">Fokus</Badge>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {area.title}
                    </h3>
                    <p className="text-base text-slate-600">{area.description}</p>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section
        title={siteConfig.roadmap.title}
        description={siteConfig.roadmap.subtitle}
      >
        <RoadmapTimeline />
      </Section>

      <section className="py-12 md:py-16">
        <div className="section-shell">
          <FadeIn className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-md">
            <Image
              src={siteConfig.images.collaboration}
              alt="Collaboration"
              fill
              className="object-cover opacity-60"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/60" />
            <div className="relative flex flex-col items-center gap-4 px-8 py-16 text-center md:px-16 md:py-20">
              <Badge className="bg-white/15 text-white ring-0">Kolaborasi</Badge>
              <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                Siap berkolaborasi secara terukur
              </h3>
              <p className="max-w-2xl text-base text-white/80 md:text-lg">
                Kami terbuka untuk dialog awal guna memetakan kebutuhan, menyusun
                rencana, dan menentukan langkah prioritas secara realistis.
              </p>
              <CTAButton href={mailto} variant="secondary" className="mt-2">
                Hubungi Kami
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionWithImage
        title="Kontak"
        description="Silakan hubungi kami untuk percakapan awal."
        imageSrc={siteConfig.images.office}
        imageAlt="Modern office space"
        imagePosition="left"
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description="Respons akan diberikan secara terjadwal untuk menjaga kualitas diskusi."
        />
      </SectionWithImage>
    </div>
  );
}
