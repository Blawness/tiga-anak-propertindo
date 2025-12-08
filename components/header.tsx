import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import CTAButton from "./cta-button";

export default function Header() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <header className="sticky top-0 z-50 bg-brand-light/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white shadow-lg shadow-brand-navy/20">
            TAP
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-brand-dark">
              {siteConfig.name}
            </span>
            <span className="text-xs text-brand-navy/70">Properti & kemitraan</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-navy/80 md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-brand-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <CTAButton href={mailto}>Hubungi Kami</CTAButton>
        </div>
      </div>
    </header>
  );
}

