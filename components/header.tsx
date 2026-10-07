"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/lib/site-config";
import CTAButton from "./cta-button";
import { cn } from "@/lib/utils";

const SOLID_AFTER = 80;
const HIDE_AFTER = 480;

export default function Header() {
  const pathname = usePathname();
  const mailto = `mailto:${siteConfig.contact.email}`;
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Close the menu on navigation (state reset during render, no effect needed).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsMenuOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const goingDown = y > lastY.current;
    lastY.current = y;
    setSolid(y > SOLID_AFTER);
    setHidden(goingDown && y > HIDE_AFTER);
  });

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen, lenis]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isItemActive = (href: string, children?: { href: string }[]) =>
    isActive(href) || Boolean(children?.some((child) => isActive(child.href)));

  const overHero = !solid && !isMenuOpen;
  const lightMark = overHero || isMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-700 ease-luxe",
          "border-b",
          overHero
            ? "border-transparent bg-transparent text-paper"
            : "border-line bg-paper/85 text-ink backdrop-blur-md",
          isMenuOpen && "border-transparent bg-transparent text-paper backdrop-blur-none",
          hidden && !isMenuOpen && "-translate-y-full",
        )}
      >
        <div className="section-shell flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="relative z-50 flex items-center gap-3"
            aria-label={`${siteConfig.name}, beranda`}
          >
            {/* White mark over the hero / open menu, brand colours once solid.
                Two stacked images crossfade on opacity only. */}
            <span className="relative h-8 w-8">
              <Image
                src="/android-chrome-192x192.png"
                alt=""
                fill
                className={cn(
                  "object-contain transition-opacity duration-700 ease-luxe",
                  lightMark ? "opacity-0" : "opacity-100",
                )}
                sizes="32px"
                priority
              />
              <Image
                src="/logo-mark-white.png"
                alt=""
                fill
                className={cn(
                  "object-contain transition-opacity duration-700 ease-luxe",
                  lightMark ? "opacity-100" : "opacity-0",
                )}
                sizes="32px"
                priority
              />
            </span>
            <span className="font-display text-xl leading-none tracking-tight md:text-[1.375rem]">
              Tiga Anak <span className="italic">Propertindo</span>
            </span>
          </Link>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-9 lg:flex">
            {siteConfig.navigation.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isItemActive(item.href, item.children) ? "page" : undefined}
                    className="eyebrow link-underline flex items-center gap-1.5 whitespace-nowrap py-2"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="inline-block text-[0.6rem] transition-transform duration-500 ease-luxe group-hover:rotate-180 group-focus-within:rotate-180"
                    >
                      ▾
                    </span>
                  </Link>
                  <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-[opacity,transform] duration-500 ease-luxe group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                    <ul className="min-w-56 border border-line bg-paper py-3 text-ink">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={isActive(child.href) ? "page" : undefined}
                            className={cn(
                              "flex items-center justify-between gap-6 px-6 py-2.5 font-display text-xl transition-colors duration-500 ease-luxe hover:text-accent",
                              isActive(child.href) && "text-accent",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="eyebrow link-underline whitespace-nowrap py-2"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:block">
            <CTAButton
              href={mailto}
              size="sm"
              variant={overHero ? "light" : "outline"}
            >
              Hubungi Kami
            </CTAButton>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-3 w-7">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-700 ease-luxe",
                  isMenuOpen && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-700 ease-luxe",
                  isMenuOpen && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile / tablet full-screen menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-surface text-paper transition-opacity duration-700 ease-luxe lg:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <nav
          aria-label="Navigasi seluler"
          className="section-shell flex flex-1 flex-col justify-center gap-2 pt-20"
        >
          {siteConfig.navigation
            .flatMap((item) =>
              item.children
                ? item.children.map((child) => ({ ...child, key: child.href }))
                : [{ ...item, key: item.href }],
            )
            .filter((item, i, all) => all.findIndex((x) => x.href === item.href) === i)
            .map((item, index) => (
              <div key={item.key} className="overflow-hidden">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-baseline gap-4 py-1 font-display text-[clamp(2.25rem,9vw,3.5rem)] font-light leading-tight transition-transform duration-1000 ease-luxe",
                    isMenuOpen ? "translate-y-0" : "translate-y-full",
                    isActive(item.href) && "italic text-sand",
                  )}
                  style={{ transitionDelay: isMenuOpen ? `${120 + index * 60}ms` : "0ms" }}
                >
                  <span className="eyebrow not-italic text-paper/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </div>
            ))}
        </nav>
        <div className="section-shell flex flex-col gap-2 border-t border-line-light py-8">
          <span className="eyebrow text-paper/70">Kontak</span>
          <a href={mailto} className="text-lg">
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </>
  );
}
