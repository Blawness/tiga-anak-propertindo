"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FadeIn } from "./motion";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type SectionWithImageProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center";
  padded?: boolean;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  imageRatio?: "square" | "landscape" | "portrait";
};

export default function SectionWithImage({
  id,
  title,
  eyebrow,
  description,
  children,
  align = "left",
  padded = true,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  imageRatio = "landscape",
}: SectionWithImageProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  const ratioClass = {
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
  }[imageRatio];

  const layoutOrder =
    imagePosition === "right"
      ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
      : "";

  return (
    <section id={id} className={padded ? "py-12 md:py-16" : ""}>
      <div
        className={cn(
          "section-shell grid w-full gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center",
          layoutOrder,
        )}
      >
        {/* Image */}
        <FadeIn className="w-full">
          <div className={cn("relative overflow-hidden rounded-3xl border border-slate-200 bg-white/60 shadow-sm", ratioClass)}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 to-transparent" />
          </div>
        </FadeIn>

        {/* Content */}
        <div className="w-full">
          <FadeIn className={cn("flex flex-col gap-4", alignment)} delay={0.1}>
            {eyebrow ? (
              <Badge
                className={cn(
                  "uppercase tracking-[0.18em]",
                  align === "center" ? "self-center" : "self-start",
                )}
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
              <p className="max-w-xl text-base text-slate-600 md:text-lg">
                {description}
              </p>
            ) : null}
            {children ? <div className="mt-2 w-full">{children}</div> : null}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
