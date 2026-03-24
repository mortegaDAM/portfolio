"use client";

import { useState, useEffect } from "react";

export function useIsMobile(threshold = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isWindowMobile = window.innerWidth < threshold;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isWindowMobile || isTouchDevice);
    };

    // Initial check
    checkMobile();

    // Event listener for window resize
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [threshold]);

  return isMobile;
}
