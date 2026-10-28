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
    text: "A million seats. Voices fade past 15 metres, so find your people.",
    people: ["AK", "RS", "MJ"],
    more: "+12",
    foot: "Starts 9:00 pm",
  },
  {
    icon: "Shield",
    space: "Private room",
    title: "Rooftop with the usual six. Voice room is open.",
    text: "Encrypted on your phone. Recordings come up black.",
    people: ["NP", "DV"],
    more: "+4",
    foot: "Only friends can enter",
  },
  {
    icon: "Atelier",
    space: "Bespoke atelier",
    title: "Try the indigo silk kurta on your own scan.",
    text: "Drape match 99.8%. Velvet and zardozi also in stock.",
    foot: "Fitted to your measurements",
  },
  {
    icon: "Lotus",
    space: "Your companion",
    title: "Run the second movement once more before bed?",
    text: "It remembers rehearsal ran late.",
    foot: "BedRoom",
  },
];

const heroTiles: TileName[] = ["Jali", "Kites", "Mosaic", "Arches", "Peacock", "Leheriya", "Sun", "Coins", "Lotus", "Sound"];

const steps: MayaStep[] = [
  { screen: "arena", left: "A million", right: "in one room", text: "Live events with up to 1 million people. With spatial audio, people close by will be louder and people far away will be quieter." },
  { screen: "companion", left: "Someone", right: "who remembers", text: "Your very own companion in your BedRoom. It knows what you told it last week, talks to you in real time and its face moves." },
  { screen: "atelier", left: "Clothes", right: "that fit you", text: "Try on clothes based on your scan. The silk, velvet and zardozi all drape and move like real fabric. Get exactly what you saw." },
  { screen: "rooms", left: "Rooms", right: "nobody records", text: "Private spaces for you and your friends. All calls and messages are encrypted on your phone. If someone tries to screen record, it comes up black." },
];

const features: Feature[] = [
  {
    title: "Live Amphitheater",
    text: "Shows with up to 1 million people.",
    facts: ["1,000,000 seats", "7.1.4 surround sound", "14 ms latency"],
    tiles: ["Sound", "Mosaic", "Sun"],
    bg: "#121012",
    fg: "#f4efe7",
  },
  {
    title: "Your companion",
    text: "An AI that knows you.",
    facts: ["Remembers your week", "Real-time voice", "40+ expressions"],
    tiles: ["Lotus", "Peacock", "Jali"],
    bg: "#0e7a72",
    fg: "#f4efe7",
  },
  {
    title: "Bespoke Atelier",
    text: "Couture that fits your measurements.",
    facts: ["99.8% drape match", "Your own body scan", "Silk, velvet, zardozi"],
    tiles: ["Atelier", "Leheriya", "Arches"],
    bg: "#f3bfd6",
    fg: "#5a2347",
  },
  {
    title: "Spatial Lenses",
    text: "Lenses tracked on your phone. Rooms rebuilt in 3D.",
    facts: ["Face and body tracking", "LiDAR room scans", "3D Gaussian splatting"],
    tiles: ["Peacock", "Kites", "Jali"],
    bg: "#2a3f9d",
    fg: "#f4efe7",
  },
  {
    title: "Creator Economy",
    text: "Direct payments to creators. Always 100 coins = $1.",
    facts: ["100 coins = $1", "Paid directly", "No middleman"],
    tiles: ["Coins", "Sun", "Mosaic"],
    bg: "#eaa21c",
    fg: "#121012",
  },
  {
    title: "Private Rooms",
    text: "Encrypted voice and messaging with friends.",
    facts: ["Encrypted on your phone", "Recordings come up black", "No ads"],
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
            You see what everyone else is doing but aren&apos;t actually there. We believe a social app should make you feel you are in the room.
          </p>
        </div>
        <TileFan tiles={["Leheriya", "Jali", "Kites", "Sun", "Arches", "Peacock", "Mosaic"]} size="lg" />
      </Chapter>

      <Chapter id="maya" about="Maya" number={2} theme="rose" pinned className="maya">
        <div className="maya__intro">
          <span className="small">For iPhone and Android</span>
          <h2 className="h2" data-split>Meet Maya.</h2>
          <p className="lead" data-reveal>Maya is a feedless social app. Go to places, not feeds.</p>
        </div>
        <MayaPinned steps={steps} />
      </Chapter>

      <Chapter id="places" about="Places" number={3} theme="paper">
        <div className="places__head center">
          <span className="small muted">Where Maya takes you</span>
          <h2 className="h2" data-split>Six places to be. No feeds.</h2>
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
        <p className="lead muted numbers__note" data-reveal>No headset required.</p>
        <TileRibbon tiles={["Sound", "Kites", "Jali", "Coins", "Lotus", "Arches", "Peacock", "Sun", "Shield", "Leheriya", "Mosaic", "Atelier"]} />
      </Chapter>

      <Chapter id="engine" about="Engine" number={5} theme="ink2">
        <div className="center stack-lg">
          <h2 className="h2" data-split>The engine underneath.</h2>
          <p className="lead muted" data-reveal>5 self-built systems. Choose one and drag.</p>
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
          <h2 className="h2" data-split>We&apos;re looking to hire 12 engineers.</h2>
          <p className="lead muted" data-reveal>Mobile, graphics, audio, AI and security. Based in Jaipur. Can work remotely.</p>
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
