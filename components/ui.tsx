// Small shared pieces used across pages.
import type { ReactNode } from "react";

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** A full-width chapter card with the "About X / Chapter 0N" labels. */
export function Chapter({
  id,
  about,
  number,
  theme,
  pinned = false,
  className = "",
  children,
}: {
  id?: string;
  about: string;
  number: number;
  theme: "ink" | "ink2" | "rose" | "paper";
  pinned?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`chapter ${className}`} data-theme={theme} data-static={pinned ? "" : undefined}>
      <div className="chapter__meta">
        <span>About {about}</span>
        <span>Chapter {String(number).padStart(2, "0")}</span>
      </div>
      {children}
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((t, i) => <span key={`a${i}`}>{t}</span>)}
        {items.map((t, i) => <span key={`b${i}`}>{t}</span>)}
      </div>
    </div>
  );
}
