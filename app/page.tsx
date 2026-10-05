import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="page relative w-full">
      <Hero />
      <Work />
      <Skills />
      <Contact />
    </main>
  );
}
