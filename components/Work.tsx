"use client";

import { useRef } from "react";
import Kinetic from "@/components/Kinetic";
import Shot from "@/components/Shot";
import { projects } from "@/lib/content";
import { gsap, useGsap } from "@/lib/useGsap";

export default function Work() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (q) => {
    q(".giant").forEach((el) =>
      gsap.fromTo(el, { xPercent: 8 }, { xPercent: -4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } })
    );
    q(".work-title").forEach((el, i) =>
      gsap.fromTo(
        el,
        { x: () => window.innerWidth * (i % 2 ? 0.3 : 0.18) },
        { x: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 55%", scrub: 0.6, invalidateOnRefresh: true } }
      )
    );
    q(".work-txt").forEach((el) =>
      gsap.from(el.children, { y: 34, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 82%" } })
    );
    // Screenshots travel at different speeds; the desktop one opens like a curtain
    q("[data-speed]").forEach((el) => {
      const s = Number(el.dataset.speed);
      gsap.fromTo(el, { yPercent: s * 12 }, { yPercent: -s * 12, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    q(".work-main").forEach((el) =>
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el.parentElement, start: "top 78%" } }
      )
    );
    q(".work-mob").forEach((el) =>
      gsap.from(el, { scale: 0.6, opacity: 0, rotation: 8, duration: 1, ease: "back.out(1.4)", scrollTrigger: { trigger: el.parentElement, start: "top 60%" } })
    );
  });

  return (
    <section id="work" ref={ref} className="relative">
      <div className="gutter pb-6 pt-28">
      <Kinetic
        as="h2"
        text="WORK"
        className="giant kin-row h-[0.84em] select-none text-[19.8vw] leading-[0.84] tracking-[-0.02em]"
        min={200}
        max={800}
        wide={1}
        sw
      />
      </div>

      {projects.map((p) => (
        <article key={p.n}>
          <div className="gutter grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 border-t border-line py-6">
            <span className="text-sm font-semibold text-accent">{p.n}</span>
            <Kinetic
              as="h3"
              text={p.title}
              className="work-title text-[clamp(27px,6.84vw,119px)] leading-[0.92] tracking-[-0.02em] will-change-transform"
              min={360}
              max={800}
            />
            <p className="col-start-2 max-w-[60ch] text-base leading-normal text-muted">{p.summary}</p>
          </div>

          <div className="gutter grid grid-cols-1 items-start gap-x-[6vw] gap-y-10 pb-28 pt-3 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="work-txt">
              <h4 className="mb-2.5 mt-6 text-[15px] font-bold tracking-[0.1em]">
                {p.heading[0]}
                <span className="text-accent">{p.heading[1]}</span>
                {p.heading[2]}
              </h4>
              <p className="max-w-[58ch] text-base leading-relaxed text-muted">{p.body}</p>
              <h4 className="mb-2.5 mt-6 text-[15px] font-bold tracking-[0.1em]">
                THE <span className="text-accent">STACK</span>
              </h4>
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((tool) => (
                  <li key={tool} className="border border-line px-3 py-1.5 text-xs font-semibold">{tool}</li>
                ))}
              </ul>
              <dl className="mt-6 grid grid-cols-2 justify-start gap-x-6 gap-y-2.5 sm:grid-cols-[repeat(4,auto)]">
                {p.stats.map(([value, label]) => (
                  <div key={label}>
                    <dd className="text-[21px] font-bold">{value}</dd>
                    <dt className="text-[11px] uppercase tracking-[0.09em] text-muted">{label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative pb-[9%] pr-[12%]">
              <div className="work-main relative overflow-hidden border border-line" data-speed="0.5">
                <Shot shot={p.main} alt={`${p.title} desktop`} sizes="(min-width: 768px) 50vw, 85vw" className="h-auto w-full" blur={p.blur?.main} />
              </div>
              <div className="work-mob absolute bottom-0 right-0 aspect-[9/16] w-[22%] overflow-hidden border border-line shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)]" data-speed="-1.3">
                <Shot shot={p.mobile} alt={`${p.title} mobile`} sizes="(min-width: 768px) 13vw, 20vw" className="h-full w-full object-cover object-top" blur={p.blur?.mobile} />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
