import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export function buildMetadata(overrides?: Metadata): Metadata {
  const baseTitle = {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  };

  const base: Metadata = {
    title: baseTitle,
    description: siteConfig.description,
    keywords: [
      "properti",
      "developer",
      "Indonesia",
      "tata kelola",
      "kemitraan",
      "perizinan",
      "konstruksi",
      "PT Tiga Anak Propertindo",
    ],
    authors: [{ name: "PT Tiga Anak Propertindo" }],
    creator: "PT Tiga Anak Propertindo",
    publisher: "PT Tiga Anak Propertindo",
    metadataBase: new URL("https://tapropertindo.com"),
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: "/android-chrome-512x512.png",
          width: 512,
          height: 512,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: siteConfig.name,
      description: siteConfig.description,
      images: ["/android-chrome-512x512.png"],
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "manifest",
          url: "/site.webmanifest",
        },
      ],
    },
    manifest: "/site.webmanifest",
  };

  if (!overrides) return base;

  const mergedTitle =
    typeof overrides.title === "string"
      ? { ...baseTitle, default: overrides.title }
      : overrides.title ?? baseTitle;

  return {
    ...base,
    ...overrides,
    title: mergedTitle,
    description: overrides.description ?? base.description,
  };
}
