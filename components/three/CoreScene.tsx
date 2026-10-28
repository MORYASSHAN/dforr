"use client";

/*
 * three.js scene for the "Spatial Reality Core" section.
 * Five forms, one per DFORR dimension. All forms are mounted; the active one
 * scales in while the others scale out. Drag to orbit, otherwise it auto-rotates.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

export type CoreMode = "spatial" | "acoustic" | "embodied" | "metric" | "secure";

const VIOLET = "#f3bfd6";
const LILAC = "#f7d6e5";
const HOT = "#e0559a";
const GOLD = "#eaa21c";

type Drag = { x: number; y: number };

/** Lerps a group's scale toward 1 when active, 0 when not. */
function useMorph(active: boolean) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const target = active ? 1 : 0.0001;
    const s = THREE.MathUtils.damp(g.scale.x, target, 6, dt);
    g.scale.setScalar(s);
    g.visible = s > 0.01;
  });
  return ref;
}

/* 00 — Spatial: a rotating hypercube (4th-dimension lattice) inside an icosphere. */
function Lattice({ active }: { active: boolean }) {
  const ref = useMorph(active);
  const inner = useRef<THREE.LineSegments>(null);
  const links = useRef<THREE.LineSegments>(null);
  const outerEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.6, 1.6, 1.6)), []);
  const innerEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), []);
  const linkGeo = useMemo(() => new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(new Array(8 * 2 * 3).fill(0), 3)), []);
  const corners = useMemo(() => [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => new THREE.Vector3(x, y, z)))), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const k = 0.42 + Math.sin(t * 0.9) * 0.18; // inner cube "breathes" through the outer one
    inner.current?.scale.setScalar(k / 0.5);
    const pos = linkGeo.attributes.position as THREE.BufferAttribute;
    corners.forEach((c, i) => {
      pos.setXYZ(i * 2, c.x * 0.8, c.y * 0.8, c.z * 0.8);
      pos.setXYZ(i * 2 + 1, c.x * k, c.y * k, c.z * k);
    });
    pos.needsUpdate = true;
    if (ref.current) ref.current.rotation.y = t * 0.15;
  });

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.9, 2]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.16} />
      </mesh>
      <lineSegments geometry={outerEdges}>
        <lineBasicMaterial color={LILAC} />
      </lineSegments>
      <lineSegments ref={inner} geometry={innerEdges}>
        <lineBasicMaterial color={HOT} />
      </lineSegments>
      <lineSegments ref={links} geometry={linkGeo}>
        <lineBasicMaterial color={LILAC} transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}

/* 01 — 15m positional sound: rings radiating out and fading (1/d² fall-off). */
function Acoustic({ active }: { active: boolean }) {
  const ref = useMorph(active);
  const rings = useRef<THREE.Mesh[]>([]);
  const COUNT = 7;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    rings.current.forEach((m, i) => {
      if (!m) return;
      const p = (t * 0.25 + i / COUNT) % 1;
      m.scale.setScalar(0.3 + p * 2.2);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - p) * (1 - p) * 0.9;
    });
  });
  return (
    <group ref={ref} rotation={[-1.1, 0, 0]}>
      {Array.from({ length: COUNT }, (_, i) => (
        <mesh key={i} ref={(m) => { if (m) rings.current[i] = m; }}>
          <torusGeometry args={[1, 0.012, 8, 128]} />
          <meshBasicMaterial color={LILAC} transparent />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

/* 02 — Embodied: a living, breathing form (stand-in for 40+ blendshapes). */
function Embodied({ active }: { active: boolean }) {
  const ref = useMorph(active);
  const mesh = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.SphereGeometry(1.15, 96, 96), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    if (!ref.current?.visible) return;
    const t = clock.elapsedTime;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      v.set(base[i * 3], base[i * 3 + 1], base[i * 3 + 2]);
      const n = Math.sin(v.x * 2.4 + t * 1.3) * Math.sin(v.y * 2.1 + t * 1.1) * Math.sin(v.z * 2.7 + t * 0.9);
      v.multiplyScalar(1 + n * 0.14);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    if (mesh.current) mesh.current.rotation.y = t * 0.2;
  });
  return (
    <group ref={ref}>
      <mesh ref={mesh} geometry={geo}>
        <meshStandardMaterial color={HOT} emissive="#5a2347" roughness={0.25} metalness={0.35} />
      </mesh>
    </group>
  );
}

/* 03 — Metric: a draping cloth surface with a gold zardozi hem. */
function Metric({ active }: { active: boolean }) {
  const ref = useMorph(active);
  const geo = useMemo(() => new THREE.PlaneGeometry(3.2, 3.2, 48, 48), []);
  const hemGeo = useMemo(() => new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(new Array(49 * 3).fill(0), 3)), []);
  const hem = useMemo(() => new THREE.Line(hemGeo, new THREE.LineBasicMaterial({ color: GOLD })), [hemGeo]);
  const drape = (x: number, y: number, t: number) =>
    Math.sin(x * 2 + t) * 0.18 + Math.cos(y * 1.6 + t * 0.8) * 0.14 - (x * x) * 0.12;
  useFrame(({ clock }) => {
    if (!ref.current?.visible) return;
    const t = clock.elapsedTime;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) pos.setZ(i, drape(pos.getX(i), pos.getY(i), t));
    pos.needsUpdate = true;
    const h = hemGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i <= 48; i++) {
      const x = -1.6 + (3.2 * i) / 48;
      h.setXYZ(i, x, -1.6, drape(x, -1.6, t));
    }
    h.needsUpdate = true;
  });
  return (
    <group ref={ref} rotation={[-0.9, 0, 0.3]}>
      <mesh geometry={geo}>
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.55} />
      </mesh>
      <primitive object={hem} />
    </group>
  );
}

/* 04 — Zero-knowledge: nested counter-rotating shells around a sealed core. */
function Secure({ active }: { active: boolean }) {
  const ref = useMorph(active);
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (a.current) a.current.rotation.set(t * 0.4, t * 0.3, 0);
    if (b.current) b.current.rotation.set(-t * 0.3, -t * 0.45, 0);
  });
  return (
    <group ref={ref}>
      <mesh ref={a}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshBasicMaterial color={LILAC} wireframe />
      </mesh>
      <mesh ref={b}>
        <dodecahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={HOT} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color="#ffffff" emissive={HOT} emissiveIntensity={0.6} flatShading />
      </mesh>
    </group>
  );
}

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const p: number[] = [];
    for (let i = 0; i < 700; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(4 + Math.random() * 6);
      p.push(v.x, v.y, v.z);
    }
    return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
  }, []);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.02; });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={LILAC} size={0.025} transparent opacity={0.7} />
    </points>
  );
}

/** Pulls the camera back on tall, narrow canvases (phones) so the core fits. */
function FitCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.z = aspect < 1 ? 6 / Math.max(aspect, 0.55) : 6;
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

function Rig({ mode, drag }: { mode: CoreMode; drag: RefObject<Drag> }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const d = drag.current;
    d.y += dt * 0.25; // gentle auto-rotate
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, d.y, 5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, d.x, 5, dt);
  });
  return (
    <group ref={ref}>
      <Lattice active={mode === "spatial"} />
      <Acoustic active={mode === "acoustic"} />
      <Embodied active={mode === "embodied"} />
      <Metric active={mode === "metric"} />
      <Secure active={mode === "secure"} />
    </group>
  );
}

export default function CoreScene({ mode }: { mode: CoreMode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag>({ x: 0.25, y: 0 });
  const [visible, setVisible] = useState(true);

  // Only animate while the section is on screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Drag to orbit.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let last: { x: number; y: number } | null = null;
    const down = (e: PointerEvent) => { last = { x: e.clientX, y: e.clientY }; el.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!last) return;
      drag.current.y += (e.clientX - last.x) * 0.01;
      drag.current.x = THREE.MathUtils.clamp(drag.current.x + (e.clientY - last.y) * 0.01, -1.2, 1.2);
      last = { x: e.clientX, y: e.clientY };
    };
    const up = () => { last = null; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div ref={wrap} className="core__canvas">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.75]} frameloop={visible ? "always" : "never"} gl={{ antialias: true, alpha: true }}>
        <FitCamera />
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={40} color={LILAC} />
        <pointLight position={[-4, -2, 2]} intensity={25} color="#eaa21c" />
        <Stars />
        <Rig mode={mode} drag={drag} />
      </Canvas>
    </div>
  );
}
