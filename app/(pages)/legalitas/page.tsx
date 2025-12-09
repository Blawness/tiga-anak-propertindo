import { buildMetadata } from "@/lib/meta";
import PageHero from "@/components/page-hero";
import SectionWithImage from "@/components/section-with-image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "Legalitas",
  description: siteConfig.pages.legal.subtitle,
});

export default function LegalitasPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Legalitas"
        title={siteConfig.pages.legal.title}
        subtitle={siteConfig.pages.legal.subtitle}
      />

      {/* Status Legalitas - with legal/document image */}
      <SectionWithImage
        title="Status legalitas"
        description={siteConfig.pages.legal.documentsNote}
        imageSrc={siteConfig.images.legal}
        imageAlt="Legal documents and compliance"
        imagePosition="right"
      >
        <FadeIn>
          <Card className="overflow-hidden border-slate-200">
            <div className="relative h-40 overflow-hidden">
              <Image
                src={siteConfig.images.documents}
                alt="Documentation process"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 rounded-full bg-white/15 px-5 py-2.5 text-white backdrop-blur-sm">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">Dalam Proses Finalisasi</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-base font-semibold text-slate-900">
                {siteConfig.legal.status}
              </p>
              <p className="mt-3 text-base text-slate-600">{siteConfig.legal.statement}</p>

              <div className="mt-6 grid gap-3">
                {[
                  { label: "Akta Pendirian", status: "processing" },
                  { label: "NPWP Perusahaan", status: "processing" },
                  { label: "NIB & OSS", status: "processing" },
                  { label: "Domisili Usaha", status: "processing" },
                ].map((doc) => (
                  <div
                    key={doc.label}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-slate-900">{doc.label}</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                      Dalam Proses
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </FadeIn>
      </SectionWithImage>
    </div>
  );
}
