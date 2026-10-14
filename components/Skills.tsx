"use client";

import { useRef } from "react";
import Giant from "@/components/Giant";
import Marquee from "@/components/Marquee";
import type { Dictionary } from "@/lib/i18n";
import { gsap, ScrollTrigger, useGsap } from "@/lib/useGsap";

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/&";

// Decodes a heading from random glyphs into its real text
function scramble(el: HTMLElement) {
  const final = el.dataset.text ?? "";
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / 800);
    el.textContent = [...final]
      .map((c, i) => (c === " " || i < p * final.length ? c : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]))
      .join("");
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function Skills({ t }: { t: Dictionary["skills"] }) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (q) => {
    q(".giant").forEach((el) =>
      gsap.fromTo(el, { xPercent: -8 }, { xPercent: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } })
    );
    q(".skill-title").forEach((el) =>
      ScrollTrigger.create({ trigger: el, start: "top 88%", onEnter: () => scramble(el), onEnterBack: () => scramble(el) })
    );
    q(".skill-tools").forEach((el) =>
      gsap.from(el.children, { y: 26, opacity: 0, duration: 0.7, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: el, start: "top 90%" } })
    );
  });

  return (
    <section id="skills" ref={ref} className="relative">
      <Giant text={t.heading} />

      <Marquee items={t.arsenal} />

      {t.groups.map((group) => (
        <div key={group.title} className="gutter grid grid-cols-1 gap-x-[6vw] gap-y-3 border-b border-line py-[34px] md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h3 className="skill-title cond text-[clamp(22px,2.7vw,40px)] font-bold uppercase leading-none" data-text={group.title} translate="no">
            {group.title}
          </h3>
          <div>
            {group.body && <p className="mb-3.5 max-w-[62ch] leading-relaxed text-muted">{group.body}</p>}
            <ul className="skill-tools flex flex-wrap gap-x-5 gap-y-1 text-[clamp(18px,2.16vw,31px)] leading-[1.2]" translate="no">
              {group.tools.map((tool) => (
                <li key={tool} className="tool">{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
