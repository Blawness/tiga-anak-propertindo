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
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover";

  const styles =
    variant === "solid"
      ? "bg-brand-gradient text-white shadow-[0_12px_26px_-18px_rgba(25,25,25,0.55)] hover:shadow-[0_18px_34px_-18px_rgba(25,25,25,0.6)]"
      : "border border-brand-primary/30 text-brand-primary hover:border-brand-hover hover:text-brand-black hover:bg-brand-gradient-soft";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

