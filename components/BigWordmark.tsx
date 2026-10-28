"use client";

/*
 * Giant DFORR at the very end of the page.
 * - letters rise out of a mask when they scroll into view
 * - letters near the cursor lift, stretch, lean and glow rose (driven by a --h variable)
 * - a soft light follows the cursor behind the letters
 * - on touch screens a slow wave runs through the letters instead
 */
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./motion/gsap";

export function BigWordmark({ text = "DFORR" }: { text?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const letters = gsap.utils.toArray<HTMLElement>(".bigword__letter", el);
    const spot = el.querySelector<HTMLElement>(".bigword__spot")!;

    const ctx = gsap.context(() => {
      gsap.from(letters, {
        yPercent: 105,
        rotate: 6,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        // Drop the mask once the letters are up, so their glow isn't clipped.
        onComplete: () => el.classList.add("is-in"),
      });
    }, el);

    const heat = letters.map((l) => gsap.quickTo(l, "--h", { duration: 0.7, ease: "power3" }));
    const sx = gsap.quickTo(spot, "x", { duration: 0.9, ease: "power3" });
    const sy = gsap.quickTo(spot, "y", { duration: 0.9, ease: "power3" });

    const fine = matchMedia("(pointer: fine)").matches;
    let wave: gsap.core.Timeline | undefined;

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const radius = box.width * 0.22;
      sx(e.clientX - box.left);
      sy(e.clientY - box.top);
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), (e.clientY - (r.top + r.height / 2)) * 0.6);
        heat[i](Math.max(0, 1 - d / radius));
      });
    };
    const onLeave = () => heat.forEach((h) => h(0));

    if (fine) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    } else {
      wave = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      letters.forEach((l, i) => {
        wave!.to(l, { "--h": 1, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, i * 0.18);
      });
    }

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      wave?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="bigword" aria-label={text} role="img">
      <span className="bigword__spot" aria-hidden="true" />
      <div className="bigword__row" aria-hidden="true">
        {[...text].map((ch, i) => (
          <span key={i} className="bigword__mask">
            <span className="bigword__letter">{ch}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
