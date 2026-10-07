import { cn } from "@/lib/utils";
import { Reveal, SplitText } from "./motion";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
};

/** Editorial section opener: numbered eyebrow, masked title, muted lead. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  tone = "light",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-paper/65" : "text-ink/65";

  return (
    <div className={cn("flex flex-col gap-6 md:gap-8", className)}>
      {eyebrow ? (
        <Reveal y={12}>
          <p
            className={cn(
              "eyebrow flex items-center gap-4",
              tone === "dark" ? "text-sand-soft" : "text-accent",
            )}
          >
            {index ? <span>{index}</span> : null}
            <span aria-hidden className="h-px w-10 bg-current" />
            <span>{eyebrow}</span>
          </p>
        </Reveal>
      ) : null}
      {title ? (
        <SplitText text={title} className={cn("text-h2 max-w-[18ch]", titleClassName)} />
      ) : null}
      {description ? (
        <Reveal delay={0.2} y={20}>
          <p className={cn("text-lead max-w-[44ch]", muted)}>{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
