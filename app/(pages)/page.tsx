import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import CommitmentSection from "@/components/home/commitment-section";
import ServicesGallery from "@/components/home/services-gallery";
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
    <div>
      <PageHero
        title={siteConfig.hero.title}
        subtitle={siteConfig.hero.subtitle}
        ctaLabel={siteConfig.hero.ctaLabel}
        ctaHref={mailto}
        eyebrow="PT Tiga Anak Propertindo"
        size="large"
      />


      <CommitmentSection />

      <ServicesGallery />

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
              <h3 className="font-heading text-2xl font-semibold !text-white md:text-3xl">
                Siap berkolaborasi secara terukur
              </h3>
              <p className="max-w-2xl text-base text-white/80 md:text-lg">
                Kami terbuka untuk dialog awal guna memetakan kebutuhan, menyusun
                rencana, dan menentukan langkah prioritas secara realistis.
              </p>
              <CTAButton href={mailto} className="mt-2">
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
