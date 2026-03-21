"use client";

import { motion } from "framer-motion";

const ImageGallery = ({
  mainLight = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop",
  mainDark = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop",
  laptopLight = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop",
  laptopDark = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop",
  mobileLight = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop",
  mobileDark = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop",
  isReal = false,
  mainBlur = false,
  mobileBlur = false,
  designInfo = {
    tokens: ['#a855f7', '#22d3ee', '#030305', '#ffffff', '#9ca3af'],
    fontName: 'Space Grotesk',
    fontSub: 'Inter · display · sans-serif',
    stats: [
      { value: '100', label: 'Perf. Score', color: 'text-accent-cyan' },
      { value: '60fps', label: 'Animations', color: 'text-accent-purple' },
      { value: '2', label: 'Themes', color: '' },
      { value: 'SSR', label: 'Rendering', color: '' },
    ]
  }
}: {
  mainLight?: string, mainDark?: string,
  laptopLight?: string, laptopDark?: string,
  mobileLight?: string, mobileDark?: string,
  isReal?: boolean, mainBlur?: boolean, mobileBlur?: boolean,
  designInfo?: {
    tokens: string[],
    fontName: string,
    fontSub: string,
    stats: { value: string, label: string, color: string }[]
  }
}) => (
  <div className="flex flex-col gap-6 mt-12">
    {/* Row 1 */}
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <motion.div
        whileHover={{ scale: 0.98 }}
        className="group relative glass rounded-2xl border-black/5 dark:border-white/10 overflow-hidden aspect-video shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(var(--accent-purple-rgb),0.2),inset_0_0_0_1px_rgba(var(--accent-purple-rgb),0.5)] transition-all duration-500 flex flex-col items-center justify-center"
      >
        <div className="flex-1 bg-[#e8e3f8] dark:bg-[#174b4d] flex items-center justify-center p-4 md:p-8">
          {isReal ? (
            <div className="w-full h-full flex flex-col rounded-xl md:rounded-2xl overflow-hidden border border-black/10 dark:border-white/20 shadow-2xl z-10 bg-white dark:bg-[#050505]">
              {/* Mac Browser Header */}
              <div className="h-6 md:h-8 w-full flex-shrink-0 bg-[#f1f1f1] dark:bg-[#1a1a1a] flex items-center px-3 gap-1.5 md:gap-2 border-b border-black/5 dark:border-white/10">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
              </div>
              {/* Browser Content */}
              <div className="flex-1 overflow-hidden relative">
                <img src={mainLight} className="dark:hidden w-full h-full object-cover object-top" alt="Gallery Light" />
                <img src={mainDark} className="hidden dark:block w-full h-full object-cover object-top" alt="Gallery Dark" />
                {/* Privacy blur for the client's photo */}
                {mainBlur && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute backdrop-blur-lg"
                      style={{ left: '51.5%', top: '12%', width: '31%', height: '63.5%', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-white dark:bg-[#0a1220]/80 rounded-xl border border-black/5 dark:border-white/10 overflow-hidden relative flex flex-col items-center justify-center shadow-lg">
              <img src={mainLight} className="w-[80%] h-[40%] object-cover opacity-80 dark:opacity-60 z-0 dark:mix-blend-screen" alt="Gallery" />
              <div className="absolute inset-x-0 bottom-[10%] text-center z-10 pointer-events-none">
                <h3 className="text-2xl font-display tracking-[0.2em] font-light text-foreground dark:text-white opacity-80 decoration-accent-cyan underline underline-offset-8">PROJECT UI</h3>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 0.98 }} className="glass rounded-2xl border border-black/5 dark:border-white/10 hover:border-accent-cyan/50 transition-all duration-500 p-5 flex flex-col justify-between gap-3 bg-[#e8e3f8] dark:bg-[#174b4d] min-h-[300px]">

        {/* Color Palette row */}
        <div className="w-full bg-white dark:bg-[#080d1a] rounded-xl p-4 border border-white/50 dark:border-white/10 shadow-sm dark:shadow-inner flex flex-col gap-2">
          <span className="text-[9px] uppercase text-accent-cyan font-bold tracking-widest font-mono">Design Tokens</span>
          <div className="flex gap-2 items-center mt-1">
            {designInfo.tokens.map((color, i) => (
              <div key={i} className="w-6 h-6 rounded-md shadow-md border border-black/10" style={{ backgroundColor: color }} title={color} />
            ))}
            <span className="text-[9px] ml-auto text-muted font-mono">{designInfo.tokens.length} tokens</span>
          </div>
        </div>

        {/* Typography */}
        <div className="w-full bg-white dark:bg-[#080d1a] rounded-xl p-4 border border-white/50 dark:border-white/10 shadow-sm dark:shadow-inner flex flex-col gap-0.5">
          <span className="text-[9px] uppercase text-accent-purple font-bold tracking-widest font-mono">Typography</span>
          <span className="text-lg font-display tracking-tight text-foreground dark:text-white">{designInfo.fontName}</span>
          <span className="text-[9px] font-mono text-muted tracking-widest">{designInfo.fontSub}</span>
        </div>

        {/* Quick stats grid */}
        <div className="grid grid-cols-2 gap-2">
          {designInfo.stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#080d1a] rounded-xl p-3 border border-white/50 dark:border-white/10 flex flex-col gap-0.5 shadow-sm">
              <span className={`text-base font-bold font-display ${stat.color || 'text-foreground dark:text-white'}`}>{stat.value}</span>
              <span className="text-[9px] text-muted font-mono tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
      <motion.div whileHover={{ scale: 0.98 }} className="flex-1 glass rounded-2xl border border-black/5 dark:border-white/10 hover:border-accent-cyan/50 hover:shadow-[0_0_30px_rgba(var(--accent-cyan-rgb),0.2)] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-6 bg-[#e8e3f8] dark:bg-[#174b4d]">
        {/* Realistic CSS Laptop */}
        <div className="flex flex-col items-center justify-center w-full max-w-[500px]">
          {/* Laptop Screen with Bezel */}
          <div className="relative w-[90%] aspect-[16/10] bg-gray-200 dark:bg-black rounded-t-xl md:rounded-t-2xl border-[6px] md:border-[8px] border-gray-200 dark:border-black p-0.5 md:p-1 flex flex-col justify-end shadow-xl z-10 box-content">
            {/* Webcam dot */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 dark:bg-zinc-800 rounded-full" />

            {/* The screen rendering */}
            <div className="w-full h-full bg-[#050505] overflow-hidden rounded-sm relative">
              {isReal ? (
                <>
                  <img src={laptopLight} className="dark:hidden w-full h-full object-cover object-top" alt="Mockup Light" />
                  <img src={laptopDark} className="hidden dark:block w-full h-full object-cover object-top" alt="Mockup Dark" />
                </>
              ) : (
                <img src={laptopLight} className="w-full h-full object-cover object-top opacity-60 dark:opacity-50 dark:mix-blend-screen" alt="Mockup" />
              )}
            </div>
          </div>

          {/* Laptop Keyboard Base */}
          <div className="relative w-full h-3 md:h-4 bg-gray-300 dark:bg-[#222] rounded-b-xl md:rounded-b-2xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.8)] z-20 flex justify-center border-t border-white/50 dark:border-white/5">
            {/* Trackpad notch */}
            <div className="w-[15%] h-[40%] bg-gray-400 dark:bg-[#1a1a1a] rounded-b-md shadow-inner" />
          </div>
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 0.98 }} className="flex-1 glass rounded-2xl border border-black/5 dark:border-white/10 hover:border-accent-purple/50 transition-all duration-500 flex items-center justify-center relative overflow-hidden min-h-[400px] bg-[#e8e3f8] dark:bg-[#174b4d]">
        <div className="w-[200px] h-[400px] bg-white dark:bg-[#080d1a] rounded-[2.5rem] border-[6px] border-white dark:border-[#040810] shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center">
          <div className="w-32 h-6 bg-white dark:bg-[#040810] absolute top-0 rounded-b-xl z-20 flex justify-center items-center gap-2 px-2 shadow-sm dark:shadow-none"><div className="w-10 h-1 rounded-full bg-black/10 dark:bg-white/10" /><div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10" /></div>
          {isReal ? (
            <>
              <img src={mobileLight} className="dark:hidden w-full h-full object-cover object-top z-10" alt="Phone UI Light" />
              <img src={mobileDark} className="hidden dark:block w-full h-full object-cover object-top z-10" alt="Phone UI Dark" />
              {/* Privacy blur for the client's photo */}
              {mobileBlur && (
                <div
                  className="absolute z-20 pointer-events-none backdrop-blur-lg"
                  style={{ left: 0, right: 0, top: '15%', bottom: '25%' }}
                />
              )}
            </>
          ) : (
            <img src={mobileLight} className="w-full h-[60%] object-cover object-top z-10 opacity-80 dark:opacity-70 dark:mix-blend-screen" alt="Phone UI" />
          )}
          {!isReal && (
            <div className="w-full flex-1 bg-gradient-to-b from-[#f4f7f6] dark:from-[#0a1220] to-white dark:to-[#040810] z-10 flex items-center justify-center p-4 text-center">
              <span className="text-[10px] text-accent-cyan glass bg-white/80 dark:bg-white/5 px-4 py-2 rounded-full border border-black/5 dark:border-white/10 shadow-[0_0_15px_rgba(var(--accent-cyan-rgb),0.2)]">Mobile App</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  </div>
);

export default function ProjectGallery() {
  return (
    <section id="work" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10 text-foreground">

      {/* --- PROJECT 1 --- */}
      <div className="mb-40 z-20">
        <div className="mb-12">
          <span className="text-accent-purple font-mono text-sm tracking-widest font-bold mb-2 block">01</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tighter text-foreground">
            MORTEGA DEV PORTFOLIO
          </h2>
          <p className="text-muted text-sm max-w-xl">
            High-end personal portfolio built with modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 bg-transparent z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase tracking-tighter text-foreground">
              THE <span className="text-accent-purple">PROBLEM</span> & ARCHITECTURE
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              I wanted to create a digital presence that stands out from generic templates. To achieve this, I built a custom portfolio from scratch focused on extreme performance, sleek glassmorphic UI, and complex animations using Framer Motion. The architecture uses Next.js App Router for optimal SEO and fast load times.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase tracking-tighter text-foreground">
              THE <span className="text-accent-cyan">STACK</span>
            </h3>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl border-accent-cyan/30">
                <span className="text-xs font-bold text-accent-cyan">Next.js 14</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl border-accent-purple/30">
                <span className="text-xs font-bold text-accent-purple">Framer Motion</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">Tailwind CSS</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">TypeScript</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">Lucide Icons</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reusable Image Gallery */}
        <ImageGallery
          mainLight="/light-main.png" mainDark="/dark-main.png"
          laptopLight="/light-laptop.png" laptopDark="/dark-laptop.png"
          mobileLight="/light-mobile.png" mobileDark="/dark-mobile.png"
          isReal={true}
        />
      </div>

      {/* --- PROJECT 2 --- */}
      <div className="mb-40 z-20">
        <div className="mb-12 flex flex-col items-end text-right">
          <span className="text-accent-cyan font-mono text-sm tracking-widest font-bold mb-2 block">02</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tighter text-foreground">
            LYDIA PSICOLOGÍA
          </h2>
          <p className="text-muted text-sm max-w-xl">
            Professional psychology practice website designed for a real client, focused on warmth, trust, and conversion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 bg-transparent z-20">

          {/* STACK */}
          <motion.div className="order-2 md:order-1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase tracking-tighter text-foreground">
              THE <span className="text-accent-purple">STACK</span>
            </h3>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl border-accent-cyan/30">
                <span className="text-xs font-bold text-accent-cyan">Next.js 14</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">React</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">Bootstrap 5</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">Vanilla CSS</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl border-accent-purple/30">
                <span className="text-xs font-bold text-accent-purple">SEO Optimized</span>
              </div>
            </div>
          </motion.div>

          {/* PROBLEM */}
          <motion.div className="order-1 md:order-2 flex flex-col items-end text-right" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase tracking-tighter text-foreground">
              THE <span className="text-accent-cyan">CHALLENGE</span>
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              A psychology professional needed a web presence that transmits trust, warmth, and professionalism from the very first glance. The site needed to be fully GDPR compliant with a clear privacy, legal notice, and cookies policy pages, all while being optimized for SEO to attract new patients organically.
            </p>
          </motion.div>
        </div>

        {/* Reusable Image Gallery */}
        <ImageGallery
          mainLight="/main.png" mainDark="/main.png"
          laptopLight="/laptop.png" laptopDark="/laptop.png"
          mobileLight="/mobile.png" mobileDark="/mobile.png"
          isReal={true}
          mainBlur={true}
          mobileBlur={true}
          designInfo={{
            tokens: ['#f6f3ee', '#e6ddcf', '#2d1b14', '#ffffff'],
            fontName: 'Lato + Georgia',
            fontSub: 'sans-serif · serif · warm & trustworthy',
            stats: [
              { value: 'A+', label: 'SEO Score', color: 'text-accent-cyan' },
              { value: 'GDPR', label: 'Compliant', color: 'text-accent-purple' },
              { value: '4', label: 'Legal Pages', color: '' },
              { value: 'SSG', label: 'Rendering', color: '' },
            ]
          }}
        />
      </div>

      {/* --- PROJECT 3 (commented out — pending company approval) --- */}
      {false && (
      <div className="mb-12 z-20">
        <div className="mb-12">
          <span className="text-foreground font-mono text-sm tracking-widest font-bold mb-2 block opacity-50">03</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tighter text-foreground">
            AI AGENTS PLATFORM
          </h2>
          <p className="text-muted text-sm max-w-xl">
            Enterprise-grade platform for creating, deploying and orchestrating AI agents — built during my internship as part of a larger commercial product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 bg-transparent z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase tracking-tighter text-foreground">
              THE <span className="text-accent-purple">ARCHITECTURE</span>
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              A modular B2B platform sold to enterprises, designed to integrate into larger systems via API calls. It handles full agent lifecycle: creation, versioning, user permissions, and execution. Notably, it includes AI-powered code documentation and auto-correction, malicious file detection, and multi-language translation via dedicated Python microservices. Developed collaboratively as a team project.
            </p>
            {/* Confidentiality notice */}
            <div className="flex items-center gap-2 mt-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 max-w-sm">
              <span className="text-accent-purple text-xs">⚠</span>
              <span className="text-[11px] text-muted font-mono">Screenshots omitted — proprietary internship project</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase tracking-tighter text-foreground">
              THE <span className="text-accent-cyan">STACK</span>
            </h3>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl border-accent-cyan/30">
                <span className="text-xs font-bold text-accent-cyan">Spring Boot</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl border-accent-purple/30">
                <span className="text-xs font-bold text-accent-purple">Angular</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">Python FastAPI</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">Argos Translate</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">Prism.js</span>
              </div>
              <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-foreground">Docker</span>
              </div>
            </div>

            {/* Feature pills */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-muted tracking-widest uppercase mb-3">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {['Agent Creation & Versioning', 'User & Permission Control', 'AI Code Documentation', 'Auto-correction Engine', 'Malicious File Scanner', 'Agent Execution API', 'Multi-language Translation'].map((f) => (
                  <span key={f} className="text-[10px] font-mono text-foreground dark:text-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* NO IMAGE GALLERY — proprietary internship project */}
      </div>
      )}

    </section>
  );
}
