"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import CTAButton from "./cta-button";
import { FadeIn } from "./motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const mailto = `mailto:${siteConfig.contact.email}`;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isItemActive = (href: string, children?: { href: string }[]) => {
    if (isActive(href)) return true;
    if (!children) return false;
    return children.some((child) => isActive(child.href));
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <FadeIn className="section-shell flex items-center justify-between gap-4 py-4">
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image
                src="/android-chrome-192x192.png"
                alt={siteConfig.name}
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold text-slate-900">
                {siteConfig.name}
              </span>
              <span className="text-xs text-slate-500">Properti & kemitraan</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {siteConfig.navigation.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1 pb-1 transition-colors hover:text-slate-900",
                      isItemActive(item.href, item.children)
                        ? "text-brand-primary font-semibold"
                        : "text-slate-600",
                    )}
                  >
                    {item.label}
                    <span className="text-[10px] transition-transform group-hover:translate-y-[1px]">
                      ▾
                    </span>
                    {isItemActive(item.href, item.children) && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-primary" />
                    )}
                  </Link>
                  <div className="invisible absolute left-0 top-full z-30 pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-slate-100 hover:text-slate-900",
                            isActive(child.href)
                              ? "text-brand-primary font-semibold bg-brand-primary/10"
                              : "text-slate-700",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative pb-1 transition-colors hover:text-slate-900",
                    isActive(item.href)
                      ? "text-brand-primary font-semibold"
                      : "text-slate-600",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-primary" />
                  )}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden md:block">
            <CTAButton href={mailto}>Hubungi Kami</CTAButton>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "h-0.5 w-6 bg-slate-800 transition-transform duration-300",
                  isMenuOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 bg-slate-800 transition-opacity duration-300",
                  isMenuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 bg-slate-800 transition-transform duration-300",
                  isMenuOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </div>
          </button>
        </FadeIn>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-200 md:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-[300px] bg-white shadow-xl transition-transform duration-200 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col gap-3 px-6 pt-20 pb-8">
          {siteConfig.navigation.map((item, index) =>
            item.children ? (
              <div
                key={item.href}
                className="flex flex-col gap-1 rounded-lg px-4 py-3 text-base font-medium text-slate-700"
                style={{ transitionDelay: isMenuOpen ? `${index * 30}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2 py-1 hover:bg-slate-100",
                    isItemActive(item.href, item.children) &&
                    "bg-brand-primary/10 text-brand-primary font-semibold",
                  )}
                >
                  {item.label}
                  <span className="text-sm text-slate-500">▾</span>
                </Link>
                <div className="ml-2 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-normal transition-all duration-200 hover:bg-slate-100 hover:text-brand-primary",
                        isActive(child.href)
                          ? "text-brand-primary font-semibold bg-brand-primary/10"
                          : "text-slate-700",
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-slate-100",
                  isActive(item.href)
                    ? "text-brand-primary font-semibold bg-brand-primary/10"
                    : "text-slate-700",
                )}
                style={{ transitionDelay: isMenuOpen ? `${index * 30}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ),
          )}

          <div className="mt-4 border-t border-slate-200 pt-4">
            <CTAButton href={mailto} className="w-full justify-center">
              Hubungi Kami
            </CTAButton>
          </div>

          <p className="mt-auto text-xs text-slate-500">{siteConfig.tagline}</p>
        </div>
      </div>
    </>
  );
}
