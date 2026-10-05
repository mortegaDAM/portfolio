import type { CSSProperties } from "react";
import Image from "next/image";

type Props = {
  shot: { light: string; dark: string; width: number; height: number };
  alt: string;
  sizes: string;
  className?: string;
  blur?: CSSProperties;
};

// Project screenshot that follows the active theme, with an optional privacy blur region.
export default function Shot({ shot, alt, sizes, className = "", blur }: Props) {
  const themed = shot.light !== shot.dark;
  return (
    <>
      <Image
        src={shot.dark}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        alt={alt}
        className={`${className} ${themed ? "hidden dark:block" : ""}`}
      />
      {themed && (
        <Image src={shot.light} width={shot.width} height={shot.height} sizes={sizes} alt={alt} className={`${className} dark:hidden`} />
      )}
      {/* Privacy blur for the client's photo */}
      {blur && <div className="privacy-blur pointer-events-none absolute" style={blur} />}
    </>
  );
}
