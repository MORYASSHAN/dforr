"use client";

/*
 * Phone mockup showing how the Maya app might look.
 *   <Phone screens={["arena", "companion"]} active="companion" />
 * All listed screens are rendered and cross-fade when `active` changes.
 * A screen uses a real screenshot instead when one is set in content/site.ts.
 */
import { forwardRef, useId, type CSSProperties } from "react";
import { site, type ScreenName } from "@/content/site";
import { screens as drawn } from "./screens";

type PhoneProps = {
  screens: ScreenName[];
  active?: ScreenName;
  shielded?: boolean;
  className?: string;
  style?: CSSProperties;
};

export const Phone = forwardRef<HTMLDivElement, PhoneProps>(function Phone(
  { screens, active = screens[0], shielded = false, className = "", style },
  ref
) {
  const uid = useId().replace(/:/g, "");
  return (
    <div
      ref={ref}
      className={`phone ${shielded ? "is-shielded" : ""} ${className}`}
      data-current={active}
      style={style}
      aria-hidden="true"
    >
      <div className="phone__frame">
        <div className="phone__screen">
          <div className="phone__status">
            <span>09:41</span>
            <span className="phone__island" />
            <span className="phone__sig"><i /><i /><i /><b /></span>
          </div>
          {screens.map((name) => {
            const Screen = drawn[name];
            const image = site.screenImages[name];
            return (
              <div key={name} className={`phone__view ${name === active ? "is-active" : ""}`}>
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="ms-shot" src={image} alt="" />
                ) : (
                  <Screen uid={`${uid}-${name}`} />
                )}
              </div>
            );
          })}
        </div>
        <span className="phone__btn phone__btn--a" />
        <span className="phone__btn phone__btn--b" />
        <span className="phone__btn phone__btn--c" />
      </div>
    </div>
  );
});
