"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

function TrailDot({ mouseX, mouseY, index }: { mouseX: MotionValue<number>, mouseY: MotionValue<number>, index: number }) {
  // Incrementar la masa y la amortiguación (damping) progresivamente para crear el retardo continuo del humo
  const springConfig = { 
    damping: 35 + index * 6, 
    stiffness: 400 - index * 20, 
    mass: 0.5 + index * 0.3
  };
  
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Offset para centrar el punto de humo (tamaño 24x24 -> 12px de radio)
  const x = useTransform(springX, v => v - 12);
  const y = useTransform(springY, v => v - 12);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-accent-purple rounded-full pointer-events-none z-[9998]"
      style={{
        x,
        y,
        scale: Math.max(0.1, 1 - index * 0.1),
        opacity: Math.max(0, 0.4 - index * 0.05),
        filter: `blur(${3 + index * 2}px)`
      }}
    />
  );
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // El trackeado real del ratón
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Resorte principal para el aro exterior del cursor
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Offset principal (tamaño 32x32 -> 16px radio)
  const ringX = useTransform(springX, v => v - 16);
  const ringY = useTransform(springY, v => v - 16);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Dibujar 8 piezas de la cola (rastro de humo)
  const trailArray = Array.from({ length: 8 });

  return (
    <>
      <div className={isVisible ? "opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300"}>
        {/* Rastro de Humo */}
        {trailArray.map((_, i) => (
          <TrailDot key={`trail-${i}`} index={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
        
        {/* Aro Principal y Bolita Central */}
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-purple/40 pointer-events-none z-[9999] hidden md:flex items-center justify-center bg-transparent backdrop-blur-[2px]"
          style={{
            x: ringX,
            y: ringY,
          }}
        >
          <div className="w-1.5 h-1.5 bg-accent-purple rounded-full shadow-[0_0_10px_rgba(var(--accent-purple-rgb),0.8)]" />
        </motion.div>
      </div>
    </>
  );
}
