"use client";

import { useRef } from "react";
import { ArrowDownToLine, Mail } from "lucide-react";
import Kinetic from "@/components/Kinetic";
import Magnetic from "@/components/Magnetic";
import TrackedLink from "@/components/TrackedLink";
import { email } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";
import { gsap, useGsap } from "@/lib/useGsap";

const line = "kin-row h-[0.86em]";

type Props = { t: Dictionary["about"]; cv: string; cvLabel: string };

export default function AboutView({ t, cv, cvLabel }: Props) {
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
        <h1 aria-label={t.label} className="mb-8 select-none text-[clamp(40px,10.35vw,180px)] leading-[0.86] tracking-[-0.02em]">
          <Kinetic text={t.lines[0]} className={line} min={250} max={800} wide={1} idle fit />
          <Kinetic text={t.lines[1]} className={line} min={250} max={800} wide={1} idle fit />
        </h1>
        <p className="about-intro max-w-[62ch] text-[clamp(16px,1.5vw,21px)] leading-[1.5]">{t.intro}</p>
      </section>

      <section className="border-t border-line">
        {t.blocks.map((block, i) => (
          <div key={block.title} className="about-row gutter grid grid-cols-1 gap-x-[6vw] gap-y-4 border-b border-line py-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <h2 className="cond text-[clamp(22px,2.7vw,40px)] font-bold uppercase leading-none">{block.title}</h2>
            <div>
              <p className="max-w-[62ch] leading-relaxed text-muted">{block.body}</p>
              {i === t.blocks.length - 1 && (
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <Magnetic>
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-3 bg-foreground px-[34px] py-[18px] text-[13px] font-bold uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:bg-accent active:scale-[0.98]"
                    >
                      {t.cta} <Mail size={16} />
                    </a>
                  </Magnetic>
                  <TrackedLink
                    href={cv}
                    download
                    event="cv_download"
                    data={{ from: "about" }}
                    className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
                  >
                    {cvLabel}
                    <ArrowDownToLine size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  </TrackedLink>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
