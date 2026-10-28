/*
 * DFORR site content.
 * Edit this file to change shared text without touching layout code.
 * Copy was run through cleverhumanizer.ai, then checked by hand for accuracy.
 */

export type ScreenName = "home" | "arena" | "companion" | "atelier" | "rooms";

export type FooterLink = string | { label: string; href: string };

export const site = {
  company: {
    name: "DFORR",
    legal: "DFORR Private Limited",
    email: "dforrpvtltd@gmail.com",
    // Applications from the Careers page are emailed here.
    careersEmail: "dforrpvtltd@gmail.com",
    location: "Jaipur, Rajasthan, India",
    incorporation: "Incorporated under the Companies Act 2013, Jaipur",
    year: 2026,
  },

  // Menu inside the bottom pill.
  nav: [
    { label: "Home", href: "/" },
    { label: "Maya", href: "/#maya" },
    { label: "Places", href: "/#places" },
    { label: "Engine", href: "/#engine" },
    { label: "Mission", href: "/#mission" },
    { label: "Careers", href: "/careers" },
    { label: "Early access", href: "/#early" },
  ],

  marquee: [
    "15-metre positional sound",
    "Encrypted voice rooms",
    "120 FPS on a normal phone",
    "1,000,000 people in one arena",
    "No feeds",
    "100 coins = $1",
    "Pay creators directly",
    "LiDAR room scans",
    "Made in Jaipur",
  ],

  faq: [
    {
      q: "What is Maya?",
      a: "A feedless social app from DFORR. Meet people in real 3D spaces including concerts, friend rooms and a fitting room. Plus an AI companion.",
    },
    {
      q: "Do I need a VR headset?",
      a: "No. It runs on a standard iPhone or Android. Simply tilt your phone.",
    },
    {
      q: "How is my privacy protected?",
      a: "All calls are encrypted on your phone. Screen recordings come up black. We won't create profiles or sell your data.",
    },
    {
      q: "What are Maya Coins?",
      a: "The currency to pay creators directly. Always 100 coins = $1.",
    },
    {
      q: "How do I get early access?",
      a: "Fill in your email at the bottom of this page and we'll contact you when there's a spot.",
    },
  ],

  footer: {
    columns: [
      {
        title: "Maya",
        links: [
          { label: "Live arenas", href: "/#maya" },
          { label: "Places", href: "/#places" },
          { label: "The engine", href: "/#engine" },
          { label: "Early access", href: "/#early" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Mission", href: "/#mission" },
          { label: "Careers", href: "/careers" },
          { label: "Open roles", href: "/careers#roles" },
        ],
      },
    ] as { title: string; links: FooterLink[] }[],
    tagline: "Real life happens offline. Maya just gets you there.",
  },

  /*
   * Phone mockup screens are drawn in code (components/phone/screens.tsx).
   * To show a real app screenshot instead, put the image in /public/screens
   * and set its path here, e.g.  arena: "/screens/arena.png"
   */
  screenImages: {
    home: null,
    arena: null,
    companion: null,
    atelier: null,
    rooms: null,
  } as Record<ScreenName, string | null>,
};

export const mailto = (subject?: string, email = site.company.email, body?: string) => {
  const params = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join("&");
  return `mailto:${email}${params ? `?${params}` : ""}`;
};
