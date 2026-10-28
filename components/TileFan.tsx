"use client";

/*
 * A stack of illustration tiles that fans out like a hand of cards as it
 * scrolls into the middle of the screen. Each tile also lifts on hover.
 */
import { useEffect, useRef } from "react";
import { Tile, type TileName } from "./art/Tiles";
import { gsap, prefersReducedMotion } from "./motion/gsap";

export function TileFan({ tiles, size = "md" }: { tiles: TileName[]; size?: "md" | "lg" }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cards = gsap.utils.toArray<HTMLElement>(".fan__card", el);
    const mid = (cards.length - 1) / 2;
    const spread = () => {
      const w = el.clientWidth;
      const step = Math.min(w / (cards.length + 0.6), size === "lg" ? 190 : 150);
      return cards.map((_, i) => ({
        x: (i - mid) * step,
        y: Math.abs(i - mid) ** 1.6 * 10,
        rotation: (i - mid) * 7,
      }));
    };
    if (prefersReducedMotion()) {
      spread().forEach((p, i) => gsap.set(cards[i], p));
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 90%", end: "center 55%", scrub: 0.8, invalidateOnRefresh: true },
      });
      cards.forEach((c, i) => {
        tl.fromTo(
          c,
          { x: 0, y: 40, rotation: (i - mid) * 1.5, scale: 0.86 },
          { x: () => spread()[i].x, y: () => spread()[i].y, rotation: () => spread()[i].rotation, scale: 1, ease: "power2.out" },
          0
        );
      });
    }, el);
    return () => ctx.revert();
  }, [size]);

  return (
    <div ref={root} className={`fan fan--${size}`} aria-hidden="true">
      {tiles.map((t, i) => (
        <div key={`${t}-${i}`} className="fan__card" style={{ zIndex: 100 - Math.abs(i - (tiles.length - 1) / 2) * 10 }}>
          <div className="fan__face"><Tile name={t} /></div>
        </div>
      ))}
    </div>
  );
}

/** An endless, slowly moving ribbon of tiles. */
export function TileRibbon({ tiles, reverse = false }: { tiles: TileName[]; reverse?: boolean }) {
  const row = [...tiles, ...tiles];
  return (
    <div className={`ribbon ${reverse ? "ribbon--reverse" : ""}`} aria-hidden="true">
      <div className="ribbon__track">
        {row.map((t, i) => (
          <div key={i} className="ribbon__tile" style={{ rotate: `${(i % 3) * 3 - 3}deg` }}><Tile name={t} /></div>
        ))}
      </div>
    </div>
  );
}
