import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import CTAButton from "@/components/cta-button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/motion";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata({
    title: "Kemitraan & Perizinan",
    description: "Kolaborasi pengembangan lahan yang saling menguntungkan.",
});

export default function KemitraanPerizinanPage() {
    const service = siteConfig.coreServices.find((s) => s.slug === "kemitraan-perizinan");

    if (!service) return notFound();

    return (
        <div className="space-y-12 md:space-y-16">
            <PageHero
                title={service.title}
                subtitle={service.shortDescription}
                eyebrow="Layanan Unggulan"
                ctaLabel="Ajukan Kemitraan"
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

            <Section title="Tumbuh Bersama" description="Skema kerjasama yang transparan dan saling menguntungkan.">
                <div className="rounded-3xl bg-slate-50 p-8 md:p-12 text-center border border-slate-100">
                    <h3 className="mb-4 text-2xl font-semibold text-slate-900">Optimalisasi Aset Lahan</h3>
                    <p className="mx-auto mb-8 max-w-2xl text-slate-600">
                        Punya lahan strategis? Mari diskusikan potensi pengembangannya melalui skema kemitraan kami.
                    </p>
                    <CTAButton href={`mailto:${siteConfig.contact.email}`}>Hubungi Kami</CTAButton>
                </div>
            </Section>
        </div>
    );
}
