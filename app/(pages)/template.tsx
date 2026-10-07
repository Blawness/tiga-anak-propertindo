import type { ReactNode } from "react";

/**
 * Re-mounts on every navigation, so the CSS `page-in` animation plays per route.
 * Pure CSS keeps it a Server Component and lets content paint before hydration.
 */
export default function PagesTemplate({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
