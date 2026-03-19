"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, -100]);

  // Mouse parallax interaction (Kento style)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const [mouseMoved, setMouseMoved] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseMoved) setMouseMoved(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, mouseMoved]);

  return (
    <section id="home" className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Ocean Background */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-x-0 -top-[20%] h-[140%] z-0 bg-background">
         <img 
           src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop" 
           className="w-full h-full object-cover opacity-[0.8] dark:opacity-30 select-none pointer-events-none mix-blend-normal dark:mix-blend-screen" 
           alt="Dark Ocean Waves" 
         />
         {/* Glitch lines overlaid */}
         <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.4)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30 dark:opacity-20 pointer-events-none" />
      </motion.div>

      {/* Background glowing orb following mouse */}
      <motion.div 
        className="absolute top-0 left-0 w-[30vw] h-[30vw] -ml-[15vw] -mt-[15vw] bg-accent-purple/20 rounded-full blur-[100px] pointer-events-none z-0 dark:mix-blend-screen transition-opacity duration-1000"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          opacity: mouseMoved ? 1 : 0
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[2rem] py-16 px-12 md:py-24 md:px-32 text-center mx-4 w-[90%] max-w-4xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_80px_rgba(168,85,247,0.15)] flex flex-col items-center"
      >
        <motion.h2 
          initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.3, duration: 0.8 }}
          className="text-accent-purple font-sans tracking-[0.3em] text-[10px] md:text-sm font-bold uppercase mb-4 dark:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
        >
          Branding / Web Design
        </motion.h2>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl md:text-[6rem] font-display font-bold text-foreground leading-[0.9] tracking-tighter"
        >
          LUMINA<br />
          STUDIOS
        </motion.h1>
      </motion.div>
    </section>
  );
}
