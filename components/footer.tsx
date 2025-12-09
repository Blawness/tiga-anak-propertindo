import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./motion";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <FadeIn className="section-shell flex flex-col gap-10 py-10 md:flex-row md:justify-between">
        <div className="flex max-w-xl flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image
                src="/android-chrome-192x192.png"
                alt={siteConfig.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
                {siteConfig.name}
              </span>
              <span className="text-xs text-slate-500">Properti & kemitraan</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            {siteConfig.description}
          </p>
          <p className="text-sm text-slate-500">{siteConfig.tagline}</p>
        </div>

        <div className="grid gap-8 text-sm text-slate-600 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Navigasi
            </p>
            <div className="grid grid-cols-2 gap-2">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-1 py-0.5 transition-colors hover:text-brand-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Kontak
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-semibold text-slate-900 hover:text-brand-primary"
            >
              {siteConfig.contact.email}
            </a>
            {siteConfig.contact.whatsapp ? (
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                className="font-semibold text-slate-900 hover:text-brand-primary"
              >
                {siteConfig.contact.whatsapp}
              </a>
            ) : (
              <p className="text-xs text-slate-500">
                WhatsApp akan ditambahkan saat tersedia.
              </p>
            )}
          </div>
        </div>
      </FadeIn>
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="section-shell flex flex-col gap-2 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>Fokus: tata kelola & kemitraan properti.</span>
        </div>
      </div>
    </footer>
  );
}

