"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";
import gsap from "gsap";

// Build a soft circular soft-blob texture using canvas
function createCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.7)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export default function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;
  const { theme } = useTheme();

  // Create the soft circle sprite texture once
  const circleTexture = useMemo(() => createCircleTexture(), []);

  // Track mouse position globally (bypasses pointer-events-none on canvas container)
  const mouse = useRef(new THREE.Vector2(0, 0));
  const prevMouse = useRef(new THREE.Vector2(0, 0));
  const velocity = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert screen coords to NDC (-1 to 1)
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Create random spherical distribution of particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
       const r = 10 * Math.cbrt(Math.random());
       const theta = Math.random() * 2 * Math.PI;
       const phi = Math.acos(2 * Math.random() - 1);
       positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
       positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
       positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Calculate mouse velocity
    velocity.current.x = mouse.current.x - prevMouse.current.x;
    velocity.current.y = mouse.current.y - prevMouse.current.y;
    prevMouse.current.set(mouse.current.x, mouse.current.y);

    const speed = velocity.current.length();
    
    // Constant slow rotation, boosted by mouse velocity
    const rotationBoost = 1 + speed * 40;
    pointsRef.current.rotation.y -= delta * 0.05 * rotationBoost;
    pointsRef.current.rotation.x -= delta * 0.02 * rotationBoost;

    // Mouse distance from center for "breathing" scale effect
    const mouseDistance = Math.sqrt(mouse.current.x ** 2 + mouse.current.y ** 2);
    const targetScale = 1 + mouseDistance * 0.12;
    pointsRef.current.scale.x += 0.05 * (targetScale - pointsRef.current.scale.x);
    pointsRef.current.scale.y += 0.05 * (targetScale - pointsRef.current.scale.y);
    pointsRef.current.scale.z += 0.05 * (targetScale - pointsRef.current.scale.z);

    // Stronger parallax tilt
    const targetX = (mouse.current.x * Math.PI) / 5;
    const targetY = (mouse.current.y * Math.PI) / 5;
    pointsRef.current.rotation.y += 0.04 * (targetX - pointsRef.current.rotation.y);
    pointsRef.current.rotation.x += 0.04 * (targetY - pointsRef.current.rotation.x);
  });

  useEffect(() => {
    if (!pointsRef.current) return;

    const ctx = gsap.context(() => {
      const points = pointsRef.current;
      if (!points) return;

      gsap.to(points.scale, {
        x: 1.3, y: 1.3, z: 1.3,
        scrollTrigger: { trigger: "#work", start: "top bottom", end: "top top", scrub: 1 }
      });
      gsap.to(points.rotation, {
        z: Math.PI / 4,
        scrollTrigger: { trigger: "#skills", start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(points.scale, {
        x: 0.8, y: 0.8, z: 0.8,
        scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom bottom", scrub: 1 }
      });
    });

    return () => ctx.revert();
  }, []);

  const particleColor = theme === 'light' ? '#7c5cbf' : '#a855f7';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={particleColor}
        map={circleTexture}
        alphaMap={circleTexture}
        alphaTest={0.001}
        transparent
        opacity={0.7}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
