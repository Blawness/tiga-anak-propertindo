import ServiceDetail from "@/components/service-detail";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata({
  title: "Sewa Lahan & Properti",
  description: "Layanan sewa gudang, properti komersial, dan lahan strategis.",
});

export default function SewaLahanPage() {
  return (
    <ServiceDetail
      slug="sewa-lahan"
      ctaLabel="Tanyakan Ketersediaan"
      whyTitle="Mengapa Memilih Kami?"
      whyDescription="Kami mengutamakan kualitas aset dan keamanan transaksi sewa."
      closingTitle="Solusi Properti Terpercaya"
      closingText="Kami memastikan setiap aset yang disewakan memiliki legalitas lengkap dan kondisi fisik yang prima."
    />
  );
}
