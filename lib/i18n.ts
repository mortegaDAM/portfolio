import { en } from "@/lib/dictionaries/en";
import { es } from "@/lib/dictionaries/es";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

const dictionaries = { en, es };
export type Dictionary = typeof en;

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export const siteUrl = "https://mortegadev.com";

export const email = "mario98.mo@gmail.com";

export const socials = {
  github: "https://github.com/mortegaDAM",
  linkedin: "https://www.linkedin.com/in/mario-ortega-navarro-898093198/",
};
