"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Star, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Navbar() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    if (pathname === '/about') {
      setActiveSection('about');
      return;
    }

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
    
    const timeoutId = setTimeout(() => {
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Track mouse proximity to the top of the screen (Disabled on mobile)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 120) {
        setIsHoveringTop(true);
      } else {
        setIsHoveringTop(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 50 && y > lastYPos) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastYPos(y);
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu on click
    }
  };

  const pillClasses = "pointer-events-auto backdrop-blur-md border border-white/10 bg-white/[0.03] shadow-sm";

  const getLinkClass = (id: string, isMobile = false) => {
    const isActive = activeSection === id;
    if (isMobile) {
      return `text-3xl font-display font-bold transition-all duration-300 ${
        isActive ? "text-accent-purple" : "text-foreground opacity-50 hover:opacity-100"
      }`;
    }
    return `cursor-pointer transition-all duration-300 ${isActive
        ? "text-foreground font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        : "text-muted hover:text-foreground"
      }`;
  };

  const navLinks = [
    { id: 'home', label: 'Home', href: '/#home', isScroll: true },
    { id: 'work', label: 'Work', href: '/#work', isScroll: true },
    { id: 'skills', label: 'Skills', href: '/#skills', isScroll: true },
    { id: 'about', label: 'About', href: '/about', isScroll: false },
    { id: 'contact', label: 'Contact', href: '/#contact', isScroll: true },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        initial="visible"
        animate={hidden && !isHoveringTop && !isMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-6 pointer-events-none"
      >
        {/* Left Pill - Logo */}
        <Link href="/" className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-sans font-bold tracking-[0.2em] transition-transform hover:scale-105 duration-300 ${pillClasses}`}>
          <Star className="text-accent-purple" fill="currentColor" size={16} /> MORTEGA DEV
        </Link>

        {/* Center Pill - Links (Desktop) */}
        <div className={`hidden md:flex items-center px-8 py-3.5 rounded-full absolute left-1/2 -translate-x-1/2 ${pillClasses}`}>
          <ul className="flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
            {navLinks.map((link) => (
              <li key={link.id}>
                {link.isScroll ? (
                  <a href={link.href} onClick={(e) => handleScroll(e, link.id)} className={getLinkClass(link.id)}>{link.label}</a>
                ) : (
                  <Link href={link.href} className={getLinkClass(link.id)}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 text-foreground pointer-events-auto backdrop-blur-md bg-white/[0.03] shadow-sm focus:outline-none border-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 text-foreground pointer-events-auto ${pillClasses}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-2xl md:hidden overflow-hidden flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  {link.isScroll ? (
                    <a 
                      href={link.href} 
                      onClick={(e) => handleScroll(e, link.id)} 
                      className={getLinkClass(link.id, true)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className={getLinkClass(link.id, true)}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
            
            {/* Background decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 bg-[radial-gradient(circle_at_center,rgba(var(--accent-purple-rgb),0.1)_0%,transparent_70%)] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
