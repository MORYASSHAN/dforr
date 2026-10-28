"use client";

/*
 * Site-wide motion: Lenis smooth scrolling plus the shared scroll animations.
 * Mark up elements with data attributes and they animate automatically:
 *   data-split          heading reveals line by line
 *   data-reveal         fades and rises in
 *   data-scrub          words light up as you scroll past
 *   data-count="1000"   number counts up
 *   data-parallax="0.2" drifts at a different speed while scrolling
 *   .chapter            slides up over the previous chapter, straightening as it lands
 */
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, whenLoaded } from "./gsap";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

export function MotionRoot() {
  const pathname = usePathname();

  // Smooth scrolling, once per page load.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.09, anchors: { offset: 0 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Scroll animations, rebuilt on every page.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    whenLoaded().then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        // Headings: lines rise out of a mask.
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line-inner",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.15,
                ease: "expo.out",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(el.dataset.reveal) || 0,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // Paragraphs whose words light up as you scroll.
        gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) => {
          const split = SplitText.create(el, { type: "words", wordsClass: "w" });
          gsap.to(split.words, {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals || 0);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 2.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = obj.v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax) || 0.2;
          gsap.to(el, {
            yPercent: -100 * speed,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        // Chapters land like cards being placed on a table. Chapters that hold a
        // pinned section opt out with data-static, since a transform breaks pinning.
        gsap.utils.toArray<HTMLElement>(".chapter:not([data-static])").forEach((el, i) => {
          gsap.from(el, {
            rotate: i % 2 ? -2.2 : 2.2,
            yPercent: 6,
            scale: 0.96,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.6 },
          });
        });
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
