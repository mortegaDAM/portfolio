"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { track } from "@vercel/analytics";
import Magnetic from "@/components/Magnetic";
import { email } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

type State = "idle" | "sending" | "sent" | "invalid" | "failed";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-lg text-foreground caret-accent outline-none transition-colors placeholder:text-muted/70 focus:border-accent";
const label = "text-xs font-bold uppercase tracking-[0.14em] text-muted";

export default function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !EMAIL.test(data.email ?? "") || (data.message ?? "").trim().length < 10) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("contact_sent");
      form.reset();
      setState("sent");
    } catch {
      track("contact_failed");
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col items-start gap-6 border-t border-line pt-8" role="status">
        <p className="flex max-w-[44ch] items-start gap-3 text-xl leading-snug">
          <Check className="mt-1 shrink-0 text-ok" size={22} />
          {t.sent}
        </p>
        <button type="button" onClick={() => setState("idle")} className="border-b border-foreground pb-1 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent">
          {t.again}
        </button>
      </div>
    );
  }

  const sending = state === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={label}>{t.name}</span>
          <input name="name" autoComplete="name" required maxLength={100} className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>{t.email}</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className={label}>{t.message}</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={4} className={`${field} resize-y`} />
      </label>
      {/* Honeypot: hidden from people, filled by bots */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

      {(state === "invalid" || state === "failed") && (
        <p className="text-sm font-medium text-accent" role="alert">
          {state === "invalid" ? (
            t.invalid
          ) : (
            <>
              {t.failed}{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4">{email}</a>.
            </>
          )}
        </p>
      )}

      <div>
        <Magnetic>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-3 bg-foreground px-[34px] py-[18px] text-[13px] font-bold uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:bg-accent active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
          >
            {sending ? t.sending : t.send}
            {sending ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
