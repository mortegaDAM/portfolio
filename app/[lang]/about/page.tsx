import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutView from "@/components/AboutView";
import { getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { en: "/en/about", es: "/es/about", "x-default": "/en/about" },
    },
    openGraph: { url: `/${lang}/about`, title: t.meta.aboutTitle, description: t.meta.aboutDescription, images: ["/opengraph-image.png"] },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return <AboutView t={t.about} cv={t.cvFile} cvLabel={t.hero.cv} />;
}
