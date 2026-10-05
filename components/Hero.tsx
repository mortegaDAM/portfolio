"use client";

import { useRef } from "react";
import Kinetic from "@/components/Kinetic";
import { shock } from "@/lib/kinetic";
import { gsap, useGsap } from "@/lib/useGsap";

export default function Hero() {
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
      <div className="gutter mt-6 grid grid-cols-1 gap-x-10 gap-y-3 border-t border-line pb-9 pt-6 md:grid-cols-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          FullStack Software Developer | Junior
        </h2>
        <p className="max-w-[46ch] text-[clamp(16px,1.5vw,21px)] leading-[1.45]">
          Transforming complex business requirements into scalable, high-performance web experiences. Full Stack Developer bridging the gap between clean code and real-world impact.
        </p>
      </div>
    </section>
  );
}
