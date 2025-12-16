import CTAButton from "./cta-button";
import { FadeIn } from "./motion";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

type ContactCardProps = {
  title?: string;
  email: string;
  whatsapp?: string;
  description?: string;
};

export default function ContactCard({
  title = "Kontak",
  email,
  whatsapp,
  description,
}: ContactCardProps) {
  const hasWhatsApp = Boolean(whatsapp && whatsapp.trim());
  const emailHref = `mailto:${email}`;
  const whatsappHref = hasWhatsApp ? `https://wa.me/${whatsapp}` : "";

  return (
    <FadeIn>
      <Card className="border-slate-200">
        <CardHeader className="pb-4">
          <Badge className="w-fit uppercase tracking-[0.14em]">{title}</Badge>
          {description ? (
            <p className="text-sm text-slate-600">{description}</p>
          ) : null}
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-0">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
              Email
            </p>
            <a
              href={emailHref}
              className="text-base font-semibold text-slate-900 transition-colors duration-200 hover:text-brand-primary"
            >
              {email}
            </a>
          </div>
          {hasWhatsApp ? (
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                WhatsApp
              </p>
              <a
                href={whatsappHref}
                className="text-base font-semibold text-slate-900 transition-colors duration-200 hover:text-brand-primary"
              >
                {whatsapp}
              </a>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <CTAButton href={emailHref}>Email Kami</CTAButton>
            {hasWhatsApp ? (
              <CTAButton href={whatsappHref} variant="outline">
                WhatsApp
              </CTAButton>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

