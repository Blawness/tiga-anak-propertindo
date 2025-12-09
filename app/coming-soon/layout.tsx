import type { ReactNode } from "react";

type ComingSoonLayoutProps = {
  children: ReactNode;
};

export default function ComingSoonLayout({ children }: ComingSoonLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
}

