"use client";

/*
 * "Meet Maya": the phone is pinned in the middle of the screen. Scrolling steps
 * through the app — big serif words swap on either side, the caption changes,
 * and the screen inside the phone switches.
 */
import { useEffect, useRef, useState } from "react";
import type { ScreenName } from "@/content/site";
import { gsap, prefersReducedMotion } from "./motion/gsap";
import { Phone } from "./phone/Phone";

export type MayaStep = { screen: ScreenName; left: string; right: string; text: string };

export function MayaPinned({ steps }: { steps: MayaStep[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = stage.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const lefts = gsap.utils.toArray<HTMLElement>(".maya__word--left span", el);
      const rights = gsap.utils.toArray<HTMLElement>(".maya__word--right span", el);
      const caps = gsap.utils.toArray<HTMLElement>(".maya__caption p", el);
      const phone = el.querySelector(".maya__phone");
      gsap.set([...lefts.slice(1), ...rights.slice(1), ...caps.slice(1)], { yPercent: 100, autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${steps.length * 70}%`,
          pin: true,
          scrub: 0.7,
          onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999))),
        },
      });
      tl.fromTo(phone, { rotate: -6, y: 60 }, { rotate: 0, y: 0, duration: 0.6 }, 0);
      for (let i = 1; i < steps.length; i++) {
        const at = i;
        tl.to([lefts[i - 1], rights[i - 1], caps[i - 1]], { yPercent: -100, autoAlpha: 0 }, at - 0.5)
          .to([lefts[i], rights[i], caps[i]], { yPercent: 0, autoAlpha: 1 }, at - 0.5)
          .to(phone, { rotate: i % 2 ? 4 : -4, duration: 0.5, yoyo: true, repeat: 1 }, at - 0.5);
      }
      tl.to({}, { duration: 0.5 });
    }, el);
    return () => ctx.revert();
  }, [steps.length]);

  return (
    <div ref={stage} className="maya__stage">
      <div className="maya__words" aria-hidden="true">
        <div className="maya__word maya__word--left">
          {steps.map((s) => <span key={s.left}>{s.left}</span>)}
        </div>
        <div className="maya__word maya__word--right">
          {steps.map((s) => <span key={s.right}>{s.right}</span>)}
        </div>
      </div>
      <div className="maya__phone">
        <Phone screens={steps.map((s) => s.screen)} active={steps[active].screen} />
      </div>
      <div className="maya__caption">
        {steps.map((s, i) => <p key={s.screen} aria-hidden={i !== active}>{s.text}</p>)}
      </div>
      <div className="maya__dots" aria-hidden="true">
        {steps.map((s, i) => <i key={s.screen} className={i === active ? "is-on" : undefined} />)}
      </div>
    </div>
  );
}
