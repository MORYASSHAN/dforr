import Link from "next/link";
import { Tile, type TileName } from "@/components/art/Tiles";
import { EarlyAccess } from "@/components/EarlyAccess";
import { Features, type Feature } from "@/components/Features";
import { HeroField, type Moment } from "@/components/HeroField";
import { MayaPinned, type MayaStep } from "@/components/MayaPinned";
import { Mission } from "@/components/Mission";
import { SpatialCore } from "@/components/SpatialCore";
import { TileFan, TileRibbon } from "@/components/TileFan";
import { Arrow, Chapter, Marquee } from "@/components/ui";
import { site } from "@/content/site";

const moments: Moment[] = [
  {
    icon: "Sound",
    space: "Live arena",
    title: "Royal Mehrangarh Philharmonic. Front podium, tonight.",
    text: "Your friends are three rows ahead. Follow their voices.",
    people: ["AK", "RS", "MJ"],
    more: "+12",
    foot: "Starts 9:00 pm",
  },
  {
    icon: "Shield",
    space: "Private room",
    title: "Rooftop with the usual six. Voice room is open.",
    text: "Head up after the show.",
    people: ["NP", "DV"],
    more: "+4",
    foot: "Only friends can enter",
  },
  {
    icon: "Atelier",
    space: "Bespoke atelier",
    title: "Try the indigo silk kurta on your own scan.",
    text: "Wear it to the concert tonight.",
    foot: "Fitted to your measurements",
  },
  {
    icon: "Lotus",
    space: "Your companion",
    title: "Run the second movement once more before bed?",
    text: "It remembers rehearsal ran late.",
    foot: "In your BedRoom",
  },
];

const heroTiles: TileName[] = ["Jali", "Kites", "Mosaic", "Arches", "Peacock", "Leheriya", "Sun", "Coins", "Lotus", "Sound"];

// One evening in Maya, in order. The hero cards above show the same evening.
const steps: MayaStep[] = [
  { screen: "atelier", left: "First,", right: "get dressed", text: "Try the indigo kurta on your own body scan. The silk falls the way it will when it arrives." },
  { screen: "arena", left: "A million", right: "in one room", text: "The concert starts at nine. The crowd is huge, but the friends beside you sound close and strangers fade away." },
  { screen: "rooms", left: "After,", right: "just your people", text: "The six of you head up to the rooftop. What's said there stays there." },
  { screen: "companion", left: "Someone", right: "who remembers", text: "Back in your BedRoom, your companion knows rehearsal ran late and asks how it went." },
];

const features: Feature[] = [
  {
    title: "Live Amphitheater",
    text: "Concerts you attend, not watch.",
    facts: ["Front podium to balcony", "7.1.4 surround sound", "Reactions in sync"],
    tiles: ["Sound", "Mosaic", "Sun"],
    bg: "#121012",
    fg: "#f4efe7",
  },
  {
    title: "Your companion",
    text: "An AI that knows you.",
    facts: ["Remembers your week", "Talks in real time", "40+ expressions"],
    tiles: ["Lotus", "Peacock", "Jali"],
    bg: "#0e7a72",
    fg: "#f4efe7",
  },
  {
    title: "Bespoke Atelier",
    text: "Couture cut to your measurements.",
    facts: ["Your own body scan", "Silk, velvet, zardozi", "Moves like real fabric"],
    tiles: ["Atelier", "Leheriya", "Arches"],
    bg: "#f3bfd6",
    fg: "#5a2347",
  },
  {
    title: "Spatial Lenses",
    text: "Lenses that follow your face. Rooms rebuilt in 3D.",
    facts: ["Face and body tracking", "LiDAR room scans", "3D Gaussian splatting"],
    tiles: ["Peacock", "Kites", "Jali"],
    bg: "#2a3f9d",
    fg: "#f4efe7",
  },
  {
    title: "Creator Economy",
    text: "Support the artists you came to see.",
    facts: ["100 coins = $1", "The rate never changes", "Paid straight to creators"],
    tiles: ["Coins", "Sun", "Mosaic"],
    bg: "#eaa21c",
    fg: "#121012",
  },
  {
    title: "Private Rooms",
    text: "A space that belongs to you and your friends.",
    facts: ["Invite only", "Voice rooms and chat", "Encrypted end to end"],
    tiles: ["Shield", "Lotus", "Arches"],
    bg: "#5a2347",
    fg: "#f3bfd6",
  },
];

const stats: { value: number; decimals?: number; prefix?: string; unit?: string; label: string; tile: TileName }[] = [
  { value: 15, unit: "m", label: "Distance before a voice fades", tile: "Sound" },
  { value: 1.4, decimals: 1, unit: "ms", label: "Audio latency", tile: "Kites" },
  { value: 99.8, decimals: 1, unit: "%", label: "Drape match on fabric", tile: "Atelier" },
  { value: 120, unit: "fps", label: "On a normal phone", tile: "Mosaic" },
];

const roles = [
  ["mobile-platform-architect", "Mobile & Flutter"],
  ["graphics-shader-engineer", "3D graphics & shaders"],
  ["computer-vision-ar", "Computer vision & AR"],
  ["spatial-audio-engineer", "Spatial audio"],
  ["ai-companion-architect", "AI companion"],
  ["cloth-physics-engineer", "Cloth physics"],
  ["backend-distributed-systems", "Backend"],
  ["security-cryptographer", "Security & cryptography"],
  ["technical-artist", "3D technical art"],
  ["cloud-sre", "Cloud & SRE"],
  ["mobile-performance-qa", "Performance & QA"],
  ["fintech-creator-economy", "Payments"],
];

export default function Home() {
  return (
    <main>
      <HeroField cards={moments} tiles={heroTiles}>
        <div className="hero__top"><span className="hero__name">DFORR</span></div>
        <h1 className="display hero__title hero__title--sub">Presence over feeds</h1>
      </HeroField>

      <Chapter about="Problem" number={1} theme="ink">
        <div className="center stack-lg">
          <h2 className="h2" data-split>You watch everyone&apos;s week. You&apos;re nowhere in it.</h2>
          <p className="scrub center-scrub" data-scrub>
            Feeds turned friends into an audience. You scroll past the concert, the dinner and the trip, then close the app feeling further away. A social app should put you in the room.
          </p>
        </div>
        <TileFan tiles={["Leheriya", "Jali", "Kites", "Sun", "Arches", "Peacock", "Mosaic"]} size="lg" />
      </Chapter>

      <Chapter id="maya" about="Maya" number={2} theme="rose" pinned className="maya">
        <div className="maya__intro">
          <span className="small">Our first app</span>
          <h2 className="h2" data-split>Meet Maya.</h2>
          <p className="lead" data-reveal>A social app made of places, not posts. Here&apos;s one evening in it.</p>
        </div>
        <MayaPinned steps={steps} />
      </Chapter>

      <Chapter id="places" about="Places" number={3} theme="paper">
        <div className="places__head center">
          <span className="small muted">That evening, and two places more</span>
          <h2 className="h2" data-split>Six places to be.</h2>
        </div>
        <Features items={features} />
      </Chapter>

      <Chapter about="Numbers" number={4} theme="ink">
        <div className="numbers">
          <div className="blob" aria-hidden="true" data-parallax="0.08" />
          <div className="numbers__inner">
            <span className="numbers__big" data-count="1000000">0</span>
            <span className="numbers__label">people in one live arena</span>
          </div>
        </div>
        <div className="stats">
          {stats.map((st, i) => (
            <div key={st.label} className="stat" data-reveal={i * 0.08}>
              <span className="stat__icon" aria-hidden="true"><Tile name={st.tile} /></span>
              <b className="stat__num">
                {st.prefix}
                <span data-count={st.value} data-decimals={st.decimals ?? 0}>0</span>
                {st.unit && <small>{st.unit}</small>}
              </b>
              <span className="stat__label">{st.label}</span>
            </div>
          ))}
        </div>
        <p className="lead muted numbers__note" data-reveal>Here&apos;s what makes those numbers possible.</p>
        <TileRibbon tiles={["Sound", "Kites", "Jali", "Coins", "Lotus", "Arches", "Peacock", "Sun", "Shield", "Leheriya", "Mosaic", "Atelier"]} />
      </Chapter>

      <Chapter id="engine" about="Engine" number={5} theme="ink2">
        <div className="center stack-lg">
          <h2 className="h2" data-split>The engine underneath.</h2>
          <p className="lead muted" data-reveal>Five systems we built ourselves. Pick one and drag to look around.</p>
        </div>
        <SpatialCore />
      </Chapter>

      <Chapter id="mission" about="Mission" number={6} theme="rose">
        <div className="center">
          <h2 className="h2 mission__title" data-split>Technology should bring people together, not lock them into feeds.</h2>
        </div>
        <Mission />
      </Chapter>

      <Chapter about="Careers" number={7} theme="paper">
        <div className="hire">
          <span className="small muted">Join the founding team</span>
          <h2 className="h2" data-split>Help us build it.</h2>
          <p className="lead muted" data-reveal>12 engineering roles across mobile, graphics, audio, AI and security. Based in Jaipur, open to remote.</p>
          <div className="hire__roles" data-reveal>
            {roles.map(([id, label]) => <Link key={id} href={`/careers#${id}`}>{label}</Link>)}
          </div>
          <Link className="btn btn--ink" href="/careers" data-reveal>See all roles <Arrow /></Link>
        </div>
        <TileFan tiles={["Mosaic", "Sound", "Lotus", "Shield", "Coins"]} />
      </Chapter>

      <Chapter about="Questions" number={8} theme="ink2">
        <div className="faq">
          <h2 className="h2 faq__title" data-split>Questions</h2>
          <div>
            {site.faq.map((f, i) => (
              <details key={f.q} className="qa" open={i === 0}>
                <summary>{f.q}<span className="plus" aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Chapter>

      <Chapter id="early" about="Early access" number={9} theme="ink">
        <EarlyAccess />
      </Chapter>

      <TileRibbon tiles={["Kites", "Arches", "Lotus", "Jali", "Sun", "Peacock", "Leheriya", "Coins"]} reverse />
      <Marquee items={site.marquee} />
    </main>
  );
}
