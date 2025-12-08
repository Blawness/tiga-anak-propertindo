import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "../lib/meta";
import "../styles/globals.css";

export const metadata: Metadata = buildMetadata();

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id">
      <body className="bg-brand-light text-brand-navy antialiased">
        {children}
      </body>
    </html>
  );
}

