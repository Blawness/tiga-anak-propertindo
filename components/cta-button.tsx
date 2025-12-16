import Link from "next/link";
import type { ReactNode } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        "rounded-full px-6",
        (variant === "primary" || variant === "secondary") && "!text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}

