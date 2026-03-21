"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function SocialSidebar() {
  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center"
    >
      <div className="flex flex-col gap-6 backdrop-blur-md border border-white/10 bg-white/[0.03] shadow-sm p-3 rounded-full relative hover:border-white/20 transition-colors duration-500">
        <a href="https://github.com/mortegaDAM" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground hover:scale-110 transition-transform duration-300" aria-label="GitHub">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/mario-ortega-navarro-898093198/" target="_blank" rel="noreferrer" className="text-muted hover:text-accent-cyan hover:scale-110 transition-transform duration-300" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
        <a href="mailto:mario98.mo@gmail.com" className="text-muted hover:text-accent-purple hover:scale-110 transition-transform duration-300" aria-label="Email">
          <Mail size={20} />
        </a>
      </div>
    </motion.div>
  );
}
