import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Geist } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { Pill } from "@/components/Pill";
import "./globals.css";

const serif = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-serif" });
const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: { default: "DFORR | Presence over feeds", template: "%s | DFORR" },
  description: "DFORR is a pre-seed startup in Jaipur building Maya, a social app where friends meet in live 3D places on their phones instead of scrolling a feed.",
};

export const viewport: Viewport = { themeColor: "#0b0a0b" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <Footer />
        <Pill />
        <MotionRoot />
      </body>
    </html>
  );
}
