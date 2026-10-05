"use client";

import { useRef } from "react";
import { Flame } from "lucide-react";
import Kinetic from "@/components/Kinetic";
import Magnetic from "@/components/Magnetic";
import { email } from "@/lib/content";
import { gsap, useGsap } from "@/lib/useGsap";

const blocks = [
  {
    title: "A New Chapter",
    body: "Having just graduated from my software development studies, I am bringing a fresh perspective and an insatiable hunger for learning. I don't close doors to any specialization—whether it's frontend polishing, backend architecture, or cloud infrastructure, I am ready to dive deep and contribute from day one.",
  },
  {
    title: "Leadership & Synergy",
    body: "Before my journey into programming, I built a successful career where I climbed the ranks through sheer responsibility and dedication. I successfully managed and led teams of up to 20 people. This experience gave me invaluable soft skills: conflict resolution, empathetic leadership, cross-functional teamwork, and the ability to maintain high morale under pressure.",
  },
  {
    title: "The Missing Piece",
    body: "Combining my proven track record of responsibility and team leadership with my newly acquired technical skills makes me a unique asset. I don't just write code; I understand team dynamics, project lifecycles, and how to align individual efforts with business goals. Let's build something extraordinary together.",
    cta: true,
  },
];

const line = "kin-row h-[0.86em]";

export default function AboutPage() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (q) => {
    gsap.from(q(".about-intro"), { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", delay: 0.3 });
    q(".about-row").forEach((el) =>
      gsap.from(el.children, { y: 34, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 88%" } })
    );
  });

  return (
    <main ref={ref} className="page min-h-hero relative w-full pt-16">
      <section className="gutter pb-16 pt-20 md:pt-28">
        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-accent">ABOUT ME</h4>
        <h1
          aria-label="Beyond the code"
          className="mb-8 mt-[18px] select-none text-[clamp(40px,10.35vw,180px)] leading-[0.86] tracking-[-0.02em]"
        >
          <Kinetic text="BEYOND" className={line} min={250} max={800} wide={1} idle />
          <Kinetic text="THE CODE" className={line} min={250} max={800} wide={1} idle />
        </h1>
        <p className="about-intro max-w-[62ch] text-[clamp(16px,1.5vw,21px)] leading-[1.5]">
          I am a recently graduated Full Stack Developer, deeply motivated to kickstart my career in software engineering across any technological field. Beyond a solid technical foundation, I bring proven leadership and teamwork experience from my previous career, where I successfully managed and scaled teams of up to 20 people. My analytical mindset allows me to bridge the gap between business requirements and scalable, maintainable code.
        </p>
      </section>

      <section className="border-t border-line">
        {blocks.map((block) => (
          <div key={block.title} className="about-row gutter grid grid-cols-1 gap-x-[6vw] gap-y-4 border-b border-line py-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <h3 className="cond text-[clamp(22px,2.7vw,40px)] font-bold uppercase leading-none">{block.title}</h3>
            <div>
              <p className="max-w-[62ch] leading-relaxed text-muted">{block.body}</p>
              {block.cta && (
                <div className="mt-8">
                  <Magnetic>
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-3 bg-foreground px-[34px] py-[18px] text-[13px] font-bold uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:bg-accent active:scale-[0.98]"
                    >
                      Get in Touch <Flame size={16} />
                    </a>
                  </Magnetic>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
