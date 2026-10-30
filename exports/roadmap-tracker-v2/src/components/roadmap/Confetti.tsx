import { useMemo } from "react";

const colors = ["hsl(var(--gold))", "hsl(var(--gold-light))", "hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--warning))"];

/** One short burst of brand-coloured confetti. Hidden with reduced motion. */
export const Confetti = ({ burst }: { burst: number }) => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.8 + Math.random() * 1.4,
        size: 6 + Math.random() * 6,
        drift: `${(Math.random() - 0.5) * 30}vw`,
        spin: `${Math.random() * 720}deg`,
        color: colors[i % colors.length],
        round: i % 3 === 0,
      })),
    // a new burst re-rolls the pieces
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burst],
  );
  if (!burst) return null;
  return (
    <div key={burst} className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece absolute top-0 block"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.round ? p.size : p.size * 0.45,
              background: p.color,
              borderRadius: p.round ? "9999px" : "2px",
              animation: `confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(.2,.6,.4,1) forwards`,
              "--drift": p.drift,
              "--spin": p.spin,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
