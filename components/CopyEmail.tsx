"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { track } from "@vercel/analytics";
import { email } from "@/lib/i18n";

export default function CopyEmail({ copy, copied }: { copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      track("email_copied");
      setTimeout(() => setDone(false), 1800);
    } catch {
      // Clipboard blocked: the address is visible and selectable right above
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
      aria-live="polite"
    >
      {done ? <Check size={14} className="text-ok" /> : <Copy size={14} />}
      {done ? copied : copy}
    </button>
  );
}
