import CTAButton from "./cta-button";

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
    <div className="flex flex-col gap-4 rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-[0_12px_24px_-18px_rgba(11,31,58,0.35)]">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
          {title}
        </p>
        {description ? (
          <p className="text-sm text-brand-navy/80">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-brand-navy/60">
            Email
          </p>
          <a
            href={emailHref}
            className="text-base font-semibold text-brand-dark hover:text-brand-navy"
          >
            {email}
          </a>
        </div>
        {hasWhatsApp ? (
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-brand-navy/60">
              WhatsApp
            </p>
            <a
              href={whatsappHref}
              className="text-base font-semibold text-brand-dark hover:text-brand-navy"
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
    </div>
  );
}

