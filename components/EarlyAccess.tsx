"use client";

// Early access sign-up. There's no server yet, so submitting opens an email
// to DFORR with the address filled in.
import { useState, type FormEvent } from "react";
import { mailto } from "@/content/site";
import { Tile } from "./art/Tiles";
import { LogoMark } from "./Logo";
import { Arrow } from "./ui";

export function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = mailto("Maya early access", undefined, `Please add me to Maya early access.\n\nEmail: ${email}`);
    setSent(true);
  };

  return (
    <div className="early">
      <div className="early__glow" aria-hidden="true" />
      <div className="early__copy">
        <div className="early__icon early__icon--logo" data-reveal><LogoMark size={64} /></div>
        <h2 className="h2" data-split>Leave the feed early.</h2>
        <p className="lead muted" data-reveal>
          Early access is opening on iPhone and Android. Leave your email and we&apos;ll let you know when there&apos;s a spot.
        </p>
      </div>

      <div className="early__panel" data-reveal="0.1">
        <div className="early__art" aria-hidden="true">
          <span className="early__tile early__tile--a"><Tile name="Kites" /></span>
          <span className="early__tile early__tile--b"><Tile name="Jali" /></span>
          <span className="early__tile early__tile--c"><Tile name="Sun" /></span>
        </div>
        <form className="early__form" onSubmit={submit}>
          <label className="early__label" htmlFor="early-email">Your email</label>
          <div className="early__field">
            <input
              id="early-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSent(false);
              }}
              autoComplete="email"
            />
            <button className="btn btn--rose" type="submit">
              Join <Arrow />
            </button>
          </div>
          <p className="early__note" aria-live="polite">
            {sent ? "Your email app should open now. Send it and you're on the list." : "No newsletters. Just the one email."}
          </p>
        </form>
        <ul className="early__points">
          <li><b>Come as you are</b><span>The phone you have is enough.</span></li>
          <li><b>Bring your people</b><span>Invite friends into your rooms.</span></li>
        </ul>
      </div>
    </div>
  );
}
