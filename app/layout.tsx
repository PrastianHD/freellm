import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreeLLM — Otak gratis untuk AI Agent & Coding CLI",
  description:
    "Direktori provider LLM gratis yang bisa dipakai sebagai backend Claude Code, Cline, Cursor, dan AI agent lain. Lengkap dengan rate limit, syarat sign-up, kompatibilitas klien, dan kebijakan data.",
  icons: {
    icon: "/logos/logo.png",
    shortcut: "/logos/logo.png",
    apple: "/logos/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className={serif.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
