// Single place where GSAP plugins are registered (client only).
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Resolves once the web fonts are ready, so text animations measure the final layout. */
export const whenLoaded = () =>
  typeof document === "undefined" ? Promise.resolve() : document.fonts.ready.then(() => undefined);

export { gsap, ScrollTrigger, SplitText };
