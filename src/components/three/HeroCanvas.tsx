"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HelixScene = dynamic(() => import("./HelixScene"), {
  ssr: false,
  loading: () => <StaticGlow />,
});

/**
 * Decides whether the 3D hero should run at all, and at what quality.
 *
 * The canvas is skipped entirely when the visitor has asked for reduced
 * motion or the device has no usable WebGL context; in both cases a still
 * gradient stands in, so the hero never renders as an empty black box.
 */
export default function HeroCanvas() {
  const [mode, setMode] = useState<"pending" | "off" | "low" | "high">("pending");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !hasWebGL()) {
      setMode("off");
      return;
    }

    const small = window.matchMedia("(max-width: 768px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
    setMode(small || weak ? "low" : "high");
  }, []);

  if (mode === "pending" || mode === "off") return <StaticGlow />;

  return (
    <div className="absolute inset-0">
      <HelixScene quality={mode} />
    </div>
  );
}

/** Still stand-in with the same colour weighting as the live scene. */
function StaticGlow() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,169,95,0.30),rgba(154,113,214,0.14)_45%,transparent_70%)] blur-3xl" />
      <div className="absolute left-[38%] top-[38%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,163,182,0.22),transparent_68%)] blur-3xl" />
    </div>
  );
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}
