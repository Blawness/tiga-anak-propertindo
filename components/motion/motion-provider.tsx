"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "./use-media-query";

/**
 * Global motion setup:
 * - MotionConfig reducedMotion="user" drops transform animations (keeps opacity)
 *   for visitors who prefer reduced motion.
 * - Lenis smooth scroll only runs when motion is allowed. It drives native scroll,
 *   so Next.js scroll restoration and `position: sticky` keep working.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduceMotion ? null : (
        <ReactLenis root options={{ lerp: 0.09, anchors: true }} />
      )}
      {children}
    </MotionConfig>
  );
}
