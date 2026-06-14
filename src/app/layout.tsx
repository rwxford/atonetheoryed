import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Spectral } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// A refined serif for the academic / historical voice. Self-hosted at build
// time by next/font, so there are no external font requests at runtime.
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: {
    default: "Theories of Atonement — Interactive Quiz & Encyclopedia",
    template: "%s · Theories of Atonement",
  },
  description:
    "An unbiased, academic quiz and interactive encyclopedia of the historic Christian theories of the atonement. Runs entirely in your browser — no tracking, no accounts.",
  applicationName: "Theories of Atonement",
  keywords: [
    "atonement",
    "theology",
    "penal substitution",
    "Christus Victor",
    "moral influence",
    "satisfaction",
    "recapitulation",
    "theosis",
    "ransom",
    "Girard",
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-parchment"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
