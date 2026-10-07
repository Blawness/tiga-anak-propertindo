import ServiceDetail from "@/components/service-detail";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata({
  title: "Kemitraan & Perizinan",
  description: "Kolaborasi pengembangan lahan yang saling menguntungkan.",
});

export default function KemitraanPerizinanPage() {
  return (
    <ServiceDetail
      slug="kemitraan-perizinan"
      ctaLabel="Ajukan Kemitraan"
      whyTitle="Tumbuh Bersama"
      whyDescription="Skema kerjasama yang transparan dan saling menguntungkan."
      closingTitle="Optimalisasi Aset Lahan"
      closingText="Punya lahan strategis? Mari diskusikan potensi pengembangannya melalui skema kemitraan kami."
    />
  );
}
