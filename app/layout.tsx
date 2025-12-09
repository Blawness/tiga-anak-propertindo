import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, League_Spartan } from "next/font/google";
import { buildMetadata } from "../lib/meta";
import "../styles/globals.css";

const headingFont = League_Spartan({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="bg-slate-50 text-slate-700 antialiased">
        {children}
      </body>
    </html>
  );
}

