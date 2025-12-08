"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import CTAButton from "./cta-button";
import { FadeIn } from "./motion";

export default function Header() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-black/5 bg-brand-paper/95 backdrop-blur-md">
      <FadeIn className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(111,55,21,0.45)]">
            TAP
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-brand-black">
              {siteConfig.name}
            </span>
            <span className="text-xs text-brand-neutral">
              Properti & kemitraan
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-neutral md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-brand-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <CTAButton href={mailto}>Hubungi Kami</CTAButton>
        </div>
      </FadeIn>
    </header>
  );
}

