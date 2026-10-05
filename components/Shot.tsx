import Image from "next/image";

type Props = {
  shot: { light: string; dark: string; width: number; height: number };
  alt: string;
  sizes: string;
  className?: string;
};

// Project screenshot that follows the active theme.
export default function Shot({ shot, alt, sizes, className = "" }: Props) {
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
    </>
  );
}
