import Link from "next/link";
import { mailto, site, type FooterLink } from "@/content/site";
import { BigWordmark } from "./BigWordmark";

function Item({ link }: { link: FooterLink }) {
  if (typeof link === "string") return <li>{link}</li>;
  return <li><Link href={link.href}>{link.label}</Link></li>;
}

export function Footer() {
  const { company, footer } = site;
  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__cols">
          {footer.columns.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <ul>{c.links.map((l) => <Item key={typeof l === "string" ? l : l.href} link={l} />)}</ul>
            </div>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={mailto()}>{company.email}</a></li>
            <li>{company.location}</li>
          </ul>
        </div>
      </div>
      <div className="footer__legal-row">
        <p>{footer.tagline}</p>
        <p className="footer__legal">© {company.year} {company.legal}. {company.incorporation}.</p>
      </div>
      <BigWordmark />
    </footer>
  );
}
