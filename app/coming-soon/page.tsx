import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import { siteConfig } from "@/lib/site-config";
import { Reveal, SplitText } from "@/components/motion";

export const metadata = buildMetadata({
  title: siteConfig.pages.comingSoon.title,
  description: siteConfig.pages.comingSoon.subtitle,
});

export default function ComingSoonPage() {
  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
      <div className="flex flex-col gap-8 lg:col-span-7">
        <p className="eyebrow flex items-center gap-4 text-sand-soft">
          <span aria-hidden className="h-px w-10 bg-current" />
          {siteConfig.name}
        </p>
        <SplitText
          as="h1"
          text={siteConfig.pages.comingSoon.title}
          trigger="mount"
          delay={0.1}
          className="text-display"
        />
        <Reveal delay={0.5} y={20} className="flex max-w-[48ch] flex-col gap-4">
          <p className="text-lead text-paper/75">{siteConfig.pages.comingSoon.subtitle}</p>
          <p className="text-paper/70">{siteConfig.pages.comingSoon.statusDetail}</p>
          <p className="text-paper/70">{siteConfig.pages.comingSoon.nextStepNote}</p>
        </Reveal>
      </div>

      <div className="bg-paper p-8 text-ink md:p-10 lg:col-span-5 lg:self-end">
        <ContactCard
          title="Kontak"
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description={siteConfig.pages.contact.availability}
        />
      </div>
    </div>
  );
}
