# DFORR website

Website for DFORR and its app Maya. Built with **Next.js 16, React 19, TypeScript, three.js, GSAP and Lenis**.

The design takes its cues from grail-app.com and the Awwwards mobile-app gallery:

- a black canvas with "chapters" that slide up and straighten like cards landing on a table;
- thin serif capitals (Bodoni Moda) over a clean sans (Geist);
- a 3D field of floating cards in the hero;
- a pinned phone section and a loading card;
- a sticky pill at the bottom of the screen.

The colours are a Jaipur "Pink City" palette, and all illustrations are original, drawn in code.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000.

**Keeping everything on D:** npm's cache is set to `D:\dffor\.cache\npm` by `.npmrc`, packages live in `D:\dffor\node_modules` and build output goes to `D:\dffor\.next`. Set `TEMP` and `TMP` to `D:\dffor\.cache\tmp` before running npm to keep temporary files on D: too. The preview config in `.claude/launch.json` already does this.

## Where things are

| What | Where |
| --- | --- |
| Shared text: email, menu, FAQ, footer, marquee | `content/site.ts` |
| Open jobs | `content/jobs.ts` |
| Home page sections and their text | `app/page.tsx` |
| Careers page | `app/careers/page.tsx` |
| Colours, fonts, spacing | variables at the top of `app/globals.css` |
| Illustrations (Jaipur folk tiles and the DFORR emblem) | `components/art/Tiles.tsx` |
| App screens inside the phone mockups | `components/phone/screens.tsx` |
| 3D engine scene (three.js) | `components/three/CoreScene.tsx` |

## Illustrations

`components/art/Tiles.tsx` has 12 original tiles: Jali, Arches, Leheriya, Kites, Peacock, Sun, Mosaic, Lotus, Sound, Shield, Coins and Atelier. Use one anywhere with `<Tile name="Kites" />`. To add a new one, write an SVG component in that file and add it to the `tiles` map.

To use a real photo or app screenshot instead, put the file in `public/` and swap the `<Tile>` for an `<img>`. For phone screens, set the path in `screenImages` in `content/site.ts`.

## Motion

Smooth scrolling (Lenis) and the shared scroll animations are in `components/motion/MotionRoot.tsx`. Add these attributes to any element:

| Attribute | Effect |
| --- | --- |
| `data-split` | heading reveals line by line |
| `data-reveal` (optionally `="0.1"` as a delay) | fades and rises in |
| `data-scrub` | words light up as you scroll |
| `data-count="120"` | number counts up (`data-decimals="1"` for decimals) |
| `data-parallax="0.2"` | drifts at a different speed |

Every `.chapter` lands with a slight rotation. Chapters that contain a pinned section need `pinned` on the `<Chapter>` component, because a transform would break pinning.

These parts have their own motion code:

- the hero card field: `components/HeroField.tsx`
- the pinned Maya phone: `components/MayaPinned.tsx`
- the loading card: `components/motion/Preloader.tsx`
- the magnetic bottom pill: `components/Pill.tsx`

Everything respects the operating system's "reduce motion" setting.

## Copy

The site text was run through cleverhumanizer.ai, then checked by hand to fix factual slips (for example "1Million" and a dropped "Keys"). Job descriptions in `content/jobs.ts` are DFORR's own wording and were left as they were.

## Forms

There is no server yet. The early-access field and the job application form open the visitor's email app, already filled in and addressed to the emails in `content/site.ts`. To collect sign-ups automatically, add a Next.js route handler or a form service.
