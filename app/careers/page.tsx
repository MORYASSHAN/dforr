import type { Metadata } from "next";
import { Tile, type TileName } from "@/components/art/Tiles";
import { CareersRoles } from "@/components/CareersRoles";
import { Brand } from "@/components/Logo";
import { TileFan } from "@/components/TileFan";
import { HeroField, type Moment } from "@/components/HeroField";
import { Arrow, Chapter, Marquee } from "@/components/ui";
import { jobs } from "@/content/jobs";
import { mailto, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "We're building our first engineering team for Maya. 12 roles. Can work from Jaipur or remotely.",
};

const roleCards: Moment[] = [
  { icon: "Mosaic", space: "Graphics & Compute", title: "Lead Mobile 3D Graphics & Shader Engineer", text: "Metal and Vulkan shaders for 1,000+ avatars on a phone.", foot: "Jaipur or remote" },
  { icon: "Lotus", space: "AI & Cognition", title: "AI Companion Systems Architect", text: "Memory, streaming voice and a face that reacts.", foot: "Jaipur or remote" },
  { icon: "Sound", space: "Audio", title: "Spatial Audio Engineer", text: "Sound that fades at 15 metres, for a million people.", foot: "Jaipur or remote" },
  { icon: "Shield", space: "Security", title: "Applied Cryptographer", text: "Keys that never leave the phone.", foot: "Jaipur or remote" },
];

const heroTiles: TileName[] = ["Arches", "Peacock", "Leheriya", "Kites", "Jali", "Sun", "Coins", "Atelier", "Mosaic", "Lotus"];

const process: { title: string; text: string; tile: TileName }[] = [
  { title: "Send your work", text: "GitHub repo, ShaderToy, paper, codebase. We learn more from real work than a CV.", tile: "Kites" },
  { title: "One hard problem", text: "Tell us about one problem that seemed impossible to solve and how you solved it.", tile: "Mosaic" },
  { title: "The founders read it", text: "No recruiters. All applications are read by the founding team.", tile: "Sun" },
];

export default function Careers() {
  const count = jobs.filter((j) => j.open !== false).length;

  return (
    <main>
      <HeroField cards={roleCards} tiles={heroTiles}>
        <div className="hero__top"><Brand /></div>
        <h1 className="display hero__title">Build beyond feeds</h1>
      </HeroField>

      <Chapter about="Team" number={1} theme="rose">
        <div className="c-intro center stack-lg">
          <h2 className="h2" data-split>Build the future beyond feeds.</h2>
          <p className="lead" data-reveal>{count} roles. Can work from Jaipur or remotely. Paid on performance and milestones.</p>
        </div>
        <TileFan tiles={["Kites", "Mosaic", "Sound", "Lotus", "Shield", "Coins", "Arches"]} size="lg" />
      </Chapter>

      <Chapter about="Process" number={2} theme="paper">
        <div className="center">
          <h2 className="h2" data-split>Show us what you can build.</h2>
        </div>
        <div className="process">
          {process.map((p, i) => (
            <div key={p.title} data-reveal={i * 0.08}>
              <div className="process__tile"><Tile name={p.tile} /></div>
              <div>
                <h3>{String(i + 1).padStart(2, "0")} · {p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter id="roles" about="Roles" number={3} theme="ink">
        <CareersRoles />
      </Chapter>

      <Chapter about="Anything else" number={4} theme="ink2">
        <div className="hire">
          <h2 className="h2" data-split>Don&apos;t see your role? Get in touch anyway.</h2>
          <p className="lead muted" data-reveal>If you build things that make people feel present, email us. Show us your work and what you&apos;d want to own.</p>
          <a className="btn btn--rose" href={mailto("Open application", site.company.careersEmail)} data-reveal>Email the founders <Arrow /></a>
        </div>
      </Chapter>

      <Marquee items={site.marquee} />
    </main>
  );
}
