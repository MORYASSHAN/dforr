/*
 * Original flat folk-geometric illustrations for DFORR, drawn from Jaipur:
 * jali screens, Hawa Mahal arches, leheriya waves, kites, peacocks.
 * Each tile is a 120 × 160 portrait card. Colours come from the palette below.
 */
import type { ReactElement, ReactNode } from "react";

export const palette = {
  ink: "#121012",
  paper: "#f4efe7",
  rose: "#f3bfd6",
  plum: "#5a2347",
  saffron: "#eaa21c",
  terracotta: "#c4462c",
  indigo: "#2a3f9d",
  peacock: "#0e7a72",
};

const { ink, paper, rose, plum, saffron, terracotta, indigo, peacock } = palette;

type TileProps = { className?: string };

function Frame({ bg, children, className }: { bg: string; children: ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 160" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="120" height="160" fill={bg} />
      {children}
    </svg>
  );
}

const grid = (cols: number, rows: number, fn: (x: number, y: number, i: number, j: number) => ReactElement, w = 120, h = 160) =>
  Array.from({ length: cols * rows }, (_, k) => {
    const i = k % cols;
    const j = Math.floor(k / cols);
    return fn(((i + 0.5) * w) / cols, ((j + 0.5) * h) / rows, i, j);
  });

/** Eight-point star (two squares) — the jali and Rajput star motif. */
const star = (cx: number, cy: number, r: number, fill: string, key?: string | number) => (
  <g key={key} fill={fill}>
    <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} />
    <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} transform={`rotate(45 ${cx} ${cy})`} />
  </g>
);

/** Jali screen: rose stars on indigo. */
export function Jali({ className }: TileProps) {
  return (
    <Frame bg={indigo} className={className}>
      {grid(3, 4, (x, y, i, j) => (
        <g key={`${i}-${j}`}>
          {star(x, y, 11, rose)}
          <circle cx={x} cy={y} r="5" fill={indigo} />
          <circle cx={x} cy={y} r="2" fill={saffron} />
        </g>
      ))}
    </Frame>
  );
}

/** Hawa Mahal windows: rows of saffron arches on terracotta. */
export function Arches({ className }: TileProps) {
  return (
    <Frame bg={terracotta} className={className}>
      {grid(4, 5, (x, y, i, j) => (
        <g key={`${i}-${j}`}>
          <path d={`M${x - 10} ${y + 12} V${y - 4} a10 10 0 0 1 20 0 V${y + 12} Z`} fill={saffron} />
          <path d={`M${x - 5} ${y + 12} V${y} a5 5 0 0 1 10 0 V${y + 12} Z`} fill={plum} />
          <circle cx={x} cy={y - 9} r="1.6" fill={paper} />
        </g>
      ))}
    </Frame>
  );
}

/** Leheriya: Rajasthani diagonal wave stripes. */
export function Leheriya({ className }: TileProps) {
  const colours = [rose, plum, saffron, rose, peacock];
  return (
    <Frame bg={paper} className={className}>
      <g transform="rotate(-30 60 80)">
        {Array.from({ length: 16 }, (_, k) => {
          const y = -60 + k * 18;
          return (
            <path
              key={k}
              d={`M-80 ${y} q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0`}
              stroke={colours[k % colours.length]}
              strokeWidth="7"
              fill="none"
            />
          );
        })}
      </g>
    </Frame>
  );
}

/** Kite festival (Makar Sankranti): three kites on rose. */
export function Kites({ className }: TileProps) {
  const kite = (x: number, y: number, s: number, a: string, b: string, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 -22 L16 0 L0 22 L-16 0 Z" fill={a} />
      <path d="M0 -22 L16 0 L0 0 Z" fill={b} />
      <path d="M-16 0 H16 M0 -22 V22" stroke={ink} strokeOpacity=".25" strokeWidth="1" />
      <path d="M0 22 q-6 8 0 14 q6 6 0 12" stroke={ink} strokeWidth="1" fill="none" />
    </g>
  );
  return (
    <Frame bg={rose} className={className}>
      <path d="M20 160 C40 120 30 90 38 62 M60 160 C70 130 82 100 84 44 M100 160 C96 140 100 120 66 104" stroke={plum} strokeWidth="1" fill="none" strokeDasharray="2 3" />
      {kite(38, 48, 1.1, indigo, saffron, -10)}
      {kite(86, 34, 0.9, terracotta, plum, 12)}
      {kite(64, 96, 0.75, peacock, saffron, -4)}
    </Frame>
  );
}

/** Peacock feather eyes on plum. */
export function Peacock({ className }: TileProps) {
  return (
    <Frame bg={plum} className={className}>
      {grid(2, 3, (x, y, i, j) => (
        <g key={`${i}-${j}`} transform={`translate(${x} ${y + (i % 2 ? 10 : -6)})`}>
          <path d="M0 -26 C18 -10 18 14 0 22 C-18 14 -18 -10 0 -26 Z" fill={peacock} />
          <path d="M0 -14 C11 -4 11 12 0 16 C-11 12 -11 -4 0 -14 Z" fill={saffron} />
          <ellipse cx="0" cy="4" rx="6" ry="8" fill={indigo} />
          <circle cx="0" cy="5" r="2.6" fill={ink} />
        </g>
      ))}
    </Frame>
  );
}

/** Sun disc with rays (Surya, the Rajput sun) on saffron. */
export function Sun({ className }: TileProps) {
  return (
    <Frame bg={saffron} className={className}>
      <g transform="translate(60 80)">
        {Array.from({ length: 16 }, (_, k) => (
          <path key={k} d="M-6 -34 L0 -56 L6 -34 Z" fill={terracotta} transform={`rotate(${k * 22.5})`} />
        ))}
        <circle r="32" fill={plum} />
        <circle r="22" fill={rose} />
        {star(0, 0, 9, terracotta)}
      </g>
    </Frame>
  );
}

/** Mosaic: stepped terracotta diamonds on ink. */
export function Mosaic({ className }: TileProps) {
  const cells: ReactElement[] = [];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 12; x++) {
      const d = (Math.abs(((x + 3) % 6) - 3) + Math.abs(((y + 4) % 8) - 4)) % 4;
      if (d === 0 || d === 2) cells.push(<rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="10" height="10" fill={d === 0 ? terracotta : saffron} />);
    }
  }
  return <Frame bg={ink} className={className}>{cells}</Frame>;
}

/** Lotus on peacock teal. */
export function Lotus({ className }: TileProps) {
  const petal = (rot: number, fill: string, s = 1) => (
    <path key={rot} d="M0 0 C10 -14 10 -34 0 -46 C-10 -34 -10 -14 0 0 Z" fill={fill} transform={`rotate(${rot}) scale(${s})`} />
  );
  return (
    <Frame bg={peacock} className={className}>
      <g transform="translate(60 100)">
        {[-70, 70].map((r) => petal(r, plum, 0.9))}
        {[-40, 40].map((r) => petal(r, rose))}
        {petal(0, paper, 1.1)}
        <path d="M-44 6 Q0 26 44 6" stroke={saffron} strokeWidth="4" fill="none" />
      </g>
      {[30, 90].map((x) => <circle key={x} cx={x} cy="34" r="6" fill={saffron} />)}
    </Frame>
  );
}

/** Sound: concentric arcs radiating from a stage. */
export function Sound({ className }: TileProps) {
  return (
    <Frame bg={ink} className={className}>
      {Array.from({ length: 7 }, (_, k) => (
        <path key={k} d={`M${60 - (k + 1) * 12} 140 a${(k + 1) * 12} ${(k + 1) * 12} 0 0 1 ${(k + 1) * 24} 0`} stroke={k % 2 ? rose : saffron} strokeWidth="5" fill="none" />
      ))}
      <rect x="40" y="138" width="40" height="22" fill={terracotta} />
    </Frame>
  );
}

/** Shield and lock: privacy. */
export function Shield({ className }: TileProps) {
  return (
    <Frame bg={rose} className={className}>
      <path d="M60 22 L98 36 V78 C98 106 80 126 60 138 C40 126 22 106 22 78 V36 Z" fill={indigo} />
      <path d="M60 36 L86 46 V78 C86 98 74 112 60 122 C46 112 34 98 34 78 V46 Z" fill={paper} />
      <rect x="48" y="74" width="24" height="20" rx="3" fill={plum} />
      <path d="M53 74 V68 a7 7 0 0 1 14 0 V74" stroke={plum} strokeWidth="4" fill="none" />
    </Frame>
  );
}

/** Coin stack: Maya Coins. */
export function Coins({ className }: TileProps) {
  return (
    <Frame bg={plum} className={className}>
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k} transform={`translate(60 ${126 - k * 14})`}>
          <ellipse rx="34" ry="10" cy="5" fill={terracotta} />
          <ellipse rx="34" ry="10" fill={saffron} />
        </g>
      ))}
      <text x="60" y="73" textAnchor="middle" fontSize="11" fontFamily="serif" fill={plum}>100 = $1</text>
      {star(26, 30, 5, rose)}
      {star(96, 44, 4, rose)}
    </Frame>
  );
}

/** Thread and needle over a fabric swatch: the atelier. */
export function Atelier({ className }: TileProps) {
  return (
    <Frame bg={paper} className={className}>
      <path d="M14 44 Q60 30 106 44 L106 130 Q60 116 14 130 Z" fill={terracotta} />
      <path d="M14 116 Q60 102 106 116 L106 130 Q60 116 14 130 Z" fill={saffron} />
      {grid(5, 3, (x, y, i, j) => <g key={`${i}-${j}`}>{star(x, y * 0.55 + 46, 3, rose)}</g>)}
      <path d="M22 22 L98 150" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M98 150 C80 120 40 150 30 110 S60 70 40 40" stroke={indigo} strokeWidth="1.6" fill="none" />
    </Frame>
  );
}

export const tiles = { Jali, Arches, Leheriya, Kites, Peacock, Sun, Mosaic, Lotus, Sound, Shield, Coins, Atelier };
export type TileName = keyof typeof tiles;

export function Tile({ name, className }: { name: TileName; className?: string }) {
  const T = tiles[name];
  return <T className={className} />;
}

/** DFORR emblem: an eight-point star inside a Rajput arch. */
export function Emblem({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 56" aria-hidden="true">
      <path d="M4 54 V24 C4 12 13 4 24 2 C35 4 44 12 44 24 V54 Z" fill="none" stroke={color} strokeWidth="3.4" />
      <g transform="translate(24 30)">
        <rect x="-8" y="-8" width="16" height="16" fill={color} />
        <rect x="-8" y="-8" width="16" height="16" fill={color} transform="rotate(45)" />
        <circle r="3.4" fill="var(--emblem-hole, #121012)" />
      </g>
      <path d="M12 54 V46 M36 54 V46" stroke={color} strokeWidth="3" />
    </svg>
  );
}
