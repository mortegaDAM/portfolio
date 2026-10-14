"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { email, socials } from "@/lib/i18n";
import type { Dictionary, Locale } from "@/lib/i18n";

const iconButton = "flex h-10 w-10 items-center justify-center text-muted transition-colors duration-300 hover:text-foreground";

export default function Navbar({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const navLinks = [
    { id: "work", label: t.work, href: `/${lang}#work`, isScroll: true },
    { id: "journey", label: t.journey, href: `/${lang}#journey`, isScroll: true },
    { id: "skills", label: t.skills, href: `/${lang}#skills`, isScroll: true },
    { id: "about", label: t.about, href: `/${lang}/about`, isScroll: false },
    { id: "contact", label: t.contact, href: `/${lang}#contact`, isScroll: true },
  ];
  const other: Locale = lang === "es" ? "en" : "es";

  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const isAbout = pathname.endsWith("/about");
  // Same page in the other language; the cookie keeps the choice on later visits
  const otherHref = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${other}`) || `/${other}`;
  const rememberLanguage = () => {
    document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=31536000; samesite=lax`;
  };

  useEffect(() => {
    if (isAbout) return;

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

    const sections = ["home", "work", "journey", "skills", "contact"];

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
  }, [isAbout]);

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
      const near = e.clientY < 120;
      setIsHoveringTop((prev) => (prev === near ? prev : near));
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
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

  const getLinkClass = (id: string, inMenu = false) => {
    const isActive = (isAbout ? 'about' : activeSection) === id;
    if (inMenu) {
      return `cond text-5xl font-bold uppercase transition-colors duration-300 ${
        isActive ? "text-accent" : "text-foreground"
      }`;
    }
    return `cursor-pointer transition-colors duration-300 ${
      isActive ? "text-foreground" : "text-muted hover:text-foreground"
    }`;
  };

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
        className="gutter fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-line bg-background/85 backdrop-blur-md"
      >
        <Link href={`/${lang}`} className="text-[13px] font-bold tracking-[0.06em]" translate="no">
          MORTEGA DEV
        </Link>

        {/* Links (Desktop) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-[13px] font-medium tracking-[0.06em] lg:flex">
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

        {/* Right Section - Socials, Theme Toggle & Mobile Menu */}
        <div className="-mr-2.5 flex items-center">
          <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={`${iconButton} hidden md:flex`}>
            <Github size={18} />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`${iconButton} hidden md:flex`}>
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${email}`} aria-label="Email" className={`${iconButton} hidden md:flex`}>
            <Mail size={18} />
          </a>
          <Link href={otherHref} hrefLang={other} onClick={rememberLanguage} aria-label={t.switchTo} className={`${iconButton} text-xs font-bold tracking-[0.08em]`}>
            {t.switchToShort}
          </Link>
          {/* Both icons render; the theme class picks one, so no mount check is needed */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={iconButton}
            aria-label={t.theme}
          >
            <Sun size={18} className="hidden dark:block" />
            <Moon size={18} className="dark:hidden" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${iconButton} lg:hidden`}
            aria-label={t.menu}
            aria-expanded={isMenuOpen}
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
            className="gutter fixed inset-0 z-40 flex flex-col justify-center overflow-hidden bg-background lg:hidden"
          >
            <ul className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
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

            <div className="-ml-2.5 mt-12 flex items-center border-t border-line pt-6">
              <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconButton}>
                <Github size={20} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconButton}>
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${email}`} aria-label="Email" className={iconButton}>
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
