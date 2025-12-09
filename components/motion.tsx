"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

const defaultDuration = 0.45;

const fadeInConfig = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = defaultDuration,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeInConfig}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

type GrowYProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

// Simple grow animation for connectors/lines.
export function GrowY({
  children,
  className,
  delay = 0,
  duration = 0.4,
}: GrowYProps) {
  return (
    <motion.div
      className={className}
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      style={{ transformOrigin: "top" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}


