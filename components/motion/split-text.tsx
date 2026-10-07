"use client";

import { motion } from "motion/react";
import { DURATION, EASE_LUXE } from "./ease";

type SplitTextProps = {
  /** Plain text. Use "\n" to force a line break. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  /** "mount" plays immediately (hero), "inView" waits for the viewport. */
  trigger?: "mount" | "inView";
};

/**
 * Masked word-by-word reveal: each word sits in an overflow-hidden mask and
 * slides up from 110%. Screen readers get the whole sentence from a
 * visually hidden copy, so the split spans stay aria-hidden.
 */
export function SplitText({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "inView",
}: SplitTextProps) {
  const Tag = motion[as];
  const lines = text.split("\n");
  const animateProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.4 },
        };

  let wordIndex = 0;
  const content = lines.map((line, lineIndex) => {
    const words = line.split(" ");
    return (
      <span key={lineIndex} className="block">
        {words.map((word, i) => {
          const order = wordIndex++;
          return (
            <span key={i} className="mask-line">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%" },
                  visible: {
                    y: "0%",
                    transition: {
                      duration: DURATION.base,
                      ease: EASE_LUXE,
                      delay: delay + order * stagger,
                    },
                  },
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    );
  });

  return (
    <Tag className={className} {...animateProps}>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden>{content}</span>
    </Tag>
  );
}
