"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollLineProps = {
  children: ReactNode;
  className?: string;
  /** Classes for the vertical track, mainly its horizontal position. */
  lineClassName?: string;
};

/**
 * Wraps a vertical list and draws a hairline that fills (scaleY) with scroll
 * progress through the list.
 */
export function ScrollLine({ children, className, lineClassName }: ScrollLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn("absolute top-0 bottom-0 w-px bg-line", lineClassName)}
      >
        <motion.div className="h-full w-full origin-top bg-accent" style={{ scaleY }} />
      </div>
      {children}
    </div>
  );
}
