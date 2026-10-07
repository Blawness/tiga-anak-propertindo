import { siteConfig } from "./site-config";

export type ServiceImage = { src: string; alt: string; secondary: string };

/** Editorial imagery per service slug, shared by the home gallery and service pages. */
export const SERVICE_IMAGES: Record<string, ServiceImage> = {
  "sewa-lahan": {
    src: siteConfig.images.land,
    alt: "Hamparan lahan terbuka saat matahari terbenam",
    secondary: siteConfig.images.construction,
  },
  "konsultasi-legalitas": {
    src: siteConfig.images.legal,
    alt: "Arsitektur putih bersudut tegas di bawah langit cerah",
    secondary: siteConfig.images.documents,
  },
  "jual-beli": {
    src: siteConfig.images.property,
    alt: "Hunian modern dengan kolam renang",
    secondary: siteConfig.images.team,
  },
  "kemitraan-perizinan": {
    src: siteConfig.images.handshake,
    alt: "Dua menara kaca menjulang saling berhadapan",
    secondary: siteConfig.images.blueprint,
  },
};

export function getServiceImage(slug: string): ServiceImage {
  return (
    SERVICE_IMAGES[slug] ?? {
      src: siteConfig.images.hero,
      alt: "",
      secondary: siteConfig.images.planning,
    }
  );
}
