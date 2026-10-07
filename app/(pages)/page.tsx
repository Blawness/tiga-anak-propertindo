import { buildMetadata } from "@/lib/meta";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/page-hero";
import CommitmentSection from "@/components/home/commitment-section";
import ServicesGallery from "@/components/home/services-gallery";
import RoadmapSection from "@/components/home/roadmap-section";
import CtaBand from "@/components/cta-band";
import ContactSection from "@/components/contact-section";

export const metadata = buildMetadata({
  title: "Home",
});

export default function HomePage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <>
      <PageHero
        title={siteConfig.hero.title}
        subtitle={siteConfig.hero.subtitle}
        ctaLabel={siteConfig.hero.ctaLabel}
        ctaHref={mailto}
        eyebrow="PT Tiga Anak Propertindo"
        size="large"
        imageAlt="Hunian modern berdinding kayu gelap di bawah pohon saat senja"
      />
      <CommitmentSection />
      <ServicesGallery />
      <RoadmapSection />
      <CtaBand
        eyebrow="Kolaborasi"
        title="Siap berkolaborasi secara terukur"
        description="Kami terbuka untuk dialog awal guna memetakan kebutuhan, menyusun rencana, dan menentukan langkah prioritas secara realistis."
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
        image={siteConfig.images.collaboration}
      />
      <ContactSection index="04" />
    </>
  );
}
