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
      <h4 className="text-accent-purple text-[10px] md:text-[11px] font-bold tracking-[0.25em] mb-4 uppercase drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">TECH STACK</h4>
      <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-12 tracking-tight">SKILLS & TOOLS</h2>
      
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full max-w-5xl">
        {skills.map((skill, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-[1.2rem] w-[130px] h-[80px] md:w-[190px] md:h-[110px] flex flex-col items-center justify-center p-[1px] bg-gradient-to-br from-accent-cyan/30 via-black/5 dark:via-white/5 to-accent-purple/30 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(34,211,238,0.1)]`}
          >
            {/* Inner Background */}
            <div className={`w-full h-full bg-gradient-to-br from-[#f4f7f6] to-[#dce4e1] dark:from-transparent dark:to-transparent dark:bg-[#030305]/90 backdrop-blur-3xl rounded-[1.2rem] flex flex-col items-center justify-center gap-3 relative z-10 shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/60 dark:border-black/50`}>
              
              {/* Corner glass reflection inside */}
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-accent-cyan/20 rounded-full blur-[12px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent-purple/20 rounded-full blur-[12px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

              <skill.icon strokeWidth={1.5} className={`w-6 h-6 md:w-8 md:h-8 ${skill.color} drop-shadow-[0_0_8px_currentColor] z-10`} />
              <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-foreground dark:text-[#a1a1aa] whitespace-nowrap uppercase z-10">{skill.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
