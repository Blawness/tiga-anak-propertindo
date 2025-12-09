import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: siteConfig.pages.comingSoon.title,
  description: siteConfig.pages.comingSoon.subtitle,
});

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center gap-8 text-center md:gap-10">
      <FadeIn className="flex flex-col items-center gap-3">
        <Badge>Informasi</Badge>
        <h1 className="font-heading text-4xl font-bold text-slate-900 md:text-5xl">
          {siteConfig.pages.comingSoon.title}
        </h1>
        <p className="max-w-2xl text-base text-slate-600 md:text-lg">
          {siteConfig.pages.comingSoon.subtitle}
        </p>
      </FadeIn>

      <FadeIn delay={0.05} className="w-full max-w-2xl text-left md:text-center">
        <Card className="border-slate-200 p-6">
          <p className="text-base font-semibold text-slate-900">
            {siteConfig.pages.comingSoon.statusDetail}
          </p>
          <p className="mt-3 text-base text-slate-600">
            {siteConfig.pages.comingSoon.nextStepNote}
          </p>
        </Card>
      </FadeIn>

      <FadeIn delay={0.1} className="w-full max-w-2xl">
        <ContactCard
          title="Kontak"
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description={siteConfig.pages.contact.availability}
        />
      </FadeIn>
    </div>
  );
}

