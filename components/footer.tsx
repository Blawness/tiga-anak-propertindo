import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-brand-navy/10 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-md flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
            {siteConfig.name}
          </p>
          <p className="text-base text-brand-navy/80">{siteConfig.description}</p>
          <p className="text-sm text-brand-navy/70">
            {siteConfig.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-brand-navy/80">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy/60">
            Navigasi
          </p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-brand-dark"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-brand-navy/80">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy/60">
            Kontak
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-semibold text-brand-dark hover:text-brand-navy"
          >
            {siteConfig.contact.email}
          </a>
          {siteConfig.contact.whatsapp ? (
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              className="font-semibold text-brand-dark hover:text-brand-navy"
            >
              {siteConfig.contact.whatsapp}
            </a>
          ) : (
            <p className="text-xs text-brand-navy/60">
              WhatsApp akan ditambahkan saat tersedia.
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-brand-navy/10 bg-brand-light/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-xs text-brand-navy/70">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span>Fokus: tata kelola & kemitraan properti.</span>
        </div>
      </div>
    </footer>
  );
}

