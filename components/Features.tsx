"use client";

/*
 * Maya's places, one big card each. Cards stick to the top of the screen and
 * stack as you scroll; the one underneath shrinks back and dims. Inside each
 * card three illustrations drift at different speeds, and lean toward the cursor.
 */
import { useEffect, useRef } from "react";
import { Tile, type TileName } from "./art/Tiles";
import { gsap, prefersReducedMotion } from "./motion/gsap";

export type Feature = {
  title: string;
  text: string;
  facts: string[];
  tiles: [TileName, TileName, TileName];
  bg: string;
  fg: string;
};

export function Features({ items }: { items: Feature[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const cards = gsap.utils.toArray<HTMLElement>(".feature", el);
    // Cards only stick and stack on wider screens (see globals.css).
    const stacked = matchMedia("(min-width: 861px)").matches;
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // Shrink and dim each card as the next one slides over it.
        const next = cards[i + 1];
        if (next && stacked) {
          gsap.to(card.querySelector(".feature__inner"), {
            scale: 0.92,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 12%", scrub: true },
          });
        }
        // Illustrations drift at different speeds while the card is on screen.
        card.querySelectorAll<HTMLElement>("[data-depth]").forEach((art) => {
          const d = Number(art.dataset.depth);
          gsap.fromTo(art, { yPercent: 18 * d }, { yPercent: -18 * d, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
        });
        // Text rises in as the card arrives.
        gsap.from(card.querySelectorAll(".feature__copy > *"), {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: "top 70%", once: true },
        });
      });
    }, el);

    // Cursor tilt on the illustration stack.
    const handlers: [HTMLElement, (e: PointerEvent) => void, () => void][] = [];
    if (matchMedia("(pointer: fine)").matches) {
      el.querySelectorAll<HTMLElement>(".feature__art").forEach((art) => {
        const rx = gsap.quickTo(art, "rotationX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(art, "rotationY", { duration: 0.8, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = art.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 16);
          rx(((e.clientY - r.top) / r.height - 0.5) * -12);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        art.addEventListener("pointermove", move);
        art.addEventListener("pointerleave", leave);
        handlers.push([art, move, leave]);
      });
    }

    return () => {
      handlers.forEach(([a, m, l]) => {
        a.removeEventListener("pointermove", m);
        a.removeEventListener("pointerleave", l);
      });
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="features">
      {items.map((f, i) => (
        <article key={f.title} className="feature" style={{ top: `calc(9vh + ${i * 14}px)` }}>
          <div className="feature__inner" style={{ background: f.bg, color: f.fg }}>
            <div className="feature__copy">
              <span className="feature__num">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__text">{f.text}</p>
              <ul className="feature__facts">
                {f.facts.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>
            </div>
            <div className="feature__art" aria-hidden="true">
              <div className="feature__tile feature__tile--main" data-depth="0.4"><Tile name={f.tiles[0]} /></div>
              <div className="feature__tile feature__tile--a" data-depth="1.2"><Tile name={f.tiles[1]} /></div>
              <div className="feature__tile feature__tile--b" data-depth="0.8"><Tile name={f.tiles[2]} /></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
