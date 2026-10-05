"use client";

import { ReactNode, useRef } from "react";

// Pulls its child toward the cursor while the pointer is inside the padded hit area.
export default function Magnetic({ children }: { children: ReactNode }) {
  const inner = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse" || !inner.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) * 0.32;
    const dy = (e.clientY - r.top - r.height / 2) * 0.32;
    inner.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    if (inner.current) inner.current.style.transform = "";
  };

  return (
    <span className="-m-6 inline-block p-6" onPointerMove={onMove} onPointerLeave={onLeave}>
      <span ref={inner} className="inline-block transition-transform duration-300 ease-out motion-reduce:transition-none">
        {children}
      </span>
    </span>
  );
}
