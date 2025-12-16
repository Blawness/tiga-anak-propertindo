import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import CTAButton from "@/components/cta-button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/motion";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata({
    title: "Konsultasi Legalitas",
    description: "Bantuan hukum dan perizinan properti terpadu.",
});

export default function KonsultasiLegalitasPage() {
    const service = siteConfig.coreServices.find((s) => s.slug === "konsultasi-legalitas");

    if (!service) return notFound();

    return (
        <div className="space-y-12 md:space-y-16">
            <PageHero
                title={service.title}
                subtitle={service.shortDescription}
                eyebrow="Layanan Unggulan"
                ctaLabel="Konsultasi Sekarang"
                ctaHref={`mailto:${siteConfig.contact.email}`}
            />

            <Section title="Detail Layanan" description={service.description}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {service.features.map((feature, index) => (
                        <FadeIn key={feature} delay={index * 0.1}>
                            <Card className="flex h-full flex-col p-6 border-slate-200 shadow-sm">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary font-bold">
                                    {index + 1}
                                </div>
                                <h4 className="font-semibold text-slate-900">{feature}</h4>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </Section>

            <Section title="Pentingnya Legalitas" description="Jangan ambil risiko, pastikan setiap langkah properti Anda dilindungi hukum.">
                <div className="rounded-3xl bg-slate-50 p-8 md:p-12 text-center border border-slate-100">
                    <h3 className="mb-4 text-2xl font-semibold text-slate-900">Kepatuhan Adalah Prioritas</h3>
                    <p className="mx-auto mb-8 max-w-2xl text-slate-600">
                        Tim ahli kami siap membantu menavigasi kompleksitas regulasi properti di Indonesia.
                    </p>
                    <CTAButton href={`mailto:${siteConfig.contact.email}`}>Hubungi Kami</CTAButton>
                </div>
            </Section>
        </div>
    );
}
