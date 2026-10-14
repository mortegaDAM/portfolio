import Kinetic from "@/components/Kinetic";

// Section headline: as large as the viewport allows, never wider than the line.
// The CSS size is a first estimate from the letter count; the engine trims it to fit exactly.
export default function Giant({ text }: { text: string }) {
  const short = text.length <= 6;
  const estimate = (short ? 79 : 150) / text.length;
  return (
    <div className="gutter pb-6 pt-28">
      <Kinetic
        as="h2"
        text={text}
        className="giant kin-row h-[0.84em] select-none leading-[0.84] tracking-[-0.02em]"
        min={200}
        max={800}
        wide={short ? 1 : 0.35}
        sw
        fit
        style={{ fontSize: `min(19.8vw, ${estimate.toFixed(2)}vw)` }}
      />
    </div>
  );
}
