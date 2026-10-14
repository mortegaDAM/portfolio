"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@vercel/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; data?: Record<string, string> };

// A plain link that also records a Vercel Analytics event when clicked
export default function TrackedLink({ event, data, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, data);
        onClick?.(e);
      }}
    />
  );
}
