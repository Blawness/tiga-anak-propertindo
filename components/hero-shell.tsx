"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "./motion/ease";
import { useIsMobile, usePrefersReducedMotion } from "./motion/use-media-query";

type HeroShellProps = {
  image: string;
  imageAlt: string;
  children: ReactNode;
  className?: string;
};

/**
 * Multi-layer hero: the photo drifts down slower than the page while the
 * foreground copy lifts away and fades. Parallax is reduced on mobile and
 * removed for reduced motion. Only transform/opacity are animated.
 */
export default function HeroShell({ image, imageAlt, children, className }: HeroShellProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const factor = reduce ? 0 : mobile ? 0.35 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", `${32 * factor}%`]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", `${-18 * factor}%`]);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className={cn("relative isolate overflow-hidden bg-ink text-paper", className)}
    >
      <motion.div aria-hidden={imageAlt === ""} className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.16 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.4, ease: EASE_LUXE }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/45"
      />

      <motion.div className="relative h-full" style={{ y: fgY, opacity: fgOpacity }}>
        {children}
      </motion.div>
    </section>
  );
}
