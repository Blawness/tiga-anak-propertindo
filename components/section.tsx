import type { ReactNode } from "react";
import { FadeIn } from "./motion";
import { Badge } from "./ui/badge";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  align?: "left" | "center";
  padded?: boolean;
};

export default function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  align = "left",
  padded = true,
}: SectionProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <section id={id} className={padded ? "py-12 md:py-16" : ""}>
      <div className="section-shell flex w-full flex-col gap-8">
        {(title || description || eyebrow) && (
          <FadeIn className={`flex flex-col gap-3 ${alignment}`}>
            {eyebrow ? (
              <Badge
                className={`uppercase tracking-[0.18em] ${align === "center" ? "self-center" : "self-start"}`}
              >
                {eyebrow}
              </Badge>
            ) : null}
            {title ? (
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-3xl text-base text-slate-600 md:text-lg">
                {description}
              </p>
            ) : null}
          </FadeIn>
        )}
        <FadeIn delay={0.05} className="w-full">
          {children}
        </FadeIn>
      </div>
    </section>
  );
}

