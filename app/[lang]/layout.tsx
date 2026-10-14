import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mona_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { Analytics } from "@vercel/analytics/next";
import { email, getDictionary, hasLocale, locales, siteUrl, socials } from "@/lib/i18n";
import "../globals.css";

// Variable on weight and width: the kinetic headlines animate both axes
const monaSans = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  const image = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "Mario Ortega, Full Stack Developer in Madrid" };
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: "MORTEGA DEV",
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "es" ? "es_ES" : "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [image.url] },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  // Structured data so search engines read the page as a person's profile
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mario Ortega",
    jobTitle: lang === "es" ? "Desarrollador Full Stack" : "Full Stack Developer",
    url: `${siteUrl}/${lang}`,
    email: `mailto:${email}`,
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
    sameAs: [socials.github, socials.linkedin],
    knowsLanguage: ["es", "en", "fr", "de"],
  };

  return (
    <html lang={lang} suppressHydrationWarning className={monaSans.variable}>
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-accent selection:text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <SmoothScrollProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Navbar lang={lang} t={t.nav} />
            {children}
            <Analytics />
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
