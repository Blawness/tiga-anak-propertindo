"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query without setState-in-effect.
 * The server snapshot is always `false`, so markup must look right with that default.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
