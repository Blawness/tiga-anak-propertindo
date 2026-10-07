import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getServiceImage } from "@/lib/service-images";
import PageHero from "./page-hero";
import SectionWithImage from "./section-with-image";
import CtaBand from "./cta-band";
import ContactSection from "./contact-section";
import { RevealGroup, RevealItem } from "./motion";

type ServiceDetailProps = {
  slug: string;
  ctaLabel: string;
  whyTitle: string;
  whyDescription: string;
  closingTitle: string;
  closingText: string;
};

/** Shared layout for the four /layanan/[service] pages. */
export default function ServiceDetail({
  slug,
  ctaLabel,
  whyTitle,
  whyDescription,
  closingTitle,
  closingText,
}: ServiceDetailProps) {
  const service = siteConfig.coreServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const mailto = `mailto:${siteConfig.contact.email}`;
  const image = getServiceImage(slug);

  return (
    <>
      <PageHero
        eyebrow="Layanan unggulan"
        title={service.title}
        subtitle={service.shortDescription}
        ctaLabel={ctaLabel}
        ctaHref={mailto}
        image={image.src}
        imageAlt={image.alt}
      />

      <SectionWithImage
        index="01"
        eyebrow="Detail layanan"
        title={whyTitle}
        description={service.description}
        imageSrc={image.secondary}
        imageAlt=""
        imagePosition="right"
      >
        <RevealGroup as="ol" className="border-t border-line">
          {service.features.map((feature, index) => (
            <RevealItem
              as="li"
              key={feature}
              className="grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-6"
            >
              <span className="eyebrow text-stone">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-h3">{feature}</span>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 max-w-[44ch] text-ink/65">{whyDescription}</p>
      </SectionWithImage>

      <CtaBand
        eyebrow="Langkah berikutnya"
        title={closingTitle}
        description={closingText}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
        image={image.src}
        imageAlt=""
      />

      <ContactSection index="02" />
    </>
  );
}
