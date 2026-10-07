"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "./use-media-query";

type ScrollScaleProps = {
  children: ReactNode;
  className?: string;
  /** Starting scale while the block enters the viewport. */
  from?: number;
};

/**
 * Scales a block from `from` to 1 as it travels from the bottom of the
 * viewport to its centre, e.g. an inset card that opens up to full bleed.
 */
export function ScrollScale({ children, className, from = 0.9 }: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : from, 1]);

  return (
    <motion.div ref={ref} className={cn("origin-center", className)} style={{ scale }}>
      {children}
    </motion.div>
  );
}
