"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Two-color palette: lavender + aquamarine — ties with accent-purple & accent-cyan branding
const BLOBS = [
  { size: 0.55, home: new THREE.Vector3(-3.2, 2.0, -2.0), color: "#c4b5fd" },  // lavender
  { size: 0.85, home: new THREE.Vector3(2.8, -0.8, -3.0), color: "#5eead4" },  // aquamarine
  { size: 1.1,  home: new THREE.Vector3(1.2, 2.8, -4.0), color: "#c4b5fd" },   // lavender
  { size: 0.45, home: new THREE.Vector3(-2.5, -2.5, -2.5), color: "#5eead4" }, // aquamarine
  { size: 0.70, home: new THREE.Vector3(0.3, -2.0, -1.5), color: "#c4b5fd" },  // lavender
  { size: 0.50, home: new THREE.Vector3(3.2, 1.8, -1.5), color: "#5eead4" },   // aquamarine
  { size: 0.95, home: new THREE.Vector3(-1.5, 0.5, -3.5), color: "#c4b5fd" },  // lavender
  { size: 0.40, home: new THREE.Vector3(2.0, 2.5, -2.0), color: "#5eead4" },   // aquamarine
  { size: 0.60, home: new THREE.Vector3(-3.0, -0.5, -1.8), color: "#c4b5fd" }, // lavender
  { size: 0.35, home: new THREE.Vector3(1.5, -3.0, -2.5), color: "#5eead4" },  // aquamarine
];

export default function LiquidBlob() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const cursorWorld = useRef(new THREE.Vector3(0, 0, -2));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    cursorWorld.current.set(mouse.current.x * 4, mouse.current.y * 3, -2);

    // Slow continuous rotation of the whole constellation
    groupRef.current.rotation.x += delta * 0.04;
    groupRef.current.rotation.y += delta * 0.06;

    // Smooth group parallax
    const targetX = (mouse.current.x * Math.PI) / 8;
    const targetY = (mouse.current.y * Math.PI) / 8;
    groupRef.current.rotation.y += 0.04 * (targetX - groupRef.current.rotation.y);
    groupRef.current.rotation.x += 0.04 * (targetY - groupRef.current.rotation.x);

    groupRef.current.children.forEach((child, i) => {
      const blob = BLOBS[i];
      if (!blob) return;

      // Gentle sine-wave floating, each on a different phase
      child.position.y += Math.sin(state.clock.elapsedTime * 0.4 + i * 1.5) * 0.002;
      child.rotation.x += delta * (i % 2 === 0 ? 0.08 : -0.08);
      child.rotation.y += delta * 0.15;

      // Magnetic attraction toward cursor
      const dx = cursorWorld.current.x - blob.home.x;
      const dy = cursorWorld.current.y - blob.home.y;
      const attractStrength = (1 / blob.size) * 0.25;
      child.position.x += 0.03 * ((blob.home.x + dx * attractStrength) - child.position.x);
      child.position.y += 0.03 * ((blob.home.y + dy * attractStrength) - child.position.y);

      // Proximity-based distortion
      const blobWorld = new THREE.Vector3(child.position.x, child.position.y, blob.home.z);
      const dist = blobWorld.distanceTo(cursorWorld.current);
      const proximity = Math.max(0, 1 - dist / 3);
      const mat = (child as THREE.Mesh).material as any;
      if (mat?.distort !== undefined) {
        mat.distort += 0.05 * (0.35 + proximity * 0.45 - mat.distort);
      }
    });
  });

  useEffect(() => {
    if (!groupRef.current) return;
    const ctx = gsap.context(() => {
      const group = groupRef.current;
      if (!group) return;
      gsap.to(group.scale, {
        x: 1.3, y: 1.3, z: 1.3,
        scrollTrigger: { trigger: "#work", start: "top bottom", end: "top top", scrub: 1 }
      });
      gsap.to(group.scale, {
        x: 0.8, y: 0.8, z: 0.8,
        scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom bottom", scrub: 1 }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef}>
      {BLOBS.map((blob, idx) => (
        <Sphere key={idx} args={[blob.size, 64, 64]} position={blob.home.toArray()}>
          <MeshDistortMaterial
            color={blob.color}
            distort={0.35}
            speed={1.2}
            roughness={0.05}
            transmission={1}
            thickness={1.2}
            ior={1.5}
            transparent
            opacity={0.75}
          />
        </Sphere>
      ))}
    </group>
  );
}
