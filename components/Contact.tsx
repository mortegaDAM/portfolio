import { Github, Linkedin, Mail } from "lucide-react";
import Kinetic from "@/components/Kinetic";
import Magnetic from "@/components/Magnetic";
import { email, socials } from "@/lib/content";

const line = "kin-row h-[0.86em]";

export default function Contact() {
  return (
    <footer id="contact" className="relative">
      <div className="gutter pb-[70px] pt-[120px]">
        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-accent">What&apos;s Next?</h4>
        <h2
          aria-label="Let's build something extraordinary"
          className="mb-[30px] mt-[18px] select-none text-[clamp(40px,10.35vw,180px)] leading-[0.86] tracking-[-0.02em]"
        >
          <Kinetic text="LET'S BUILD" className={line} min={250} max={800} wide={1} sw />
          <Kinetic text="SOMETHING" className={line} min={250} max={800} wide={1} sw />
          <Kinetic text="EXTRAORDINARY" className={`${line} text-accent`} min={250} max={800} wide={0.4} sw />
        </h2>
        <p className="max-w-[52ch] text-[17px] leading-relaxed text-muted">
          Whether you have a project in mind, need a Full Stack Developer for your team, or just want to say hi, my inbox is always open.
        </p>
        <div className="mt-[34px] flex flex-wrap items-center gap-x-7 gap-y-[18px]">
          <Magnetic>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 bg-foreground px-[34px] py-[18px] text-[13px] font-bold uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:bg-accent active:scale-[0.98]"
            >
              GET IN TOUCH <Mail size={16} />
            </a>
          </Magnetic>
          <span className="select-all text-sm text-muted">{email}</span>
        </div>
      </div>

      <div className="gutter flex flex-col items-center justify-between gap-6 border-t border-line py-[26px] text-[11px] font-medium uppercase tracking-[0.14em] text-muted md:flex-row">
        <span>© 2026 MARIO ORTEGA. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-6">
          <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground">
            <Github size={16} />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
            <Linkedin size={16} />
          </a>
          <span className="cursor-pointer transition-colors hover:text-foreground">PRIVACY</span>
          <span className="cursor-pointer transition-colors hover:text-foreground">TERMS</span>
          <span className="cursor-pointer transition-colors hover:text-foreground">SITEMAP</span>
        </div>
      </div>
    </footer>
  );
}
