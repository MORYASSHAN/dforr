"use client";

// The engine: dimension cards drive the three.js scene.
import dynamic from "next/dynamic";
import { useState } from "react";
import type { CoreMode } from "./three/CoreScene";

// three.js only runs in the browser, so load the scene client-side.
const CoreScene = dynamic(() => import("./three/CoreScene"), {
  ssr: false,
  loading: () => <div className="core__canvas core__canvas--loading" />,
});

const dimensions: { mode: CoreMode; idx: string; title: string; sub: string; text: string }[] = [
  { mode: "spatial", idx: "01", title: "Spatial", sub: "Gyroscope view", text: "Your phone's motion sensors move the camera, so tilting the phone is how you look around." },
  { mode: "acoustic", idx: "02", title: "Acoustic", sub: "Positional sound", text: "Each voice comes from where that person stands and fades with distance, so a crowd breaks into small conversations." },
  { mode: "embodied", idx: "03", title: "Embodied", sub: "Living faces", text: "Avatars breathe and change expression the way people do." },
  { mode: "metric", idx: "04", title: "Metric", sub: "Cloth physics", text: "Fabric is simulated on your measurements, not a mannequin's." },
  { mode: "secure", idx: "05", title: "Private", sub: "Zero-knowledge", text: "Keys are made and kept on your phone. Our servers pass calls along but can't read them." },
];

export function SpatialCore() {
  const [mode, setMode] = useState<CoreMode>("spatial");
  const current = dimensions.find((d) => d.mode === mode)!;

  return (
    <div className="core">
      <div className="core__stage" data-reveal>
        <div className="core__hud">
          <span>DFORR engine</span>
          <span>Drag to look around</span>
        </div>
        <CoreScene mode={mode} />
        <div className="core__caption" aria-live="polite">
          <b>{current.title}</b>
          <p>{current.text}</p>
        </div>
      </div>
      <div className="dims" role="group" aria-label="Choose a system">
        {dimensions.map((d) => (
          <button key={d.mode} className={`dim-card ${mode === d.mode ? "is-on" : ""}`} aria-pressed={mode === d.mode} onClick={() => setMode(d.mode)}>
            <span className="idx">{d.idx}</span>
            <span>
              <b>{d.title}</b>
              <small>{d.sub}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
