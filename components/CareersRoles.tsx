"use client";

/*
 * Open roles: domain filters, expandable role cards, deep links
 * (/careers#role-id) and the apply dialog, which opens a pre-filled email.
 */
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { jobs as allJobs, type Job } from "@/content/jobs";
import { mailto, site } from "@/content/site";
import { Tile, type TileName } from "./art/Tiles";
import { gsap } from "./motion/gsap";
import { Arrow } from "./ui";

const jobs = allJobs.filter((j) => j.open !== false);

// One illustration per domain, so the list doesn't look like a spreadsheet.
const domainTiles: Record<string, TileName> = {
  "Mobile Systems": "Kites",
  "Graphics & Compute": "Mosaic",
  "Computer Vision & AR": "Peacock",
  "Distributed Systems & Audio": "Sound",
  "AI & Cognition": "Lotus",
  "Product & Virtual Fashion": "Atelier",
  "Backend & Core Systems": "Jali",
  "Security & Cryptography": "Shield",
  "3D Art & Spatial Environments": "Arches",
  "Cloud Infrastructure & SRE": "Leheriya",
  "Performance & Testing": "Sun",
  "Creator Economy & Payments": "Coins",
};

function RoleCard({ job, open, onToggle, onApply }: { job: Job; open: boolean; onToggle: () => void; onApply: () => void }) {
  return (
    <article className={`role ${open ? "is-open" : ""}`} id={job.id}>
      <button className="role__head" aria-expanded={open} aria-controls={`${job.id}-body`} onClick={onToggle}>
        <span className="role__tile" aria-hidden="true"><Tile name={domainTiles[job.domain] ?? "Jali"} /></span>
        <div>
          <div className="role__meta">
            <span className="tag">{job.domain}</span>
            <span>{job.location}</span>
          </div>
          <h3 className="role__title">{job.title}</h3>
        </div>
        <span className="role__toggle" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      <div className="role__body" id={`${job.id}-body`}>
        <div className="role__inner">
          <div className="role__content">
            <p className="about">{job.about}</p>
            <div><h4>What you&apos;ll do</h4><ul>{job.responsibilities.map((t) => <li key={t}>{t}</li>)}</ul></div>
            <div><h4>You should have</h4><ul>{job.minimum.map((t) => <li key={t}>{t}</li>)}</ul></div>
            <div><h4>Nice to have</h4><ul>{job.preferred.map((t) => <li key={t}>{t}</li>)}</ul></div>
            <div>
              <h4>Stack</h4>
              <div className="role__stack">{job.stack.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
            <div className="role__foot">
              <small>{job.reward}</small>
              <button className="btn btn--rose" onClick={onApply}>Apply for this role <Arrow /></button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ApplyDialog({ job, onClose }: { job: Job | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (job && !d.open) d.showModal();
    if (!job && d.open) d.close();
  }, [job]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job) return;
    const f = new FormData(e.currentTarget);
    const body = [
      `Role: ${job.title} (${job.domain})`,
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Work: ${f.get("portfolio")}`,
      "",
      "A hard problem I solved:",
      String(f.get("agency") || "—"),
    ].join("\n");
    window.location.href = mailto(`Application — ${job.title}`, site.company.careersEmail, body);
    e.currentTarget.reset();
    onClose();
  };

  return (
    <dialog ref={ref} className="dialog" aria-labelledby="apply-title" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <div className="dialog__box">
        <span className="dialog__kicker">Apply</span>
        <h3 id="apply-title">{job?.title}</h3>
        <p className="sub">{job && `${job.domain} · ${job.location}`}</p>
        <form className="form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="f-name">Name or handle *</label>
            <input id="f-name" name="name" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="f-email">Email *</label>
            <input id="f-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="f-url">Link to your work (GitHub, ShaderToy, paper, codebase) *</label>
            <input id="f-url" name="portfolio" type="url" required placeholder="https://" />
          </div>
          <div className="field">
            <label htmlFor="f-agency">Tell us about one problem that seemed impossible to solve and how you solved it.</label>
            <textarea id="f-agency" name="agency" />
          </div>
          <p className="form__note">Sending opens your email app with this filled in.</p>
          <div className="form__actions">
            <button type="button" className="btn btn--line" onClick={onClose}><span>Cancel</span></button>
            <button type="submit" className="btn btn--ink">Send application</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export function CareersRoles() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [applying, setApplying] = useState<Job | null>(null);
  const list = useRef<HTMLDivElement>(null);

  const domains = useMemo(() => ["All", ...new Set(jobs.map((j) => j.domain))], []);
  const shown = filter === "All" ? jobs : jobs.filter((j) => j.domain === filter);

  const toggle = (id: string, force?: boolean) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (force ?? !next.has(id)) next.add(id);
      else next.delete(id);
      return next;
    });

  // Cards shuffle in when the filter changes (not on first render).
  const firstFilter = useRef(filter);
  useEffect(() => {
    if (!list.current || filter === firstFilter.current) return;
    firstFilter.current = "";
    const t = gsap.fromTo(list.current.children, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out", stagger: 0.04 });
    return () => {
      t.progress(1).kill();
    };
  }, [filter]);

  // /careers#role-id opens and scrolls to that role.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!jobs.some((j) => j.id === id)) return;
      setFilter("All");
      toggle(id, true);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 300);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <>
      <div className="roles__head">
        <h2 className="h2" data-split>Open roles</h2>
        <p className="roles__count" aria-live="polite">{shown.length} open {shown.length === 1 ? "role" : "roles"}</p>
      </div>
      <div className="filters" role="group" aria-label="Filter by area">
        {domains.map((d) => (
          <button key={d} className={`chip ${filter === d ? "is-on" : ""}`} aria-pressed={filter === d} onClick={() => setFilter(d)}>
            {d}
          </button>
        ))}
      </div>
      <div className="roles" ref={list}>
        {shown.map((job) => (
          <RoleCard key={job.id} job={job} open={open.has(job.id)} onToggle={() => toggle(job.id)} onApply={() => setApplying(job)} />
        ))}
      </div>
      <ApplyDialog job={applying} onClose={() => setApplying(null)} />
    </>
  );
}
