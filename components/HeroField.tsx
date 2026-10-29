"use client";

/*
 * Hero: a 3D field of Maya "moment" cards and folk tiles.
 * - floats in from the dark when the page opens
 * - tilts toward the pointer
 * - as you scroll, the field rushes past the camera and the headline lifts away
 */
import { useEffect, useRef, type ReactNode } from "react";
import { Tile, type TileName } from "./art/Tiles";
import { gsap, prefersReducedMotion, whenLoaded } from "./motion/gsap";

export type Moment = {
  icon: TileName;
  space: string;
  title: string;
  text: string;
  people?: string[];
  more?: string;
  foot: string;
};

// Slots: x/y as a fraction of the viewport from centre, z in px, small rotation.
const CARD_SLOTS = [
  { x: 0, y: 0.13, z: 120, r: 0 },
  { x: -0.27, y: 0.2, z: 20, r: -4 },
  { x: 0.29, y: 0.1, z: -40, r: 5 },
  { x: 0.2, y: 0.42, z: -520, r: 3 },
];
const TILE_SLOTS = [
  { x: -0.4, y: -0.22, z: -260, r: -8 },
  { x: -0.15, y: -0.24, z: -520, r: 6 },
  { x: 0.15, y: -0.27, z: -440, r: -5 },
  { x: 0.42, y: -0.18, z: -200, r: 9 },
  { x: -0.44, y: 0.3, z: -120, r: 7 },
  { x: -0.13, y: 0.4, z: -60, r: -3 },
  { x: 0.13, y: 0.34, z: -300, r: 4 },
  { x: 0.45, y: 0.36, z: -80, r: -10 },
  { x: -0.33, y: -0.02, z: -640, r: 2 },
  { x: 0.36, y: 0.2, z: -560, r: -4 },
];

function MomentCard({ m }: { m: Moment }) {
  const colours = ["#c4462c", "#2a3f9d", "#0e7a72", "#5a2347"];
  return (
    <article className="moment">
      <div className="moment__icon"><Tile name={m.icon} /></div>
      <p className="moment__space">{m.space}</p>
      <h3 className="moment__title">{m.title}</h3>
      <p className="moment__text">{m.text}</p>
      {m.people && (
        <div className="moment__people">
          {m.people.map((p, i) => <span key={p} style={{ background: colours[i % colours.length] }}>{p}</span>)}
          {m.more && <em>{m.more}</em>}
        </div>
      )}
      <p className="moment__foot">{m.foot}</p>
    </article>
  );
}

export function HeroField({ cards, tiles, children }: { cards: Moment[]; tiles: TileName[]; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = root.current;
    if (!hero) return;
    const field = hero.querySelector<HTMLElement>(".field")!;
    const items = gsap.utils.toArray<HTMLElement>(".field__item", hero);
    const title = hero.querySelectorAll(".hero__title, .hero__lede");
    const top = hero.querySelector(".hero__top");
    // Resting depth of each item, so every tween uses absolute values.
    const baseZ = new Map<HTMLElement, number>();
    const place = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const narrow = w < 760;
      items.forEach((el) => {
        const { x, y, z, r } = JSON.parse(el.dataset.slot!);
        baseZ.set(el, narrow ? z - 120 : z);
        gsap.set(el, { x: x * w * (narrow ? 1.25 : 1), y: y * h, rotationZ: r });
      });
    };
    place();
    window.addEventListener("resize", place);
    if (prefersReducedMotion()) {
      items.forEach((el) => gsap.set(el, { z: baseZ.get(el) }));
      return () => window.removeEventListener("resize", place);
    }

    let alive = true;
    const ctx = gsap.context(() => {
      items.forEach((el) => gsap.set(el, { autoAlpha: 0, z: baseZ.get(el)! - 900 }));
      gsap.set(title, { autoAlpha: 0, y: 30 });
      // Idle drift so the field never looks frozen.
      items.forEach((el, i) => {
        gsap.to(el.firstElementChild, {
          y: i % 2 ? 10 : -10,
          rotation: i % 2 ? 1.5 : -1.5,
          duration: 3 + (i % 4) * 0.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, hero);

    // Pointer tilt.
    const rx = gsap.quickTo(field, "rotationX", { duration: 1.2, ease: "power3" });
    const ry = gsap.quickTo(field, "rotationY", { duration: 1.2, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      ry((e.clientX / window.innerWidth - 0.5) * 10);
      rx((e.clientY / window.innerHeight - 0.5) * -8);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Scroll-out is built after the entrance lands, so it starts from the resting state.
    const scrollOut = () => {
      if (!alive) return;
      ctx.add(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 } });
        items.forEach((el, i) => {
          if (i === 0) tl.to(el, { z: baseZ.get(el)! + 260, y: "-=40", ease: "none" }, 0);
          else tl.to(el, { z: baseZ.get(el)! + 900, autoAlpha: 0, ease: "power1.in" }, i * 0.01);
        });
        tl.to(title, { yPercent: -60, autoAlpha: 0, ease: "none" }, 0);
        if (top) tl.to(top, { yPercent: -80, autoAlpha: 0, ease: "none" }, 0);
      });
    };

    whenLoaded().then(() => {
      if (!alive) return;
      ctx.add(() => {
        items.forEach((el, i) => {
          gsap.to(el, {
            autoAlpha: 1,
            z: baseZ.get(el),
            duration: 2.2,
            ease: "expo.out",
            delay: Math.abs(i - 1.5) * 0.05,
            onComplete: i === items.length - 1 ? scrollOut : undefined,
          });
        });
        gsap.to(title, { autoAlpha: 1, y: 0, duration: 1.3, ease: "expo.out", delay: 0.1 });
      });
    });

    return () => {
      alive = false;
      window.removeEventListener("resize", place);
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="hero">
      {children}
      <div className="field-wrap" aria-hidden="true">
      <div className="field">
        {cards.slice(0, CARD_SLOTS.length).map((m, i) => (
          <div key={m.title} className="field__item" data-slot={JSON.stringify(CARD_SLOTS[i])} style={{ zIndex: 10 - i }}>
            <MomentCard m={m} />
          </div>
        ))}
        {tiles.slice(0, TILE_SLOTS.length).map((t, i) => (
          <div key={`${t}-${i}`} className="field__item" data-slot={JSON.stringify(TILE_SLOTS[i])}>
            <div className="field__tile"><Tile name={t} /></div>
          </div>
        ))}
      </div>
      </div>
      <div className="hero__fade" />
    </section>
  );
}
