import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about"].map((path) => ({
    url: `${siteUrl}/en${path}`,
    lastModified: new Date(),
    alternates: { languages: { en: `${siteUrl}/en${path}`, es: `${siteUrl}/es${path}` } },
  }));
}
