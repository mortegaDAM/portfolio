"use client";

import { motion } from "framer-motion";

export default function ProjectGallery() {
  return (
    <section id="work" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10 text-foreground">

      {/* The Challenge / The Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24 mt-12 bg-background z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 uppercase tracking-tighter text-foreground">
            <span className="text-accent-purple">THE</span> CHALLENGE
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            Lumina Studios is an endeavor with the cross-referencing immersive experiences and smart, text-content and massive typographic problem. We mold presentation into sharp digital experiences of the same digital incoherence.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 uppercase tracking-tighter text-foreground">
            <span className="text-accent-purple">THE</span> SOLUTION
          </h3>
          <p className="text-muted text-sm leading-relaxed flex items-center">
            Using the component approaches, redefining digital experiences parameters. Incoherence translates to executing formatting to sort and clear communicating concepts and design. We aim to multiply performance and smart numbers via a focus on immersive typography and fluid motion.
          </p>
        </motion.div>
      </div>

      {/* Grid Gallery */}
      <div className="flex flex-col gap-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="group relative glass rounded-2xl border-black/5 dark:border-white/10 overflow-hidden aspect-video shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2),inset_0_0_0_1px_rgba(168,85,247,0.5)] transition-all duration-500 flex flex-col"
          >

            <div className="flex-1 bg-[#dce4e1] dark:bg-[#174b4d] flex items-center justify-center p-8">
              <div className="w-full h-full bg-white dark:bg-[#0a1220]/80 rounded-xl border border-black/5 dark:border-white/10 overflow-hidden relative flex flex-col items-center justify-center shadow-lg">
                <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop" className="w-[80%] h-[40%] object-cover opacity-80 dark:opacity-60 z-0 dark:mix-blend-screen" alt="Gallery" />
                <div className="absolute inset-x-0 bottom-[10%] text-center z-10 pointer-events-none">
                  <h3 className="text-2xl font-display tracking-[0.2em] font-light text-foreground dark:text-white opacity-80 decoration-accent-cyan underline underline-offset-8">PROJECT LUMINA</h3>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div whileHover={{ scale: 0.98 }} className="flex-1 glass rounded-2xl border border-black/5 dark:border-white/10 hover:border-accent-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-6 bg-[#dce4e1] dark:bg-[#174b4d]">
              <div className="w-full h-full bg-white dark:bg-[#0a1220]/80 rounded-xl relative flex items-center justify-center border border-black/5 dark:border-white/10 shadow-md dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop" className="w-[80%] h-[30%] object-cover opacity-60 dark:opacity-50 absolute dark:mix-blend-screen" alt="Mockup" />
                <div className="w-[85%] h-[4%] bg-gray-200 dark:bg-[#060b17] absolute -bottom-2 rounded-t-xl" />
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 0.98 }} className="flex-1 glass rounded-2xl border border-black/5 dark:border-white/10 hover:border-accent-purple/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden flex items-center justify-center p-6 bg-[#dce4e1] dark:bg-[#174b4d]">
              <div className="w-full h-full bg-white dark:bg-[#080d1a] rounded-xl relative grid grid-cols-4 gap-2 p-4 shadow-md dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-black/5 dark:border-white/5">
                <div className="col-span-1 bg-black/5 dark:bg-white/5 rounded-md flex flex-col p-2 gap-2"><div className="w-4 h-4 rounded-full bg-accent-cyan/20" /><div className="w-full flex-1 bg-black/5 dark:bg-white/5 rounded-sm" /></div>
                <div className="col-span-1 bg-black/5 dark:bg-white/5 rounded-md flex flex-col p-2 gap-2"><div className="w-4 h-4 rounded-full bg-accent-purple/20" /><div className="w-full flex-1 bg-black/5 dark:bg-white/5 rounded-sm" /></div>
                <div className="col-span-1 bg-black/5 dark:bg-white/5 rounded-md flex flex-col p-2 gap-2"><div className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10" /><div className="w-full flex-1 bg-black/5 dark:bg-white/5 rounded-sm" /></div>
                <div className="col-span-1 bg-black/5 dark:bg-white/5 rounded-md flex flex-col p-2 gap-2"><div className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10" /><div className="w-full flex-1 bg-black/5 dark:bg-white/5 rounded-sm" /></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
          <motion.div whileHover={{ scale: 0.98 }} className="flex-1 glass rounded-2xl border border-black/5 dark:border-white/10 hover:border-accent-cyan/50 transition-all duration-500 p-8 flex flex-col justify-center gap-4 bg-[#dce4e1] dark:bg-[#174b4d]">
            <div className="flex justify-between w-full h-24 mb-4 gap-4">
              <div className="flex-1 bg-white dark:bg-[#080d1a] rounded-xl border border-white/50 dark:border-white/10 flex items-center justify-center shadow-sm dark:shadow-inner"><span className="text-foreground dark:text-white text-xs font-bold tracking-[0.2em]">LUMINA STUDIOS</span></div>
              <div className="flex-1 bg-white dark:bg-[#080d1a] rounded-xl border border-white/50 dark:border-white/10 flex flex-col items-center justify-center shadow-sm dark:shadow-inner"><h1 className="text-foreground dark:text-white text-xl tracking-widest font-display">LUMINA</h1> <span className="text-[8px] text-accent-cyan font-mono tracking-widest">BRANDING & IDENTIFICATION</span></div>
            </div>
            <div className="w-full bg-[#f4f7f6] dark:bg-[#0a1220] rounded-xl h-36 border border-white/50 dark:border-white/10 text-foreground dark:text-white p-6 flex flex-col justify-center shadow-sm dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              <span className="text-[10px] uppercase text-accent-cyan font-bold tracking-widest mb-2 font-mono">Typography</span>
              <span className="text-4xl tracking-tight text-foreground dark:text-white font-serif">Aeneity</span>
              <span className="text-[10px] mt-4 font-mono text-slate-500 dark:text-zinc-400 tracking-widest">ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 tracking-widest">abcdefghijklmnopqrstuvwxyz</span>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 0.98 }} className="flex-1 glass rounded-2xl border border-black/5 dark:border-white/10 hover:border-accent-purple/50 transition-all duration-500 flex items-center justify-center relative overflow-hidden min-h-[400px] bg-[#dce4e1] dark:bg-[#174b4d]">
            <div className="w-[200px] h-[400px] bg-white dark:bg-[#080d1a] rounded-[2.5rem] border-[6px] border-white dark:border-[#040810] shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center">
              <div className="w-32 h-6 bg-white dark:bg-[#040810] absolute top-0 rounded-b-xl z-20 flex justify-center items-center gap-2 px-2 shadow-sm dark:shadow-none"><div className="w-10 h-1 rounded-full bg-black/10 dark:bg-white/10" /><div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10" /></div>
              <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop" className="w-full h-[60%] object-cover opacity-80 dark:opacity-70 z-10 dark:mix-blend-screen" alt="Phone UI" />
              <div className="w-full flex-1 bg-gradient-to-b from-[#f4f7f6] dark:from-[#0a1220] to-white dark:to-[#040810] z-10 flex items-center justify-center p-4 text-center">
                <span className="text-[10px] text-accent-cyan glass bg-white/80 dark:bg-white/5 px-4 py-2 rounded-full border border-black/5 dark:border-white/10 shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]">Follow the tide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
