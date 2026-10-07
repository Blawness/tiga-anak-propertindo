import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ParallaxImage, Reveal } from "./motion";
import SectionHeading from "./section-heading";

type SectionWithImageProps = {
  id?: string;
  index?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  imageRatio?: "square" | "landscape" | "portrait";
  tone?: "paper" | "bone";
};

const ratioClass = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
};

/** Asymmetric 12-column split: parallax image on one side, copy on the other. */
export default function SectionWithImage({
  id,
  index,
  title,
  eyebrow,
  description,
  children,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  imageRatio = "portrait",
  tone = "paper",
}: SectionWithImageProps) {
  const imageRight = imagePosition === "right";

  return (
    <section id={id} className={cn("section-y", tone === "bone" ? "bg-bone" : "bg-paper")}>
      <div className="section-shell grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div
          className={cn(
            "lg:col-span-5",
            imageRight ? "lg:order-2 lg:col-start-8" : "lg:order-1",
          )}
        >
          <ParallaxImage
            src={imageSrc}
            alt={imageAlt}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className={ratioClass[imageRatio]}
          />
        </div>

        <div
          className={cn(
            "flex flex-col gap-12 lg:col-span-6",
            imageRight ? "lg:order-1" : "lg:order-2 lg:col-start-7",
          )}
        >
          <SectionHeading
            index={index}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          {children ? <Reveal delay={0.15}>{children}</Reveal> : null}
        </div>
      </div>
    </section>
  );
}
