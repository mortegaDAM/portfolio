import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main className="page relative w-full">
      <Hero t={t.hero} cv={t.cvFile} />
      <Work t={t.work} />
      <Journey t={t.journey} />
      <Skills t={t.skills} />
      <Contact t={t.contact} footer={t.footer} cv={t.cvFile} />
    </main>
  );
}
