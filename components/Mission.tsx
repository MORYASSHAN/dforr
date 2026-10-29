"use client";

// Mission chapter: three principles, each with a small live demo.
import { useEffect, useRef, useState, type ReactElement } from "react";
import { Tile, type TileName } from "./art/Tiles";
import { gsap } from "./motion/gsap";
import { Phone } from "./phone/Phone";

const principles = [
  {
    id: "phone",
    tab: "No headset",
    title: "No headset required",
    intro: "A headset costs more than most phones and shuts out the room you're in. Being together shouldn't need either.",
    pillars: [
      ["Your phone is enough", "No headset, controller or extra camera to buy."],
      ["Eyes up", "You can still see the people sitting next to you."],
      ["iPhone and Android", "The same app and the same places on both."],
    ],
  },
  {
    id: "privacy",
    tab: "Private by design",
    title: "Private by design",
    intro: "No one acts naturally when they might be recorded, tracked or profiled. So Maya does none of it.",
    pillars: [
      ["Recording blocked", "Screen recorders get a black screen."],
      ["No profiles", "No data brokers, no behaviour profiling, no tracking pixels."],
      ["No ads", "Nobody pays to get your attention."],
    ],
  },
  {
    id: "speed",
    tab: "Any phone",
    title: "Runs on any phone",
    intro: "Not just the newest flagship. Maya is tuned to stay smooth, cool and easy on the battery.",
    pillars: [
      ["Metal and Vulkan", "Shaders written for each phone's own graphics system."],
      ["64 MB memory limit", "Four levels of detail make sure your phone doesn't overheat."],
      ["Billions of phones", "Everyone should be able to come, not only people with a new phone."],
    ],
  },
] as const;

type Id = (typeof principles)[number]["id"];

const pillarTiles: Record<Id, [TileName, TileName, TileName]> = {
  phone: ["Kites", "Sound", "Arches"],
  privacy: ["Shield", "Jali", "Lotus"],
  speed: ["Mosaic", "Leheriya", "Sun"],
};

function TiltDemo() {
  const [tilt, setTilt] = useState(8);
  return (
    <div className="demo">
      <p className="demo__label">Device tilt <b>{tilt > 0 ? "+" : ""}{tilt}°</b></p>
      <div className="parallax" aria-hidden="true">
        <div className="p1" style={{ transform: `translateX(${tilt * 1.2}px)` }}><Tile name="Arches" /></div>
        <div className="p2" style={{ transform: `translateX(${tilt * 3}px) rotate(${-tilt / 4}deg)` }}><Tile name="Jali" /></div>
        <div className="p3" style={{ transform: `translateX(${tilt * 5}px) rotate(${tilt / 3}deg)` }}><Tile name="Kites" /></div>
      </div>
      <label className="sr-only" htmlFor="tilt">Tilt the phone</label>
      <input className="range" id="tilt" type="range" min={-20} max={20} value={tilt} onChange={(e) => setTilt(Number(e.target.value))} />
      <p className="demo__label">Drag to tilt</p>
    </div>
  );
}

function CaptureDemo() {
  const [blocked, setBlocked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="demo">
      <p className="demo__label">Screen guard <b>{blocked ? "Recording blocked" : "Watching"}</b></p>
      <Phone screens={["rooms"]} shielded={blocked} />
      <button
        className="btn btn--rose"
        disabled={blocked}
        onClick={() => {
          setBlocked(true);
          timer.current = setTimeout(() => setBlocked(false), 2600);
        }}
      >
        Try to screen-record
      </button>
    </div>
  );
}

function FpsDemo() {
  const [fps, setFps] = useState<60 | 120>(60);
  return (
    <div className="demo">
      <p className="demo__label">Frame budget</p>
      <p className="fps-readout">{fps} FPS<small>{fps === 120 ? "8.3" : "16.6"} ms a frame</small></p>
      <div className="fps-bars" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} style={{ animationDuration: `${(fps === 120 ? 0.3 : 0.6) + ((i * 7) % 10) / 14}s` }} />
        ))}
      </div>
      <div className="seg" role="group" aria-label="Display">
        <button aria-pressed={fps === 60} onClick={() => setFps(60)}>60 FPS · most phones</button>
        <button aria-pressed={fps === 120} onClick={() => setFps(120)}>120 FPS · ProMotion</button>
      </div>
    </div>
  );
}

const demos: Record<Id, () => ReactElement> = { phone: TiltDemo, privacy: CaptureDemo, speed: FpsDemo };

export function Mission() {
  const [active, setActive] = useState<Id>("phone");
  const panel = useRef<HTMLDivElement>(null);
  const p = principles.find((x) => x.id === active)!;
  const Demo = demos[active];

  // Fade the new panel in whenever the tab changes (not on first render).
  const firstTab = useRef<Id | "">(active);
  useEffect(() => {
    if (!panel.current || active === firstTab.current) return;
    firstTab.current = "";
    const tween = gsap.fromTo(panel.current.children, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.08 });
    return () => {
      tween.progress(1).kill();
    };
  }, [active]);

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Principles">
        {principles.map((x) => (
          <button key={x.id} className="tab" role="tab" aria-selected={x.id === active} aria-controls="principle" onClick={() => setActive(x.id)}>
            {x.tab}
          </button>
        ))}
      </div>
      <div ref={panel} className="principle" id="principle" role="tabpanel">
        <div className="foundation">
          <div className="foundation__copy">
            <h3>{p.title}</h3>
            <p className="lead">{p.intro}</p>
          </div>
          <Demo />
        </div>
        <div className="pillars">
          {p.pillars.map(([t, d], i) => (
            <div className="pillar" key={t}>
              <span className="pillar__tile" aria-hidden="true"><Tile name={pillarTiles[p.id][i]} /></span>
              <b>{t}</b>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
