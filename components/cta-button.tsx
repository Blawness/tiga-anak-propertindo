import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
};

export default function CTAButton({
  href,
  children,
  variant = "solid",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";

  const styles =
    variant === "solid"
      ? "bg-brand-navy text-white hover:bg-brand-dark"
      : "border border-brand-navy/20 text-brand-navy hover:border-brand-navy/40 hover:text-brand-dark";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

