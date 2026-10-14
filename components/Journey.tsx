"use client";

import { useRef } from "react";
import Giant from "@/components/Giant";
import type { Dictionary } from "@/lib/i18n";
import { gsap, useGsap } from "@/lib/useGsap";

export default function Journey({ t }: { t: Dictionary["journey"] }) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (q) => {
    q(".giant").forEach((el) =>
      gsap.fromTo(el, { xPercent: -6 }, { xPercent: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } })
    );
    // The timeline draws itself as you read down it
    const list = q(".journey-list")[0];
    gsap.fromTo(q(".journey-fill"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: true } });
    q(".journey-row").forEach((row) => {
      gsap.from(row.querySelector(".journey-years"), { xPercent: -12, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 80%" } });
      gsap.from(row.querySelector(".journey-body"), { y: 24, opacity: 0, duration: 1, delay: 0.1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 80%" } });
    });
  });

  return (
    <section id="journey" ref={ref} className="relative pb-28">
      <Giant text={t.heading} />
      <ol className="journey-list relative border-t border-line">
        <span className="pointer-events-none absolute bottom-0 left-[var(--gutter)] top-0 w-px bg-line" aria-hidden="true">
          <span className="journey-fill block h-full w-full origin-top bg-accent" />
        </span>
        {t.items.map((item) => (
          <li
            key={item.years + item.title}
            className="journey-row gutter relative grid grid-cols-1 gap-x-[6vw] gap-y-3 border-b border-line py-9 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
          >
            <span
              className={`absolute left-[var(--gutter)] top-[46px] h-2.5 w-2.5 -translate-x-1/2 ${item.now ? "bg-ok" : "bg-accent"}`}
              aria-hidden="true"
            />
            <span className={`journey-years cond pl-7 text-[clamp(30px,4.2vw,68px)] font-bold leading-none ${item.now ? "text-accent" : ""}`}>
              {item.years}
            </span>
            <div className="journey-body pl-7 md:pl-0">
              <h3 className="text-[clamp(19px,1.8vw,26px)] font-bold leading-tight">{item.title}</h3>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{item.place}</p>
              <p className="mt-3 max-w-[56ch] leading-relaxed text-muted">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
