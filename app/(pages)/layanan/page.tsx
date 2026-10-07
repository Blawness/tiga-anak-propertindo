import Link from "next/link";
import { buildMetadata } from "@/lib/meta";
import { siteConfig } from "@/lib/site-config";
import { getServiceImage } from "@/lib/service-images";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import ContactSection from "@/components/contact-section";
import { ParallaxImage, RevealGroup, RevealItem } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Layanan",
  description: siteConfig.pages.services.subtitle,
});

export default function LayananPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <>
      <PageHero
        eyebrow="Layanan"
        title={siteConfig.pages.services.title}
        subtitle={siteConfig.pages.services.subtitle}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
        image={siteConfig.images.property}
        imageAlt="Hunian modern dengan kolam renang"
      />

      <Section
        index="01"
        eyebrow="Layanan"
        title="Pilar layanan"
        description={siteConfig.pages.services.pillarsIntro}
      >
        <ol className="border-t border-line">
          {siteConfig.coreServices.map((service, index) => {
            const image = getServiceImage(service.slug);
            return (
              <li key={service.slug} className="border-b border-line">
                <Link
                  href={`/layanan/${service.slug}`}
                  className="group grid gap-8 py-12 md:grid-cols-12 md:items-center md:gap-8 md:py-16"
                >
                  <span className="eyebrow text-stone md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-4 md:col-span-6">
                    <h3 className="text-h2 transition-colors duration-700 ease-luxe group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="max-w-[44ch] text-ink/65">{service.shortDescription}</p>
                    <span className="eyebrow mt-2 inline-flex items-center gap-3">
                      <span className="link-underline">Selengkapnya</span>
                      <span
                        aria-hidden
                        className="transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                  <ParallaxImage
                    src={image.src}
                    alt={image.alt}
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="aspect-[4/3] md:col-span-4 md:col-start-9"
                    imageClassName="transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </Section>

      <SectionWithImage
        index="02"
        eyebrow="Operasional"
        title="Pendekatan operasional"
        description={siteConfig.about.currentFocus}
        imageSrc={siteConfig.images.meeting}
        imageAlt="Rumah modern bermaterial kayu dan beton"
        imagePosition="left"
        tone="bone"
      >
        <RevealGroup as="ol" className="border-t border-line">
          {siteConfig.about.principles.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-6"
            >
              <span className="eyebrow pt-1.5 text-stone">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="text-ink/65">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionWithImage>

      <ContactSection
        index="03"
        title="Diskusi awal membantu memetakan kebutuhan dan prioritas kolaborasi."
        note={siteConfig.pages.contact.availability}
      />
    </>
  );
}
