"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, GraduationCap, Flame } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center relative bg-transparent z-10 overflow-hidden pt-32 pb-24">
      {/* Decorative Background Elements matching global aesthetic */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-accent-purple/10 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-accent-cyan/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16 md:mb-24">
          <h4 className="text-accent-cyan text-[10px] md:text-[11px] font-bold tracking-[0.25em] mb-4 uppercase drop-shadow-[0_0_15px_rgba(var(--accent-cyan-rgb),0.5)]">ABOUT ME</h4>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tighter">
            BEYOND THE CODE
          </h1>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            I am a recently graduated Full Stack Developer, deeply motivated to kickstart my career in software engineering across any technological field. Beyond a solid technical foundation, I bring proven leadership and teamwork experience from my previous career, where I successfully managed and scaled teams of up to 20 people. My analytical mindset allows me to bridge the gap between business requirements and scalable, maintainable code.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Card 1: The Transition */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/50 dark:bg-[#030305]/60 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(124,92,191,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <GraduationCap className="text-accent-purple mb-6" size={32} strokeWidth={1.5} />
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4 uppercase tracking-tighter">A New Chapter</h3>
            <p className="text-sm text-muted leading-relaxed">
              Having just graduated from my software development studies, I am bringing a fresh perspective and an insatiable hunger for learning. I don't close doors to any specialization—whether it's frontend polishing, backend architecture, or cloud infrastructure, I am ready to dive deep and contribute from day one.
            </p>
          </motion.div>

          {/* Card 2: Leadership Context */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/50 dark:bg-[#030305]/60 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(168,85,247,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-cyan/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent-cyan/20 transition-colors duration-500" />
            
            <Users className="text-accent-cyan mb-6 relative z-10" size={32} strokeWidth={1.5} />
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4 uppercase tracking-tighter relative z-10">Leadership & Synergy</h3>
            <p className="text-sm text-muted leading-relaxed relative z-10">
              Before my journey into programming, I built a successful career where I climbed the ranks through sheer responsibility and dedication. I successfully managed and led teams of up to 20 people. This experience gave me invaluable soft skills: conflict resolution, empathetic leadership, cross-functional teamwork, and the ability to maintain high morale under pressure.
            </p>
          </motion.div>

          {/* Card 3: The Philosophy (Full Width) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 rounded-[2rem] bg-gradient-to-r from-accent-purple/5 via-white/50 dark:via-[#030305]/60 to-accent-cyan/5 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
            
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex-1 pr-0 md:pr-12 mb-8 md:mb-0 relative z-10">
               <Briefcase className="text-foreground mb-6" size={32} strokeWidth={1.5} />
               <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4 uppercase tracking-tighter">The Missing Piece</h3>
               <p className="text-sm text-muted leading-relaxed max-w-2xl">
                 Combining my proven track record of responsibility and team leadership with my newly acquired technical skills makes me a unique asset. I don't just write code; I understand team dynamics, project lifecycles, and how to align individual efforts with business goals. Let's build something extraordinary together.
               </p>
            </div>
            
            <div className="w-full md:w-auto relative z-10">
               <a href="mailto:mario98.mo@gmail.com" className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] dark:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300">
                 Get in Touch <Flame size={16} />
               </a>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
