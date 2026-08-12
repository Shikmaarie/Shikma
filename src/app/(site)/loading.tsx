export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="flex flex-col items-center gap-6">
        {/* Three pulsing nodes, echoing the helix in the hero. */}
        <div className="flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-2.5 animate-pulse-glow rounded-full bg-gradient-to-b from-gold-lt to-gold-dp"
              style={{ animationDelay: `${i * 0.22}s`, animationDuration: "1.4s" }}
            />
          ))}
        </div>
        <p className="text-sm tracking-[0.2em] text-gold/60">טוען…</p>
      </div>
    </div>
  );
}
