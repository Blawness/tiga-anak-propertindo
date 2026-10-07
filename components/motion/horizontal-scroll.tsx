"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsDesktop, usePrefersReducedMotion } from "./use-media-query";

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** Rendered inside the sticky viewport, above the track. */
  header?: ReactNode;
};

/**
 * Pinned horizontal gallery on desktop: the wrapper is as tall as the track is
 * wide, the inner viewport is `position: sticky`, and the track translates on X
 * with scroll progress. On mobile / reduced motion it is a plain vertical stack,
 * so it stays usable without any pinning.
 */
export function HorizontalScroll({
  children,
  className,
  trackClassName,
  header,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const desktop = useIsDesktop();
  const reduce = usePrefersReducedMotion();
  const pinned = desktop && !reduce;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!pinned || !track) return;
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - document.documentElement.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <div
      ref={sectionRef}
      className={cn("relative", className)}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={cn(
          pinned && "sticky top-0 flex h-screen flex-col justify-center overflow-hidden",
        )}
      >
        {header}
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={cn(
            "flex flex-col",
            pinned && "w-max flex-row",
            trackClassName,
          )}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
