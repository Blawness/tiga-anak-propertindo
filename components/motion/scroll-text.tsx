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
  as?: "p" | "h2";
};

/**
 * Lowest opacity a word sits at before it lights up. 0.5 keeps the dimmed
 * words above 3:1 contrast (large-text AA) on both paper and ink.
 */
const DIM = 0.5;

/**
 * Large statement whose words light up one after another as the block scrolls
 * through the viewport. Only opacity is animated; assistive tech reads the
 * plain sentence from a visually hidden copy.
 */
export function ScrollText({ text, className, as = "p" }: ScrollTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");
  const Tag = as;

  return (
    <div ref={ref}>
      <Tag className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden>
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
        </span>
      </Tag>
    </div>
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
  const opacity = useTransform(progress, range, [DIM, 1]);
  return (
    <>
      <motion.span style={isStatic ? undefined : { opacity }}>{children}</motion.span>{" "}
    </>
  );
}
