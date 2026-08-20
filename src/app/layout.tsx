import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import { Schema } from "@/components/Schema";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Nav } from "@/components/layout/Nav";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { site } from "@/content/site.config";
import { keywords, organisationSchema } from "@/lib/seo";
import "./globals.css";

/**
 * Fraunces for display: a variable serif with optical sizing and a "wonk"
 * axis, warm and editorial rather than the default high-contrast Didone.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

/** Manrope for UI: quietly humanist, reads well small. */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

/** Mono for structural labels — codes, coordinates, step numbers. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono-face",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Nisu Travel — Travel Agency in Prishtina, Kosovo",
    template: "%s · Nisu Travel",
  },
  description: site.description,
  keywords,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: site.url,
    title: "Nisu Travel — Your Journey Starts Here",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090b",
  width: "device-width",
  initialScale: 1,
  // Zoom is never disabled.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh bg-ink antialiased">
        <Schema data={organisationSchema()} />
        <LoadingScreen />
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
