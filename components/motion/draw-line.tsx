"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { DURATION, EASE_LUXE } from "./ease";

type DrawLineProps = {
  axis: "x" | "y";
  className?: string;
  style?: CSSProperties;
  /** Where the stroke grows from. */
  origin?: "start" | "center";
  delay?: number;
};

/**
 * Hairline connector that draws itself (scaleX / scaleY) when it enters the
 * viewport. Size and position come from className/style.
 */
export function DrawLine({ axis, className, style, origin = "start", delay = 0 }: DrawLineProps) {
  const transformOrigin =
    origin === "center" ? "center" : axis === "x" ? "left center" : "center top";
  const hidden = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const shown = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };

  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ ...style, transformOrigin }}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: DURATION.base, ease: EASE_LUXE, delay }}
    />
  );
}
