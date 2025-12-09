import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const styles =
    variant === "outline"
      ? "border border-slate-200 text-slate-800 bg-white"
      : "bg-brand-primary/10 text-brand-primary border border-brand-primary/20";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]",
        styles,
        className,
      )}
      {...props}
    />
  );
}


