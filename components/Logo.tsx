// DFORR logo: the mark on its own, and the full lockup with the name.
import Link from "next/link";

const MARK = "/brand/dforr-logo-320.webp";

/** The logo mark. A light sweep runs across it every few seconds. */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`logo-mark ${className}`} style={{ width: size, height: Math.round(size * 0.89) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MARK} alt="" width={size} height={Math.round(size * 0.89)} />
    </span>
  );
}

/** Logo and the DFORR name, used at the top of each page. */
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="DFORR home">
      <LogoMark size={46} />
      <span className="brand__name">DFORR</span>
    </Link>
  );
}
