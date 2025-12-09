import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-white shadow-sm hover:bg-brand-primary/90 focus-visible:ring-2 focus-visible:ring-brand-primary/40",
  secondary:
    "bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-brand-primary/40 hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-primary/30",
  ghost:
    "text-slate-900 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-primary/30",
  outline:
    "border border-slate-200 text-slate-900 hover:border-brand-primary/40 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-primary/30",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const buttonBase =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60";

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(buttonBase, variantClasses[variant], sizeClasses[size], className);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";


