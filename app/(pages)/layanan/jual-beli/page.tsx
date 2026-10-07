import ServiceDetail from "@/components/service-detail";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata({
  title: "Jual Beli Properti",
  description: "Transaksi jual beli aman dan transparan.",
});

export default function JualBeliPage() {
  return (
    <ServiceDetail
      slug="jual-beli"
      ctaLabel="Info Lebih Lanjut"
      whyTitle="Transaksi Aman"
      whyDescription="Keamanan aset dan legalitas transaksi adalah jaminan layanan kami."
      closingTitle="Mitra Transaksi Terpercaya"
      closingText="Dapatkan valuasi terbaik dan proses peralihan hak yang transparan bersama kami."
    />
  );
}
