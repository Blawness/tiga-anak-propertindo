"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./use-media-query";

type ScrollTextProps = {
  text: string;
  className?: string;
};

/**
 * Large statement whose words light up one after another as the block scrolls
 * through the viewport. Only opacity is animated.
 */
export function ScrollText({ text, className }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          static={reduce}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  static: isStatic,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  static: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span aria-hidden style={isStatic ? undefined : { opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
