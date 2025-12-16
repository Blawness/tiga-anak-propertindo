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
    "bg-[#6F3715] !text-white shadow-sm hover:bg-[#B1846A] hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-primary/40 active:scale-[0.98]",
  secondary:
    "bg-slate-900 !text-white border border-slate-700 shadow-sm hover:border-brand-primary/40 hover:bg-slate-800 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-primary/30 active:scale-[0.98]",
  ghost:
    "text-slate-900 hover:bg-slate-100 hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30 active:scale-[0.98]",
  outline:
    "border border-slate-200 text-slate-900 hover:border-brand-primary/40 hover:bg-slate-50 hover:text-brand-primary hover:shadow-sm focus-visible:ring-2 focus-visible:ring-brand-primary/30 active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const buttonBase =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60";

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


