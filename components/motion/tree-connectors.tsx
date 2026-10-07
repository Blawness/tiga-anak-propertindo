"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "./ease";
import { useIsDesktop, usePrefersReducedMotion } from "./use-media-query";

type Branch = { d: string; depth: number; end: { x: number; y: number } };

type TreeConnectorsProps = {
  children: ReactNode;
  className?: string;
  /** Corner radius of each elbow, in px. */
  radius?: number;
};

const DRAW_DURATION = 1.2;
const DEPTH_DELAY = 0.75;

/** Position of `el` inside `root`, ignoring CSS transforms (reveal animations). */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/** Vertical -> horizontal -> vertical elbow with rounded corners. */
function elbow(x1: number, y1: number, x2: number, y2: number, midY: number, r: number) {
  const dx = x2 - x1;
  if (Math.abs(dx) < 1) return `M ${x1} ${y1} V ${y2}`;
  const dir = Math.sign(dx);
  const rr = Math.min(r, Math.abs(dx) / 2, midY - y1, y2 - midY);
  return [
    `M ${x1} ${y1}`,
    `V ${midY - rr}`,
    `Q ${x1} ${midY} ${x1 + dir * rr} ${midY}`,
    `H ${x2 - dir * rr}`,
    `Q ${x2} ${midY} ${x2} ${midY + rr}`,
    `V ${y2}`,
  ].join(" ");
}

/**
 * Draws parent -> child reporting lines between elements marked with
 * `data-tree-id` / `data-tree-parent`, as one SVG overlay with rounded elbows.
 * Lines are measured from layout (ResizeObserver) and drawn with pathLength,
 * trunk first, then each deeper level. Desktop only; children stay as-is.
 */
export function TreeConnectors({ children, className, radius = 18 }: TreeConnectorsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduce = usePrefersReducedMotion();
  const [layout, setLayout] = useState<{ w: number; h: number; branches: Branch[] } | null>(
    null,
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !desktop) return;

    const measure = () => {
      const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-tree-id]"));
      const byId = new Map(nodes.map((n) => [n.dataset.treeId!, n]));
      const depthOf = (id: string): number => {
        const parent = byId.get(id)?.dataset.treeParent;
        return parent ? depthOf(parent) + 1 : 0;
      };

      const groups = new Map<string, HTMLElement[]>();
      for (const node of nodes) {
        const parent = node.dataset.treeParent;
        if (!parent) continue;
        groups.set(parent, [...(groups.get(parent) ?? []), node]);
      }

      const branches: Branch[] = [];
      for (const [parentId, kids] of groups) {
        const parentEl = byId.get(parentId);
        if (!parentEl) continue;
        const p = offsetWithin(parentEl, root);
        // Half-pixel offset keeps 1px strokes crisp.
        const px = Math.round(p.x + p.w / 2) + 0.5;
        const py = p.y + p.h;
        const kidBoxes = kids.map((k) => offsetWithin(k, root));
        const firstTop = Math.min(...kidBoxes.map((b) => b.y));
        const midY = Math.round(py + (firstTop - py) / 2) + 0.5;
        const depth = depthOf(parentId);
        for (const b of kidBoxes) {
          const cx = Math.round(b.x + b.w / 2) + 0.5;
          branches.push({
            d: elbow(px, py, cx, b.y, midY, radius),
            depth,
            end: { x: cx, y: b.y },
          });
        }
      }

      setLayout({ w: root.offsetWidth, h: root.offsetHeight, branches });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [desktop, radius]);

  const show = desktop && layout;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {show ? (
        <motion.svg
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-visible text-accent"
          width={layout.w}
          height={layout.h}
          viewBox={`0 0 ${layout.w} ${layout.h}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {layout.branches.map((branch, i) => {
            const delay = reduce ? 0 : branch.depth * DEPTH_DELAY;
            const duration = reduce ? 0 : DRAW_DURATION;
            return (
              <g key={i}>
                <motion.path
                  d={branch.d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: {
                        pathLength: { duration, delay, ease: EASE_LUXE },
                        opacity: { duration: 0.01, delay },
                      },
                    },
                  }}
                />
                <motion.circle
                  cx={branch.end.x}
                  cy={branch.end.y}
                  r={3}
                  fill="currentColor"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.4, delay: delay + duration * 0.9 },
                    },
                  }}
                />
              </g>
            );
          })}
        </motion.svg>
      ) : null}
      {children}
    </div>
  );
}
