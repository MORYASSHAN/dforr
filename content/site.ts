/*
 * DFORR site content.
 * Edit this file to change shared text without touching layout code.
 * The home page reads as one story (see "Copy" in README.md), so check a
 * change here doesn't repeat something a section already says.
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

  // Read in order, these follow the home page story: problem, the evening, why.
  marquee: [
    "Presence over feeds",
    "Be in the room",
    "Dress for it",
    "Hear who's near",
    "Just your people",
    "Someone who remembers",
    "Pay creators directly",
    "Made in Jaipur",
  ],

  // Short answers. The home page tells the full story, so these don't repeat it.
  faq: [
    {
      q: "What is Maya?",
      a: "DFORR's first app: places you visit with friends, instead of a feed you scroll.",
    },
    {
      q: "Do I need a VR headset?",
      a: "No. An iPhone or Android phone is all you need.",
    },
    {
      q: "How is my privacy protected?",
      a: "Calls are encrypted before they leave your phone and screen recordings come up black. We don't build profiles or sell your data.",
    },
    {
      q: "What are Maya Coins?",
      a: "How you pay creators. 100 coins is always $1, and it goes straight to them.",
    },
    {
      q: "How do I get early access?",
      a: "Leave your email at the bottom of this page.",
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
    tagline: "Stop watching. Be there.",
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
