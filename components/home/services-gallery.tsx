import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { GalleryImage, HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { Reveal } from "@/components/motion";
import SectionHeading from "@/components/section-heading";

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  "sewa-lahan": {
    src: siteConfig.images.land,
    alt: "Hamparan lahan terbuka saat matahari terbenam",
  },
  "konsultasi-legalitas": {
    src: siteConfig.images.legal,
    alt: "Arsitektur putih bersudut tegas di bawah langit cerah",
  },
  "jual-beli": {
    src: siteConfig.images.property,
    alt: "Hunian modern dengan kolam renang",
  },
  "kemitraan-perizinan": {
    src: siteConfig.images.handshake,
    alt: "Dua menara kaca menjulang saling berhadapan",
  },
};

export default function ServicesGallery() {
  const services = siteConfig.coreServices;
  const total = String(services.length).padStart(2, "0");

  return (
    <section aria-label="Layanan utama" className="bg-ink text-paper">
      <HorizontalScroll trackClassName="lg:items-center">
        {/* Intro panel */}
        <div className="section-shell pb-16 pt-28 md:pt-40 lg:w-[38vw] lg:max-w-none lg:shrink-0 lg:py-0 lg:pl-[clamp(1.25rem,4vw,3rem)] lg:pr-16">
          <SectionHeading
            index="02"
            eyebrow="Layanan utama"
            title="Empat layanan, satu standar kehati-hatian."
            description="Layanan prioritas untuk menyiapkan proyek yang tertata, patuh regulasi, dan siap dieksekusi."
            tone="dark"
          />
          <p aria-hidden className="eyebrow mt-12 hidden items-center gap-3 text-paper/50 lg:flex">
            Gulir <span className="inline-block">→</span>
          </p>
        </div>

        {services.map((service, index) => {
          const image = SERVICE_IMAGES[service.slug] ?? {
            src: siteConfig.images.hero,
            alt: "",
          };
          return (
            <article
              key={service.slug}
              className="section-shell border-t border-line-light py-16 md:py-24 lg:w-[min(82vw,72rem)] lg:max-w-none lg:shrink-0 lg:border-l lg:border-t-0 lg:px-12 lg:py-0"
            >
              <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-14">
                <GalleryImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3] lg:aspect-auto lg:h-[64vh]"
                />

                <Reveal className="flex flex-col gap-6" y={24}>
                  <p className="eyebrow text-bronze">
                    {String(index + 1).padStart(2, "0")} / {total}
                  </p>
                  <h3 className="text-h2">{service.title}</h3>
                  <p className="max-w-[40ch] text-paper/65">{service.description}</p>
                  <ul className="mt-2 border-t border-line-light">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="border-b border-line-light py-3 text-sm text-paper/80"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="eyebrow group/link mt-2 inline-flex items-center gap-3 self-start text-paper"
                  >
                    <span className="link-underline">Selengkapnya</span>
                    <span
                      aria-hidden
                      className="transition-transform duration-500 ease-luxe group-hover/link:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              </div>
            </article>
          );
        })}

        {/* Breathing room at the end of the pinned track */}
        <div aria-hidden className="hidden lg:block lg:w-[8vw] lg:shrink-0" />
      </HorizontalScroll>
    </section>
  );
}
