"use client";

import { useRef } from "react";
import { ArrowDownToLine } from "lucide-react";
import { track } from "@vercel/analytics";
import Kinetic from "@/components/Kinetic";
import { shock } from "@/lib/kinetic";
import { gsap, useGsap } from "@/lib/useGsap";
import type { Dictionary } from "@/lib/i18n";

export default function Hero({ t, cv }: { t: Dictionary["hero"]; cv: string }) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (q) => {
    gsap.from(q(".kin-c"), { yPercent: 70, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.05, delay: 0.1 });
    // The two lines of the name drift apart as the hero scrolls away
    q(".hero-line").forEach((line, i) =>
      gsap.to(line, {
        xPercent: i ? 14 : -14,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      })
    );
    const intro = setTimeout(() => shock(0, window.innerHeight * 0.7), 500);
    return () => clearTimeout(intro);
  });

  return (
    <section id="home" ref={ref} className="relative flex min-h-[68vh] flex-col pt-20 md:min-h-hero">
      <h1
        aria-label="Mario Ortega"
        className="gutter mt-auto cursor-pointer select-none whitespace-nowrap text-[18.9vw] leading-[0.8] tracking-[-0.02em]"
      >
        <Kinetic text="MARIO" className="hero-line kin-row h-[0.8em]" min={220} max={800} wide={1} idle />
        <Kinetic text="ORTEGA" className="hero-line kin-row h-[0.8em]" min={220} max={800} wide={1} idle />
      </h1>
      <div className="gutter mt-6 grid grid-cols-1 gap-x-10 gap-y-5 border-t border-line pb-9 pt-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{t.role}</h2>
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            <span className="font-semibold">{t.available}</span>
            <span className="text-muted">{t.where}</span>
          </p>
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-[46ch] text-[clamp(16px,1.5vw,21px)] leading-[1.45]">{t.tagline}</p>
          <a
            href={cv}
            download
            onClick={() => track("cv_download", { from: "hero" })}
            className="group inline-flex items-center gap-3 border border-foreground px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            {t.cv}
            <ArrowDownToLine size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
