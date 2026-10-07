"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { ParallaxImage } from "./parallax-image";
import { useIsDesktop, usePrefersReducedMotion } from "./use-media-query";

type GalleryContextValue = {
  progress: MotionValue<number> | null;
  pinned: boolean;
};

const GalleryContext = createContext<GalleryContextValue>({
  progress: null,
  pinned: false,
});

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** Classes for the sticky viewport (background, colour). */
  viewportClassName?: string;
  /** Hairline progress indicator at the bottom while pinned. */
  showProgress?: boolean;
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
  viewportClassName,
  showProgress = true,
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
      setDistance(
        Math.max(0, track.scrollWidth - document.documentElement.clientWidth),
      );
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
    <GalleryContext.Provider value={{ progress: scrollYProgress, pinned }}>
      <div
        ref={sectionRef}
        className={cn("relative", className)}
        style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      >
        <div
          className={cn(
            pinned && "sticky top-0 flex h-screen flex-col justify-center overflow-hidden",
            viewportClassName,
          )}
        >
          <motion.div
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className={cn("flex flex-col", pinned && "w-max flex-row", trackClassName)}
          >
            {children}
          </motion.div>

          {pinned && showProgress ? (
            <div
              aria-hidden
              className="section-shell absolute inset-x-0 bottom-10 mx-auto"
            >
              <div className="h-px w-full bg-current/15">
                <motion.div
                  className="h-full w-full origin-left bg-current"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </GalleryContext.Provider>
  );
}

type GalleryImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

/**
 * Image for a HorizontalScroll panel. While pinned it drifts on X against the
 * track for depth; when stacked it falls back to the vertical ParallaxImage.
 */
export function GalleryImage({ src, alt, sizes, className }: GalleryImageProps) {
  const { progress, pinned } = useContext(GalleryContext);
  if (!pinned || !progress) {
    return <ParallaxImage src={src} alt={alt} sizes={sizes} className={className} />;
  }
  return (
    <PinnedImage src={src} alt={alt} sizes={sizes} className={className} progress={progress} />
  );
}

function PinnedImage({
  progress,
  src,
  alt,
  sizes,
  className,
}: GalleryImageProps & { progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], ["9%", "-9%"]);
  return (
    <div className={cn("relative overflow-hidden bg-bone", className)}>
      <motion.div className="absolute inset-0" style={{ x, scale: 1.25 }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
