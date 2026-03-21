"use client";
import { motion } from "framer-motion";
import {
  Box,
  Server,
  Mountain,
  Flame,
  Command,
  ShieldCheck,
  Sparkles,
  Terminal,
  Layers,
  Code2,
  Cpu,
  Wrench
} from "lucide-react";

// Arsenal marquee — all tools used across the 3 real projects
const arsenalTools = [
  // Project 1 – Portfolio
  "Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons",
  // Project 2 – Lydia Psicología
  "Bootstrap 5", "Vanilla CSS", "SEO",
  // Project 3 – AI Agents (internship)
  "Spring Boot", "Angular", "Python", "FastAPI", "Argos Translate", "Prism.js", "Docker",
  // Universal tools
  "Git", "GitHub", "Vercel", "VS Code", "REST APIs", "Node.js", "JavaScript (ES6+)",
];

const SkillBadge = ({ icon: Icon, text, color }: { icon: any, text: string, color: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-[#030305]/90 backdrop-blur-md rounded-xl border border-black/5 dark:border-white/10 shadow-sm relative overflow-hidden group hover:scale-105 transition-transform duration-300">
    <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${color}`} />
    <Icon className={`w-4 h-4 md:w-5 md:h-5 ${color} drop-shadow-[0_0_8px_currentColor]`} strokeWidth={1.5} />
    <span className="text-[10px] md:text-xs font-bold tracking-widest text-foreground dark:text-[#a1a1aa] whitespace-nowrap uppercase">{text}</span>
  </div>
);

export default function TechStack() {
  return (
    <section id="skills" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 flex flex-col items-center z-10 relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <h4 className="text-accent-purple text-[10px] md:text-[11px] font-bold tracking-[0.25em] mb-4 uppercase drop-shadow-[0_0_15px_rgba(var(--accent-purple-rgb),0.5)]">TECH STACK</h4>
      <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-12 tracking-tight text-center">SKILLS & ARSENAL</h2>

      {/* BENTO BOX GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 w-full max-w-5xl">

        {/* 1. FRONTEND CORE (Large) */}
        <motion.div
          whileHover={{ y: -5 }}
          className="col-span-1 md:col-span-2 md:row-span-2 flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/50 dark:bg-[#030305]/60 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(124,92,191,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-purple/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-accent-purple/20 transition-colors duration-500" />

          <div className="relative z-10 flex-grow">
            <h3 className="text-2xl font-display font-bold text-foreground mb-3 flex items-center gap-3 uppercase tracking-tighter">
              <Code2 className="text-accent-purple" size={28} /> FRONTEND CORE
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-[90%]">
              Architecting robust, scalable, and type-safe interfaces with a focus on maintainable component systems. I bridge the gap between complex logic and seamless UX, leveraging advanced patterns for both SPAs and SSR applications.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <SkillBadge icon={Box} text="React" color="text-accent-cyan" />
            <SkillBadge icon={Box} text="Angular" color="text-[#DD0031]" />
            <SkillBadge icon={Code2} text="Next.js 14" color="text-foreground" />
            <SkillBadge icon={ShieldCheck} text="TypeScript" color="text-[#3178C6]" />
            <SkillBadge icon={Terminal} text="JavaScript" color="text-[#F7DF1E]" />
          </div>
        </motion.div>

        {/* 2. STYLING & ANIMATION */}
        <motion.div
          whileHover={{ y: -5 }}
          className="col-span-1 md:col-span-2 md:row-span-1 flex flex-col p-8 rounded-[2rem] bg-gradient-to-br from-white/50 to-white/30 dark:from-[#030305]/60 dark:to-transparent backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-cyan/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent-cyan/20 transition-colors duration-500" />

          <h3 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-3 uppercase tracking-tighter relative z-10">
            <Flame className="text-accent-cyan" size={24} /> Styling & Animation
          </h3>
          <p className="text-xs text-muted mb-6 relative z-10">Pixel-perfect UIs, 60fps animations, responsive systems.</p>

          <div className="flex flex-wrap gap-3 relative z-10 mt-auto">
            <SkillBadge icon={Mountain} text="Tailwind CSS" color="text-accent-cyan" />
            <SkillBadge icon={Mountain} text="Bootstrap 5" color="text-[#7952B3]" />
            <SkillBadge icon={Flame} text="Framer Motion" color="text-accent-purple" />
            <SkillBadge icon={Sparkles} text="Vanilla CSS" color="text-pink-400" />
          </div>
        </motion.div>

        {/* 3. BACKEND & INFRASTRUCTURE */}
        <motion.div
          whileHover={{ y: -5 }}
          className="col-span-1 md:col-span-2 md:row-span-1 flex flex-col p-8 rounded-[2rem] bg-white/50 dark:bg-[#030305]/60 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-accent-purple/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent-purple/20 transition-colors duration-500" />
          <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-3 uppercase tracking-tighter relative z-10">
            <Server className="text-accent-purple" size={24} /> Backend & Tools
          </h3>
          <div className="flex flex-wrap gap-3 relative z-10 mt-auto">
            <SkillBadge icon={Cpu} text="Spring Boot" color="text-[#6DB33F]" />
            <SkillBadge icon={Terminal} text="Python" color="text-[#3776AB]" />
            <SkillBadge icon={Server} text="FastAPI" color="text-accent-cyan" />
            <SkillBadge icon={Wrench} text="Docker" color="text-[#2496ED]" />
            <SkillBadge icon={Cpu} text="REST APIs" color="text-muted" />
          </div>
        </motion.div>

        {/* 4. INFINITE MARQUEE – full arsenal */}
        <motion.div
          className="col-span-1 md:col-span-4 md:row-span-1 flex flex-col justify-center py-8 rounded-[2rem] bg-white/30 dark:bg-white/[0.02] backdrop-blur-md border border-black/5 dark:border-white/5 overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 mb-6 px-8">
            <Layers className="text-muted" size={16} />
            <h3 className="text-[10px] md:text-xs font-bold text-muted uppercase tracking-[0.2em] text-center">
              Technological Arsenal & Tools
            </h3>
          </div>

          <div className="relative w-full flex overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex whitespace-nowrap animate-marquee w-max py-2">
              {[...arsenalTools, ...arsenalTools].map((tool, idx) => (
                <div
                  key={idx}
                  className="mx-3 px-5 py-2.5 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/10 text-xs md:text-sm font-semibold text-foreground/80 tracking-wide hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors shadow-sm"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 5. LEARNING RADAR */}
        <motion.div
          whileHover={{ y: -5 }}
          className="col-span-1 md:col-span-4 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-[2rem] bg-white/50 dark:bg-[#030305]/60 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] mt-4 md:mt-2"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-0 text-muted">
            <Command size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Currently Learning</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="text-xs px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full font-medium">RAG (Retrieval-Augmented Generation)</span>
            <span className="text-xs px-3 py-1 bg-accent-cyan/10 text-accent-cyan border border-transparent rounded-full font-medium">AI & LLM Integration</span>
            <span className="text-xs px-3 py-1 bg-black/5 dark:bg-white/10 text-foreground rounded-full font-medium">Java (deepening)</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
