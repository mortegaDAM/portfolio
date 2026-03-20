"use client";
import { motion } from "framer-motion";
import { Mountain, Flame, Link2, Box, Command } from "lucide-react"; 

const skills = [
  { name: "REACT", icon: Box, color: "text-accent-cyan" },
  { name: "NEXT.JS", icon: Link2, color: "text-accent-purple" },
  { name: "TAILWIND CSS", icon: Mountain, color: "text-accent-cyan" },
  { name: "FRAMER MOTION", icon: Flame, color: "text-accent-purple" },
  { name: "WEBGL", icon: Command, color: "text-accent-purple" },
];

export default function TechStack() {
  return (
    <section id="skills" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 flex flex-col items-center z-10 relative">
      <h4 className="text-accent-purple text-[10px] md:text-[11px] font-bold tracking-[0.25em] mb-4 uppercase drop-shadow-[0_0_15px_rgba(var(--accent-purple-rgb),0.5)]">TECH STACK</h4>
      <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-12 tracking-tight">SKILLS & TOOLS</h2>
      
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full max-w-5xl">
        {skills.map((skill, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-[1.2rem] w-[130px] h-[80px] md:w-[190px] md:h-[110px] flex flex-col items-center justify-center p-[1px] bg-gradient-to-br from-accent-cyan/30 via-black/5 dark:via-white/5 to-accent-purple/30 overflow-hidden shadow-[0_0_30px_rgba(var(--accent-cyan-rgb),0.1)]`}
          >
            {/* Inner Background */}
            <div className={`w-full h-full bg-white/60 dark:bg-[#030305]/90 backdrop-blur-2xl rounded-[1.2rem] flex flex-col items-center justify-center gap-3 relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_20px_rgba(124,92,191,0.08)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/80 dark:border-black/50`}>
              
              {/* Corner glass reflection inside */}
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-accent-cyan/20 rounded-full blur-[12px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent-purple/20 rounded-full blur-[12px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

              <skill.icon strokeWidth={1.5} className={`w-6 h-6 md:w-8 md:h-8 ${skill.color} drop-shadow-[0_0_8px_currentColor] z-10`} />
              <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-foreground dark:text-[#a1a1aa] whitespace-nowrap uppercase z-10">{skill.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Sections for Tech Lead/HR Strategy */}
      <div className="w-full max-w-5xl mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10 text-left">
        
        {/* Dev Philosophy */}
        <div className="flex flex-col p-8 md:p-10 rounded-3xl bg-white/50 dark:bg-[#030305]/60 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(124,92,191,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3 uppercase tracking-tighter">
             <Box className="text-accent-purple" size={24} /> INGENIERÍA BAJO EL CAPÓ
          </h3>
          <ul className="flex flex-col gap-6 text-sm text-muted">
            <li className="flex flex-col gap-1">
              <strong className="text-foreground tracking-wide font-medium">Tipado Estricto</strong>
              No concibo código sin TypeScript estricto. La refactorización segura es innegociable.
            </li>
            <li className="flex flex-col gap-1">
              <strong className="text-foreground tracking-wide font-medium">Performance-First</strong>
              Monitorizo los renders innecesarios en React y el tamaño del bundle en cada Pull Request.
            </li>
            <li className="flex flex-col gap-1">
              <strong className="text-foreground tracking-wide font-medium">Responsabilidad End-to-End</strong>
              Mi trabajo no termina con el commit; termina cuando el usuario interactúa sin fricciones en producción.
            </li>
          </ul>
        </div>

        {/* Radar Actual */}
        <div className="flex flex-col p-8 md:p-10 rounded-3xl bg-white/50 dark:bg-[#030305]/60 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(168,85,247,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-cyan/10 rounded-full blur-[40px] pointer-events-none" />
          
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3 uppercase tracking-tighter">
             <Flame className="text-accent-cyan" size={24} /> RADAR DE APRENDIZAJE
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-8">
            La curiosidad es mi motor. Actualmente estoy profundizando mi conocimiento técnico en áreas que impactan directamente el rendimiento y la escalabilidad del producto:
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-4 rounded-xl">
              <Command className="text-accent-purple" size={20} />
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-foreground uppercase tracking-widest">Cloud & Serverless</span>
                 <span className="text-[10px] text-muted mt-1">Supabase & Firebase architecture</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-4 rounded-xl">
              <Mountain className="text-accent-cyan" size={20} />
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-foreground uppercase tracking-widest">High-Performance UI</span>
                 <span className="text-[10px] text-muted mt-1">React Three Fiber & GSAP integrations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
