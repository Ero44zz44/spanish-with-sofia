import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { LanguageProvider } from "@/lib/language-context";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spanish with Sofía — Native Mexican Spanish Tutor Online",
  description:
    "Personalized 1-on-1 Spanish lessons with Sofía Martínez, a native Mexican Spanish teacher. Build real conversational fluency, master grammar naturally, and explore Latin American culture.",
  keywords: "Spanish tutor, online Spanish lessons, Mexican Spanish, native tutor, conversational Spanish",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
