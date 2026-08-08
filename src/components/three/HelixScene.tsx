"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

/**
 * The hero's 3D object: a double helix — the "DNA of business" — rendered as
 * two strands of glowing gold nodes joined by rungs, drifting inside a field
 * of dust. Everything is instanced, so the whole scene is a handful of draw
 * calls regardless of node count.
 */

const GOLD = new THREE.Color("#d3a96a");
const GOLD_LIGHT = new THREE.Color("#edd4a2");
const TEAL = new THREE.Color("#14606a");
const MINT = new THREE.Color("#85c9bc");

type HelixConfig = {
  turns: number;
  nodesPerTurn: number;
  radius: number;
  height: number;
};

function useHelixPoints({ turns, nodesPerTurn, radius, height }: HelixConfig) {
  return useMemo(() => {
    const total = Math.round(turns * nodesPerTurn);
    const strandA: THREE.Vector3[] = [];
    const strandB: THREE.Vector3[] = [];

    for (let i = 0; i < total; i++) {
      const t = i / (total - 1);
      const angle = t * turns * Math.PI * 2;
      const y = (t - 0.5) * height;
      // Taper the helix at both ends so it reads as an object, not a cut tube.
      const taper = Math.sin(t * Math.PI) ** 0.35;
      const r = radius * taper;

      strandA.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
      strandB.push(
        new THREE.Vector3(
          Math.cos(angle + Math.PI) * r,
          y,
          Math.sin(angle + Math.PI) * r,
        ),
      );
    }

    return { strandA, strandB, total };
  }, [turns, nodesPerTurn, radius, height]);
}

function Helix({ quality }: { quality: "low" | "high" }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // The headline sits on the right (RTL), so on landscape the helix slides
  // into the empty left third. On portrait it centres and sits behind the text.
  const landscape = viewport.aspect > 1;
  const offsetX = landscape ? -viewport.width * 0.27 : 0;
  // On portrait there's no free column, so the helix retreats behind the copy.
  const offsetZ = landscape ? 0 : -3.5;

  const config: HelixConfig =
    quality === "high"
      ? { turns: 5, nodesPerTurn: 26, radius: 1.15, height: 8.4 }
      : { turns: 4, nodesPerTurn: 16, radius: 1.05, height: 7 };

  const { strandA, strandB, total } = useHelixPoints(config);

  // Every Nth pair gets a rung, so the ladder reads without cluttering.
  const rungStep = quality === "high" ? 3 : 4;
  const rungs = useMemo(() => {
    const out: { pos: THREE.Vector3; quat: THREE.Quaternion; len: number }[] = [];
    for (let i = 0; i < total; i += rungStep) {
      const a = strandA[i];
      const b = strandB[i];
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const dir = b.clone().sub(a);
      const len = dir.length();
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize(),
      );
      out.push({ pos: mid, quat, len });
    }
    return out;
  }, [strandA, strandB, total, rungStep]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;

    // Gentle pointer parallax — the helix leans toward the cursor.
    const { x, y } = state.pointer;
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      x * 0.16,
      0.04,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.16,
      0.04,
    );
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.18;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      offsetX,
      0.08,
    );
  });

  return (
    <group ref={group} position={[offsetX, 0, offsetZ]}>
      {/* Strand nodes */}
      <Instances limit={total * 2} range={total * 2}>
        <sphereGeometry args={[0.052, 14, 14]} />
        <meshStandardMaterial
          color={GOLD_LIGHT}
          emissive={GOLD}
          emissiveIntensity={2.6}
          roughness={0.25}
          metalness={0.9}
          toneMapped={false}
        />
        {strandA.map((p, i) => (
          <Node key={`a${i}`} position={p} index={i} />
        ))}
        {strandB.map((p, i) => (
          <Node key={`b${i}`} position={p} index={i} phase={Math.PI} />
        ))}
      </Instances>

      {/* Rungs */}
      <Instances limit={rungs.length} range={rungs.length}>
        <cylinderGeometry args={[0.006, 0.006, 1, 6]} />
        <meshStandardMaterial
          color={MINT}
          emissive={TEAL}
          emissiveIntensity={0.9}
          transparent
          opacity={0.3}
          roughness={0.4}
          toneMapped={false}
        />
        {rungs.map((r, i) => (
          <Instance
            key={i}
            position={r.pos}
            quaternion={r.quat}
            scale={[1, r.len, 1]}
          />
        ))}
      </Instances>
    </group>
  );
}

/** A single helix node with a slow, offset breathing pulse. */
function Node({
  position,
  index,
  phase = 0,
}: {
  position: THREE.Vector3;
  index: number;
  phase?: number;
}) {
  const ref = useRef<THREE.Object3D>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 1.6 + index * 0.32 + phase;
    const s = 0.78 + Math.sin(t) * 0.28;
    ref.current.scale.setScalar(s);
  });

  return <Instance ref={ref} position={position} />;
}

/** Slow-drifting dust so the helix sits in space rather than on a flat void. */
function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Pushed out well past the helix so the dust reads as depth, not clutter.
      const r = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const c = Math.random() > 0.78 ? MINT : GOLD;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.035;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

/** Nudges the camera with the pointer for a little depth on desktop. */
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      state.pointer.x * 0.6,
      0.03,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      state.pointer.y * 0.35,
      0.03,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HelixScene({
  quality = "high",
}: {
  quality?: "low" | "high";
}) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 2] : [1, 1.5]}
      camera={{ position: [0, 0, 9.5], fov: 42 }}
      gl={{
        antialias: quality === "high",
        alpha: true,
        powerPreference: "high-performance",
      }}
      // The hero is decorative; screen readers get the headline instead.
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <fog attach="fog" args={["#04171a", 9, 20]} />

      <ambientLight intensity={0.35} />
      <pointLight position={[5, 4, 6]} intensity={55} color="#edd4a2" distance={30} />
      <pointLight position={[-6, -3, 3]} intensity={35} color="#14606a" distance={28} />
      <pointLight position={[0, 6, -6]} intensity={22} color="#85c9bc" distance={26} />

      <Helix quality={quality} />
      <Dust count={quality === "high" ? 500 : 220} />
      {quality === "high" && <CameraRig />}
    </Canvas>
  );
}
