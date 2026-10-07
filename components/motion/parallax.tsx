"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useIsMobile, usePrefersReducedMotion } from "./use-media-query";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Pixels travelled across the full scroll range. Negative moves with scroll. */
  distance?: number;
};

/** Translates children on Y while the wrapper crosses the viewport. */
export function Parallax({ children, className, distance = 120 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const travel = reduce ? 0 : mobile ? distance * 0.3 : distance;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [travel / 2, -travel / 2]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
