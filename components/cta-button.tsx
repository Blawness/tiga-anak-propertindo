import Link from "next/link";
import type { ReactNode } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Show the trailing arrow that nudges on hover. */
  arrow?: boolean;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = true,
}: CTAButtonProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)}>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
        >
          →
        </span>
      ) : null}
    </Link>
  );
}
