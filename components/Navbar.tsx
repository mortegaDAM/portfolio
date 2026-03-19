"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Star, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 50 && y > lastYPos) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastYPos(y);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm"
    >
      <Link href="/" className="text-sm font-sans font-bold tracking-[0.2em] flex items-center gap-2">
        <Star className="text-accent-purple" fill="currentColor" size={16} /> AURA NOIR
      </Link>

      <div className="flex items-center gap-6 md:gap-12">
        <ul className="hidden md:flex items-center gap-12 text-xs font-bold tracking-[0.2em] text-muted uppercase">
          <li>
            <Link href="#home" className="hover:text-foreground transition-colors">Home</Link>
          </li>
          <li>
            <Link href="#work" className="text-foreground transition-colors border border-black/5 dark:border-white/10 px-5 py-2 rounded-full bg-black/5 dark:bg-white/5 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">Work</Link>
          </li>
          <li>
            <Link href="#skills" className="hover:text-foreground transition-colors">Skills</Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
          </li>
        </ul>
        
        {mounted && (
           <button 
             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
             className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors shadow-sm text-foreground"
             aria-label="Toggle theme"
           >
             {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
           </button>
        )}
      </div>
    </motion.nav>
  );
}
