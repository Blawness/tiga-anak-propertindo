import type { ReactNode } from "react";

type ComingSoonLayoutProps = {
  children: ReactNode;
};

export default function ComingSoonLayout({ children }: ComingSoonLayoutProps) {
  return (
    <main className="flex min-h-svh items-center bg-ink py-20 text-paper">
      <div className="section-shell">{children}</div>
    </main>
  );
}
