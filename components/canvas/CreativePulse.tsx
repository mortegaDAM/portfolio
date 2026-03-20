"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import ParticleSystem from "./ParticleSystem";
import LiquidBlob from "./LiquidBlob";
import { Environment } from "@react-three/drei";
import { useTheme } from "next-themes";

export default function CreativePulse() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isLight = currentTheme === 'light';

  return (
    <div className={`fixed inset-0 w-screen h-screen z-[1] pointer-events-none overflow-hidden ${isLight ? 'opacity-100 mix-blend-normal' : 'opacity-80 mix-blend-screen'}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={isLight ? 1 : 0.5} />
        {isLight && <directionalLight position={[10, 10, 5]} intensity={1.5} />}
        {isLight && <Environment preset="city" />}
        
        <Suspense fallback={null}>
          {isLight ? <LiquidBlob /> : <ParticleSystem />}
        </Suspense>
      </Canvas>
    </div>
  );
}
