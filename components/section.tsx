import type { ReactNode } from "react";

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
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <section
      id={id}
      className={`w-full ${padded ? "px-6 py-14 md:py-16" : ""}`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {(title || description || eyebrow) && (
          <div className={`flex flex-col gap-2 ${alignment}`}>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-3xl font-semibold text-brand-dark md:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-3xl text-base text-brand-navy/80 md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        )}
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}

