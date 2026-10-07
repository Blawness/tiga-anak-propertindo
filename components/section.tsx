import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";

type SectionProps = {
  id?: string;
  index?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  tone?: "paper" | "bone" | "ink";
  className?: string;
};

const toneClasses = {
  paper: "bg-paper text-ink",
  bone: "bg-bone text-ink",
  ink: "bg-ink text-paper",
};

export default function Section({
  id,
  index,
  title,
  eyebrow,
  description,
  children,
  tone = "paper",
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("section-y", toneClasses[tone], className)}>
      <div className="section-shell flex flex-col gap-16 md:gap-24">
        {title || eyebrow || description ? (
          <SectionHeading
            index={index}
            eyebrow={eyebrow}
            title={title}
            description={description}
            tone={tone === "ink" ? "dark" : "light"}
          />
        ) : null}
        {children}
      </div>
    </section>
  );
}
