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

