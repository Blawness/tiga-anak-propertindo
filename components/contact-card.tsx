import CTAButton from "./cta-button";
import { FadeIn } from "./motion";

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
    <FadeIn className="card-surface flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
          {title}
        </p>
        {description ? (
          <p className="text-sm text-brand-neutral">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-brand-neutral">
            Email
          </p>
          <a
            href={emailHref}
            className="text-base font-semibold text-brand-black hover:text-brand-primary"
          >
            {email}
          </a>
        </div>
        {hasWhatsApp ? (
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-brand-neutral">
              WhatsApp
            </p>
            <a
              href={whatsappHref}
              className="text-base font-semibold text-brand-black hover:text-brand-primary"
            >
              {whatsapp}
            </a>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3">
        <CTAButton href={emailHref}>Email Kami</CTAButton>
        {hasWhatsApp ? (
          <CTAButton href={whatsappHref} variant="ghost">
            WhatsApp
          </CTAButton>
        ) : null}
      </div>
    </FadeIn>
  );
}

