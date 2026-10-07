import type { ReactNode } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

type PagesLayoutProps = {
  children: ReactNode;
};

export default function PagesLayout({ children }: PagesLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#konten"
        className="eyebrow sr-only z-[60] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Lewati ke konten
      </a>
      <Header />
      <main id="konten" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
