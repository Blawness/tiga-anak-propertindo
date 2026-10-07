import ServiceDetail from "@/components/service-detail";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata({
  title: "Konsultasi Legalitas",
  description: "Bantuan hukum dan perizinan properti terpadu.",
});

export default function KonsultasiLegalitasPage() {
  return (
    <ServiceDetail
      slug="konsultasi-legalitas"
      ctaLabel="Konsultasi Sekarang"
      whyTitle="Pentingnya Legalitas"
      whyDescription="Jangan ambil risiko, pastikan setiap langkah properti Anda dilindungi hukum."
      closingTitle="Kepatuhan Adalah Prioritas"
      closingText="Tim ahli kami siap membantu menavigasi kompleksitas regulasi properti di Indonesia."
    />
  );
}
