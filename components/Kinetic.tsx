"use client";

import { CSSProperties, ElementType, Fragment, HTMLAttributes, Ref, useEffect, useRef } from "react";
import { register } from "@/lib/kinetic";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "span";
  className?: string;
  min?: number;
  max?: number;
  wide?: number;
  idle?: boolean;
  sw?: boolean;
  fit?: boolean;
  style?: CSSProperties;
};

export default function Kinetic({ text, as = "span", className = "", min = 300, max = 800, wide = 0, idle = false, sw = false, fit = false, style }: Props) {
  const Tag = as as ElementType<HTMLAttributes<HTMLElement> & { ref: Ref<HTMLElement> }>;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return register(ref.current, { min, max, wide, idle, sw, fit });
  }, [min, max, wide, idle, sw, fit]);

  const words = text.split(" ");

  return (
    // translate="no": browser translators rewrite each letter span as if it were a word
    <Tag ref={ref} className={`kin ${className}`} translate="no" style={style}>
      {/* Read as one phrase by screen readers; the letter spans below are visual only */}
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="kin-w" aria-hidden="true">
            {[...word].map((c, j) => (
              <span key={j} className="kin-c"><span className="kin-g">{c}</span></span>
            ))}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
