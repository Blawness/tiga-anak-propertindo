import type { ReactNode } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

type PagesLayoutProps = {
  children: ReactNode;
};

export default function PagesLayout({ children }: PagesLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

