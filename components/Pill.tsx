"use client";

// Sticky bottom pill: emblem opens the menu, button jumps to early access.
// The pill is slightly magnetic: it leans toward the pointer when you're close.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { LogoMark } from "./Logo";
import { gsap, prefersReducedMotion } from "./motion/gsap";

export function Pill() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onDoc = (e: MouseEvent) => !el.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);

    let onMove: ((e: PointerEvent) => void) | undefined;
    if (!prefersReducedMotion() && matchMedia("(pointer: fine)").matches) {
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const near = Math.hypot(dx, dy) < 160;
        x(near ? dx * 0.12 : 0);
        y(near ? dy * 0.2 : 0);
      };
      window.addEventListener("pointermove", onMove);
    }
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
      if (onMove) window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={`pill ${open ? "is-open" : ""}`}>
        <nav className="pill__menu" id="pill-menu" aria-label="Main">
          {site.nav.map((n, i) => (
            <Link key={n.href} href={n.href} aria-current={n.href === pathname ? "page" : undefined} onClick={() => setOpen(false)}>
              {n.label}
              <small>0{i + 1}</small>
            </Link>
          ))}
        </nav>
        <button className="pill__emblem" aria-expanded={open} aria-controls="pill-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <LogoMark size={30} />
        </button>
        <Link className="btn btn--rose" href="/#early">Get early access</Link>
    </div>
  );
}
