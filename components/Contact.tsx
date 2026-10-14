import { ArrowDownToLine, Github, Linkedin } from "lucide-react";
import Kinetic from "@/components/Kinetic";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import TrackedLink from "@/components/TrackedLink";
import { email, socials } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

const line = "kin-row h-[0.86em]";

type Props = { t: Dictionary["contact"]; footer: Dictionary["footer"]; cv: string };

export default function Contact({ t, footer, cv }: Props) {
  return (
    <footer id="contact" className="relative">
      <div className="gutter pb-[70px] pt-[120px]">
        <h2 aria-label={t.label} className="mb-[30px] select-none text-[clamp(40px,10.35vw,180px)] leading-[0.86] tracking-[-0.02em]">
          <Kinetic text={t.lines[0]} className={line} min={250} max={800} wide={1} sw fit />
          <Kinetic text={t.lines[1]} className={line} min={250} max={800} wide={1} sw fit />
          <Kinetic text={t.lines[2]} className={`${line} text-accent`} min={250} max={800} wide={0.4} sw fit />
        </h2>
        <p className="max-w-[52ch] text-[17px] leading-relaxed text-muted">{t.body}</p>

        <div className="mt-14 grid grid-cols-1 gap-x-[6vw] gap-y-14 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <ContactForm t={t.form} />

          <aside className="flex flex-col gap-8 border-t border-line pt-8 md:border-l md:border-t-0 md:pl-[4vw] md:pt-0">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{t.direct}</span>
              <a href={`mailto:${email}`} className="break-all text-[clamp(18px,1.6vw,22px)] font-semibold underline-offset-[6px] hover:text-accent hover:underline">
                {email}
              </a>
              <CopyEmail copy={t.copy} copied={t.copied} />
            </div>
            <TrackedLink
              href={cv}
              download
              event="cv_download"
              data={{ from: "contact" }}
              className="group inline-flex items-center gap-3 self-start border border-foreground px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              {t.cv}
              <ArrowDownToLine size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </TrackedLink>
            <div className="-ml-2.5 flex items-center">
              <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-foreground">
                <Github size={20} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-foreground">
                <Linkedin size={20} />
              </a>
            </div>
          </aside>
        </div>
      </div>

      <div className="gutter flex flex-col items-center justify-between gap-4 border-t border-line py-[26px] text-[11px] font-medium uppercase tracking-[0.14em] text-muted md:flex-row">
        <span>{footer.rights}</span>
        <span translate="no">MORTEGA DEV</span>
      </div>
    </footer>
  );
}
