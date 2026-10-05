"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Select = (selector: string) => HTMLElement[];

// Runs a GSAP setup scoped to `scope` and reverts it on unmount.
// Skipped entirely when the visitor prefers reduced motion.
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (q: Select) => void | (() => void)) {
  useEffect(() => {
    if (!scope.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const extra: { cleanup?: () => void } = {};
    const ctx = gsap.context(() => {
      const result = setup(gsap.utils.selector(scope) as Select);
      if (result) extra.cleanup = result;
    }, scope);
    return () => {
      extra.cleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap, ScrollTrigger };
