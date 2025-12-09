import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import StatCard from "@/components/stat-card";
import CTAButton from "@/components/cta-button";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";

export const metadata = buildMetadata({
  title: "Home",
});

export default function HomePage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        title={siteConfig.hero.title}
        subtitle={siteConfig.hero.subtitle}
        ctaLabel={siteConfig.hero.ctaLabel}
        ctaHref={mailto}
        eyebrow="PT Tiga Anak Propertindo"
      />

      <Section
        title="Komitmen inti kami"
        description="Pendekatan prudent, transparan, dan patuh regulasi untuk memastikan setiap langkah pengembangan properti memiliki dasar yang kuat."
        align="center"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {siteConfig.credibility.map((item, index) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              primary={index === 0}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Layanan utama"
        description="Layanan prioritas untuk menyiapkan proyek yang tertata, patuh regulasi, dan siap dieksekusi."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.focusAreas.map((area, index) => (
            <div
              key={area.title}
              className={`card-surface flex h-full flex-col gap-4 ${index === 0 ? "md:col-span-2 md:flex-row md:items-start md:gap-8" : ""
                }`}
            >
              <FadeIn delay={0.05 * index} className={index === 0 ? "flex flex-col gap-4 md:flex-row md:items-start md:gap-8 w-full" : ""}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-paper text-sm font-semibold text-brand-primary">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-brand-black">
                    {area.title}
                  </h3>
                  <p className="text-base text-brand-neutral">
                    {area.description}
                  </p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </Section>

      <Section align="center">
        <FadeIn className="mx-auto max-w-3xl rounded-2xl border border-brand-black/8 bg-white px-8 py-12 shadow-[0_12px_24px_-16px_rgba(25,25,25,0.12)] md:px-12 md:py-14">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-px w-16 bg-brand-primary/40" aria-hidden />
            <h3 className="font-heading text-2xl font-semibold text-brand-black md:text-3xl">
              Siap berkolaborasi secara terukur
            </h3>
            <p className="mt-4 max-w-xl text-base text-brand-neutral md:text-lg">
              Kami terbuka untuk dialog awal guna memetakan kebutuhan, menyusun
              rencana, dan menentukan langkah prioritas secara realistis.
            </p>
            <div className="mt-8">
              <CTAButton href={mailto} variant="ghost">
                Hubungi Kami
              </CTAButton>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section title="Kontak" description="Silakan hubungi kami untuk percakapan awal.">
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description="Respons akan diberikan secara terjadwal untuk menjaga kualitas diskusi."
        />
      </Section>
    </div>
  );
}

