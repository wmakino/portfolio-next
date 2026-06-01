import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "William Makino",
  description: "Artificial Intelligence, Data Science and Economics portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
      <Script src="https://analytics.wmakino.com/script.js" data-website-id="e927e61c-2364-4248-bf5e-65f46eac6318" />
    </html>
  );
}
