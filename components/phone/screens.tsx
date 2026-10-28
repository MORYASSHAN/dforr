/*
 * The Maya app screens shown inside the phone mockups.
 * Each screen is plain JSX, so its text and colours are easy to change.
 * To add a screen: write a component here, add it to `screens` below,
 * and add its name to the ScreenName type in content/site.ts.
 */
import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { ScreenName } from "@/content/site";
import { Icon, type IconName } from "./icons";

type ScreenProps = { uid: string };

const tabs: [IconName, string][] = [
  ["explore", "Explore"],
  ["events", "Events"],
  ["camera", "Camera"],
  ["bedroom", "BedRoom"],
  ["chat", "Chat"],
];

function TabBar({ active }: { active: IconName }) {
  return (
    <nav className="ms-tabbar">
      {tabs.map(([key, label]) => (
        <span key={key} className={key === active ? "is-on" : undefined}>
          <Icon name={key} />
          <i>{label}</i>
        </span>
      ))}
    </nav>
  );
}

function Bar({ title, sub, right }: { title: string; sub: ReactNode; right: ReactNode }) {
  return (
    <div className="ms-bar">
      <span className="ms-ico">
        <Icon name="back" />
      </span>
      <div>
        <p className="ms-hi">{title}</p>
        <p className="ms-muted">{sub}</p>
      </div>
      {right}
    </div>
  );
}

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* ---------- Home ---------- */
function Home() {
  return (
    <div className="ms ms-home">
      <div className="ms-top">
        <div>
          <p className="ms-hi">Hey, Aarav!</p>
          <p className="ms-muted">Welcome back</p>
        </div>
        <span className="ms-avatar" />
      </div>
      <h4 className="ms-headline">
        Ready to be <span>truly</span> present today?
      </h4>
      <p className="ms-label">Step into a space:</p>
      <div className="ms-chips">
        <span className="is-on">Recent</span>
        <span><b style={vars({ "--c": "#ff7a59" })} />Arena</span>
        <span><b style={vars({ "--c": "#8d3bff" })} />Rooms</span>
        <span><b style={vars({ "--c": "#3fb8af" })} />Atelier</span>
      </div>
      <div className="ms-cards">
        <div className="ms-card ms-card--glow">
          <p className="ms-card-title">Royal Mehrangarh Philharmonic</p>
          <p className="ms-card-sub">Live • 1,000,000 capacity</p>
          <span className="ms-pill"><b className="ms-dot" />Join</span>
        </div>
        <div className="ms-card">
          <p className="ms-card-title">Friends&apos; Rooftop</p>
          <p className="ms-card-sub">6 inside • Encrypted</p>
          <span className="ms-pill"><Icon name="lock" />Enter</span>
        </div>
      </div>
      <TabBar active="explore" />
    </div>
  );
}

/* ---------- Live Arena ---------- */
// Seats drawn as arcs of dots around the stage; "friends" glow violet.
const seats = (() => {
  const out: { x: number; y: number; friend: boolean; op: number }[] = [];
  for (let row = 0; row < 9; row++) {
    const r = 42 + row * 11;
    const count = 14 + row * 4;
    for (let i = 0; i <= count; i++) {
      const a = Math.PI + (Math.PI * i) / count;
      out.push({
        x: +(130 + r * Math.cos(a)).toFixed(1),
        y: +(150 + r * Math.sin(a) * 0.82).toFixed(1),
        friend: (row * 7 + i * 3) % 23 === 0,
        op: +(0.25 + ((row * 13 + i * 7) % 10) / 16).toFixed(2),
      });
    }
  }
  return out;
})();

function Arena({ uid }: ScreenProps) {
  return (
    <div className="ms ms-arena">
      <Bar
        title="Amphitheater Live"
        sub="1,000,000 friends • synchronized"
        right={<span className="ms-live"><b className="ms-dot" />LIVE</span>}
      />
      <div className="ms-stage">
        <svg className="ms-arena-svg" viewBox="0 0 260 160" aria-hidden="true">
          <defs>
            <radialGradient id={`glow-${uid}`} cx="50%" cy="100%" r="60%">
              <stop offset="0" stopColor="#f3bfd6" stopOpacity=".9" />
              <stop offset=".45" stopColor="#e0559a" stopOpacity=".35" />
              <stop offset="1" stopColor="#e0559a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="130" cy="150" rx="120" ry="70" fill={`url(#glow-${uid})`} />
          <g fill="#ceced7">
            {seats.map((s, i) =>
              s.friend ? (
                <circle key={i} cx={s.x} cy={s.y} r="2.1" className="seat-friend" />
              ) : (
                <circle key={i} cx={s.x} cy={s.y} r="1.25" fillOpacity={s.op} />
              )
            )}
          </g>
          <ellipse cx="168" cy="96" rx="26" ry="18" className="ms-arena-ring" />
          <circle cx="168" cy="96" r="3.2" className="ms-arena-you" />
          <path d="M95 150 Q130 128 165 150 Z" fill="#e9e4ff" fillOpacity=".9" />
        </svg>
        <div className="ms-reactions" aria-hidden="true">
          {["🔥", "🎉", "👏", "🔥", "🎉"].map((e, i) => <i key={i}>{e}</i>)}
        </div>
      </div>
      <p className="ms-card-title">Royal Mehrangarh Philharmonic</p>
      <p className="ms-card-sub">Positional surround sound in 7.1.4 HRTF</p>
      <div className="ms-stats">
        <div><b>14ms</b><small>Latency</small></div>
        <div><b>15m</b><small>Acoustic drop</small></div>
        <div><b>7.1.4</b><small>HRTF</small></div>
      </div>
      <div className="ms-seg">
        <span className="is-on">Front Podium</span>
        <span>Soundboard</span>
        <span>Balcony</span>
      </div>
      <TabBar active="events" />
    </div>
  );
}

/* ---------- AI Companion ---------- */
function Companion() {
  return (
    <div className="ms ms-companion">
      <Bar title="Maya Mind" sub="Your BedRoom sanctuary" right={<span className="ms-ico"><Icon name="phone" /></span>} />
      <div className="ms-orb-wrap">
        <span className="ms-ring" />
        <span className="ms-ring" />
        <div className="ms-orb"><i /><i /><u /></div>
      </div>
      <div className="ms-wave" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => <i key={i} />)}
      </div>
      <div className="ms-chat">
        <p className="ms-msg ms-msg--me">Long day. Rehearsal ran late again.</p>
        <p className="ms-msg">You&apos;ve practised the second movement all week. Want to run it once more, slowly, before you sleep?</p>
      </div>
      <div className="ms-memory"><span>Core</span><span>Gist</span><span>Episodic</span></div>
      <TabBar active="bedroom" />
    </div>
  );
}

/* ---------- Bespoke Atelier ---------- */
function Atelier({ uid }: ScreenProps) {
  const silk = `silk-${uid}`;
  const sheen = `sheen-${uid}`;
  return (
    <div className="ms ms-atelier">
      <Bar title="Bespoke Atelier" sub="Fitted to your body scan" right={<span className="ms-badge">99.8%</span>} />
      <div className="ms-fit">
        <svg className="ms-atelier-svg" viewBox="0 0 160 230" aria-hidden="true">
          <defs>
            <linearGradient id={silk} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a98bff" />
              <stop offset=".5" stopColor="#6a2fc2" />
              <stop offset="1" stopColor="#2a0a63" />
            </linearGradient>
            <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".35" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="26" r="13" fill="#3a3c44" />
          <rect x="75" y="38" width="10" height="9" rx="3" fill="#3a3c44" />
          <path d="M58 50 Q80 44 102 50 L106 92 Q80 98 54 92 Z" fill={`url(#${silk})`} />
          <path d="M54 92 Q80 98 106 92 L138 210 Q80 224 22 210 Z" fill={`url(#${silk})`} />
          <path className="ms-sheen" d="M54 92 Q80 98 106 92 L138 210 Q80 224 22 210 Z" fill={`url(#${sheen})`} />
          <path d="M22 210 Q80 224 138 210" stroke="#e8c36a" strokeWidth="3" fill="none" />
          <path d="M27 196 Q80 209 133 196" stroke="#e8c36a" strokeWidth="1" strokeDasharray="2 3" fill="none" />
          <path d="M58 50 L44 96 M102 50 L116 96" stroke="#3a3c44" strokeWidth="7" strokeLinecap="round" />
          <g className="ms-measure" stroke="#ceced7" strokeWidth=".8" strokeDasharray="3 3" fill="none">
            <path d="M48 66 H112" />
            <path d="M50 92 H110" />
            <path d="M150 50 V210" />
          </g>
        </svg>
        <span className="ms-tag ms-tag--a">Bust 86 cm</span>
        <span className="ms-tag ms-tag--b">Waist 70 cm</span>
        <span className="ms-tag ms-tag--c">Drape match</span>
      </div>
      <p className="ms-label">Fabric</p>
      <div className="ms-swatches">
        <span className="is-on" style={vars({ "--s": "linear-gradient(135deg,#a98bff,#4b1a9a)" })}><i />Silk</span>
        <span style={vars({ "--s": "linear-gradient(135deg,#7b1e3a,#2b0a14)" })}><i />Velvet</span>
        <span style={vars({ "--s": "linear-gradient(135deg,#f3d38a,#a8762a)" })}><i />Zardozi</span>
      </div>
      <span className="ms-cta">Try on in 3D</span>
      <TabBar active="camera" />
    </div>
  );
}

/* ---------- Private Rooms ---------- */
function Rooms() {
  return (
    <div className="ms ms-rooms">
      <Bar
        title="Friends' Rooftop"
        sub={<><Icon name="lock" />End-to-end encrypted</>}
        right={<span className="ms-ico"><Icon name="phone" /></span>}
      />
      <div className="ms-people">
        {[260, 20, 170, 320].map((h) => <span key={h} style={vars({ "--h": h })} />)}
        <span className="ms-more">+2</span>
      </div>
      <div className="ms-chat">
        <p className="ms-msg">Concert at 9? Front podium seats 🎻</p>
        <p className="ms-msg ms-msg--me">In. Saving you a spot.</p>
        <p className="ms-msg">Voice room open — come hang.</p>
      </div>
      <div className="ms-call">
        <span className="ms-ico"><Icon name="mic" /></span>
        <div>
          <p className="ms-card-title">Voice room • 4 inside</p>
          <p className="ms-card-sub">SFrame E2EE • relays never hold keys</p>
        </div>
      </div>
      <TabBar active="chat" />
      <div className="ms-shield" aria-hidden="true">
        <Icon name="lock" />
        <p>Screen capture blocked</p>
        <small>Recorders receive 100% black frames</small>
      </div>
    </div>
  );
}

export const screens: Record<ScreenName, (props: ScreenProps) => ReactElement> = {
  home: Home,
  arena: Arena,
  companion: Companion,
  atelier: Atelier,
  rooms: Rooms,
};
