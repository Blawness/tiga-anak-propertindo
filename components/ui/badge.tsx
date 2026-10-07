import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

/** Editorial eyebrow label: small caps with a leading hairline. */
export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  if (variant === "outline") {
    return (
      <span
        className={cn("eyebrow inline-flex items-center border border-current/30 px-3 py-1.5", className)}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn("eyebrow inline-flex items-center gap-3 text-accent", className)}
      {...props}
    >
      <span aria-hidden className="h-px w-6 bg-current" />
      {children}
    </span>
  );
}
