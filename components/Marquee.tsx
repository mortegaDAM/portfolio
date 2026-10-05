"use client";

import { useEffect, useRef } from "react";

// Horizontal band that speeds up and reverses with scroll velocity.
export default function Marquee({ items }: { items: string[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || !wrap.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = 0;
    let vel = 0;
    let dir = 1;
    let lastY = window.scrollY;
    let half = el.scrollWidth / 2;
    let visible = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const y = window.scrollY;
      vel += (y - lastY - vel) * 0.18;
      lastY = y;
      if (Math.abs(vel) > 0.3) dir = vel > 0 ? 1 : -1;
      if (!half) return;
      x -= (1 + Math.min(Math.abs(vel), 60) * 0.4) * dir;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(wrap.current);

    const ro = new ResizeObserver(() => {
      half = el.scrollWidth / 2;
    });
    ro.observe(el);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return (
    <div ref={wrap} className="overflow-hidden border-y border-line py-[18px]" aria-hidden="true" translate="no">
      <div ref={track} className="marquee-track cond flex w-max whitespace-nowrap text-[clamp(36px,6.3vw,99px)] font-bold uppercase leading-none will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="px-[0.26em]">{item}</span>
        ))}
      </div>
    </div>
  );
}
