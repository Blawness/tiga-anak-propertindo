"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { DURATION, EASE_LUXE } from "./ease";
import { useIsMobile, usePrefersReducedMotion } from "./use-media-query";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Frame classes. Must give the frame a size, e.g. "aspect-[4/5]". */
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Percentage the image drifts inside the frame (0–15). */
  strength?: number;
  /** Clip-path wipe from the bottom when the frame enters the viewport. */
  reveal?: boolean;
};

/**
 * Image that drifts inside a fixed frame on scroll. It is scaled up just enough
 * that the drift never exposes the frame edges. Frame size is pure CSS: no CLS.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority,
  strength = 8,
  reveal = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const travel = reduce ? 0 : mobile ? strength * 0.5 : strength;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-travel}%`, `${travel}%`]);
  const scale = 1 + (travel * 2.4) / 100;

  // The viewport observer sits on the unclipped frame: Chromium's
  // IntersectionObserver honours the target's own clip-path, so a fully
  // clipped element would never report as visible.
  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={reveal ? "hidden" : false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden bg-bone"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          visible: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: reduce ? 0 : DURATION.slow, ease: EASE_LUXE },
          },
        }}
      >
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", imageClassName)}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
