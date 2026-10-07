import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import CTAButton from "./cta-button";
import { Reveal } from "./motion";

export default function Footer() {
  const mailto = `mailto:${siteConfig.contact.email}`;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surface text-paper">
      <div className="section-shell pt-28 md:pt-40">
        <Reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl text-h2">
            {siteConfig.tagline}
            <span className="text-sand">.</span>
          </p>
          <CTAButton href={mailto} variant="light" size="lg" className="self-start md:self-auto">
            Mulai percakapan
          </CTAButton>
        </Reveal>

        <div className="mt-24 grid gap-12 border-t border-line-light pt-12 md:grid-cols-12">
          <p className="text-paper/60 md:col-span-5">{siteConfig.description}</p>

          <nav aria-label="Navigasi footer" className="flex flex-col gap-4 md:col-span-3 md:col-start-7">
            <span className="eyebrow text-paper/70">Navigasi</span>
            <ul className="flex flex-col gap-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-paper/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 md:col-span-3">
            <span className="eyebrow text-paper/70">Kontak</span>
            <a href={mailto} className="link-underline self-start text-paper/80 hover:text-paper">
              {siteConfig.contact.email}
            </a>
            <a
              href={`https://${siteConfig.contact.website}`}
              className="link-underline self-start text-paper/80 hover:text-paper"
            >
              {siteConfig.contact.website}
            </a>
            {siteConfig.contact.whatsapp ? (
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                className="link-underline self-start text-paper/80 hover:text-paper"
              >
                {siteConfig.contact.whatsapp}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="section-shell mt-24 select-none" aria-hidden>
        <p className="whitespace-nowrap font-display text-[min(9.4vw,8.4rem)] font-light leading-[0.8] tracking-[-0.03em] text-paper/90">
          Tiga Anak <span className="italic text-sand">Propertindo</span>
        </p>
      </div>

      <div className="section-shell flex flex-col gap-2 border-t border-line-light py-8 text-xs text-paper/70 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {siteConfig.name}
        </span>
        <span>Tata kelola &amp; kemitraan properti</span>
      </div>
    </footer>
  );
}
