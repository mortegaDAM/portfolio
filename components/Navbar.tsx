"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Star, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    const sections = ["home", "work", "skills", "contact"];
    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Track mouse proximity to the top of the screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 120) {
        setIsHoveringTop(true);
      } else {
        setIsHoveringTop(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 50 && y > lastYPos) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastYPos(y);
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Shared glass pill styling (matching original full-width navbar)
  const pillClasses = "pointer-events-auto backdrop-blur-md border border-white/10 bg-white/[0.03] shadow-sm";

  const getLinkClass = (id: string) => {
    const isActive = activeSection === id;
    return `cursor-pointer transition-all duration-300 ${
      isActive 
        ? "text-foreground font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
        : "text-muted hover:text-foreground"
    }`;
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      initial="visible"
      animate={hidden && !isHoveringTop ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-6 pointer-events-none"
    >
      {/* Left Pill - Logo */}
      <Link href="/" className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-sans font-bold tracking-[0.2em] transition-transform hover:scale-105 duration-300 ${pillClasses}`}>
        <Star className="text-accent-purple" fill="currentColor" size={16} /> AURA NOIR
      </Link>

      {/* Center Pill - Links */}
      <div className={`hidden md:flex items-center px-8 py-3.5 rounded-full ${pillClasses}`}>
        <ul className="flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
          <li>
            <a href="#home" onClick={(e) => handleScroll(e, 'home')} className={getLinkClass('home')}>Home</a>
          </li>
          <li>
            <a href="#work" onClick={(e) => handleScroll(e, 'work')} className={getLinkClass('work')}>Work</a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className={getLinkClass('skills')}>Skills</a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className={getLinkClass('contact')}>Contact</a>
          </li>
        </ul>
      </div>
      
      {/* Right Pill - Theme Toggle */}
      <div className="flex items-center gap-4">
        {mounted && (
           <button 
             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
             className={`w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 text-foreground ${pillClasses}`}
             aria-label="Toggle theme"
           >
             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
           </button>
        )}
      </div>
    </motion.nav>
  );
}
