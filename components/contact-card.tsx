import CTAButton from "./cta-button";
import { Reveal } from "./motion";

type ContactCardProps = {
  title?: string;
  email: string;
  whatsapp?: string;
  description?: string;
  address?: { line1: string; line2: string; city: string };
};

/** Editorial contact block: oversized email, hairline rows, quiet note. */
export default function ContactCard({
  title = "Kontak",
  email,
  whatsapp,
  description,
  address,
}: ContactCardProps) {
  const hasWhatsApp = Boolean(whatsapp && whatsapp.trim());
  const emailHref = `mailto:${email}`;
  const whatsappHref = hasWhatsApp ? `https://wa.me/${whatsapp}` : "";

  return (
    <Reveal className="flex flex-col">
      <p className="eyebrow text-stone">{title}</p>
      <dl className="mt-6 border-t border-line">
        <div className="flex flex-col gap-2 border-b border-line py-6">
          <dt className="eyebrow text-stone">Email</dt>
          <dd>
            <a
              href={emailHref}
              className="link-underline font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-tight break-all transition-colors duration-500 ease-luxe hover:text-accent"
            >
              {email}
            </a>
          </dd>
        </div>
        {hasWhatsApp ? (
          <div className="flex flex-col gap-2 border-b border-line py-6">
            <dt className="eyebrow text-stone">WhatsApp</dt>
            <dd>
              <a
                href={whatsappHref}
                className="link-underline font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-tight transition-colors duration-500 ease-luxe hover:text-accent"
              >
                {whatsapp}
              </a>
            </dd>
          </div>
        ) : null}
        {address ? (
          <div className="flex flex-col gap-2 border-b border-line py-6">
            <dt className="eyebrow text-stone">Kantor</dt>
            <dd>
              <address className="not-italic text-lead">
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city}
              </address>
            </dd>
          </div>
        ) : null}
      </dl>
      {description ? <p className="mt-6 max-w-[44ch] text-ink/65">{description}</p> : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <CTAButton href={emailHref}>Email kami</CTAButton>
        {hasWhatsApp ? (
          <CTAButton href={whatsappHref} variant="outline">
            WhatsApp
          </CTAButton>
        ) : null}
      </div>
    </Reveal>
  );
}
