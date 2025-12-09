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
          {siteConfig.credibility.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </Section>

      <Section
        title="Fokus usaha"
        description="Area prioritas yang kami jalankan untuk membangun proyek yang tertata dan dapat dipertanggungjawabkan."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.focusAreas.map((area, index) => (
            <div
              key={area.title}
              className="card-surface flex h-full flex-col gap-3"
            >
              <FadeIn delay={0.05 * index}>
                <h3 className="text-xl font-semibold text-brand-black">
                  {area.title}
                </h3>
                <p className="text-base text-brand-neutral">
                  {area.description}
                </p>
              </FadeIn>
            </div>
          ))}
        </div>
      </Section>

      <Section align="center">
        <FadeIn className="mx-auto max-w-3xl rounded-3xl border border-brand-black/5 bg-brand-gradient-soft px-6 py-10 shadow-[0_18px_32px_-24px_rgba(25,25,25,0.28)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(25,25,25,0.32)] md:px-10">
          <h3 className="text-2xl font-semibold text-brand-black md:text-3xl">
            Siap berkolaborasi secara terukur
          </h3>
          <p className="mt-3 text-base text-brand-neutral md:text-lg">
            Kami terbuka untuk dialog awal guna memetakan kebutuhan, menyusun
            rencana, dan menentukan langkah prioritas secara realistis.
          </p>
          <div className="mt-6 flex justify-center">
            <CTAButton href={mailto} variant="ghost">
              Hubungi Kami
            </CTAButton>
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

