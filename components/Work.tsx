"use client";

import { useRef } from "react";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import { track } from "@vercel/analytics";
import Giant from "@/components/Giant";
import Kinetic from "@/components/Kinetic";
import Shot from "@/components/Shot";
import type { Dictionary } from "@/lib/i18n";
import type { Project } from "@/lib/dictionaries/types";
import { gsap, useGsap } from "@/lib/useGsap";

type T = Dictionary["work"];

// Widths of the lines in the redacted document, as % of the page: dark ones are blacked out
const REDACTED = [
  [62, 1], [88, 0], [74, 1], [40, 0], [92, 1], [56, 0], [80, 1], [68, 1], [34, 0], [86, 1], [52, 0],
] as const;

function Media({ project, t }: { project: Project; t: T }) {
  const { media, title } = project;

  if (media.kind === "redacted") {
    return (
      <figure className="redacted relative flex aspect-[16/10] flex-col justify-between overflow-hidden border border-line bg-foreground/[0.03] p-[7%]">
        <div className="flex flex-col gap-[3.2%]" aria-hidden="true">
          {REDACTED.map(([w, dark], i) => (
            <span
              key={i}
              className={`redact-bar block origin-left ${dark ? "h-[clamp(10px,1.6vw,22px)] bg-foreground" : "h-[2px] bg-line"}`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <figcaption className="mt-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          <Lock size={14} />
          {t.redacted}
        </figcaption>
      </figure>
    );
  }

  if (media.kind === "phones") {
    const speeds = [-0.6, 0.9, -1.2];
    return (
      <div className="grid grid-cols-3 items-start gap-[4%] pb-[6%]">
        {media.shots.map((shot, i) => (
          <div
            key={i}
            data-speed={speeds[i]}
            className={`phone aspect-[9/19.5] overflow-hidden border border-line shadow-[0_24px_50px_-22px_rgba(0,0,0,0.5)] ${i === 1 ? "mt-[18%]" : ""}`}
          >
            <Shot shot={shot} alt={`${title} ${i + 1}`} sizes="(min-width: 768px) 16vw, 30vw" className="h-full w-full object-cover object-top" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative pb-[9%] pr-[12%]">
      <div className="work-main relative overflow-hidden border border-line" data-speed="0.5">
        <Shot shot={media.main} alt={`${title} desktop`} sizes="(min-width: 768px) 50vw, 85vw" className="h-auto w-full" />
      </div>
      <div className="work-mob absolute bottom-0 right-0 aspect-[9/16] w-[22%] overflow-hidden border border-line shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)]" data-speed="-1.3">
        <Shot shot={media.mobile} alt={`${title} mobile`} sizes="(min-width: 768px) 13vw, 20vw" className="h-full w-full object-cover object-top" />
      </div>
    </div>
  );
}

export default function Work({ t }: { t: T }) {
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
    q(".phone").forEach((el, i) =>
      gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: "expo.out", delay: (i % 3) * 0.12, scrollTrigger: { trigger: el.parentElement, start: "top 80%" } })
    );
    // The confidential panel: a marker blacks out each line in turn
    q(".redacted").forEach((el) =>
      gsap.from(el.querySelectorAll(".redact-bar"), { scaleX: 0, duration: 0.7, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: el, start: "top 78%" } })
    );
  });

  return (
    <section id="work" ref={ref} className="relative">
      <Giant text={t.heading} />

      {t.projects.map((p) => (
        <article key={p.id}>
          <div className="gutter grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 border-t border-line py-6">
            <span className="text-sm font-semibold text-accent">{p.n}</span>
            <Kinetic
              as="h3"
              text={p.title}
              className="work-title text-[clamp(27px,6.84vw,119px)] leading-[0.92] tracking-[-0.02em] will-change-transform"
              min={360}
              max={800}
            />
            <div className="col-start-2 flex flex-col items-start gap-3">
              {p.status && (
                <span className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${p.status === "dev" ? "border-accent text-accent" : "border-line text-muted"}`}>
                  {p.status === "confidential" && <Lock size={12} />}
                  {p.status === "dev" ? t.dev : t.confidential}
                </span>
              )}
              <p className="max-w-[60ch] text-base leading-normal text-muted">{p.summary}</p>
            </div>
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
                {t.stack[0]}
                <span className="text-accent">{t.stack[1]}</span>
              </h4>
              <ul className="flex flex-wrap gap-2" translate="no">
                {p.stack.map((tool) => (
                  <li key={tool} className="border border-line px-3 py-1.5 text-xs font-semibold">{tool}</li>
                ))}
              </ul>
              {p.stats && (
                <dl className="mt-6 grid grid-cols-2 justify-start gap-x-6 gap-y-2.5 sm:grid-cols-[repeat(4,auto)]">
                  {p.stats.map(([value, label]) => (
                    <div key={label}>
                      <dd className="text-[21px] font-bold">{value}</dd>
                      <dt className="text-[11px] uppercase tracking-[0.09em] text-muted">{label}</dt>
                    </div>
                  ))}
                </dl>
              )}
              {p.links && (
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  {p.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track(link.kind === "code" ? "project_code" : "project_site", { project: p.id })}
                      className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
                    >
                      {link.kind === "code" && <Github size={15} />}
                      {link.kind === "code" ? t.code : t.site}
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Media project={p} t={t} />
          </div>
        </article>
      ))}
    </section>
  );
}
