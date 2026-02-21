import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, TWITTER_HANDLE } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "./analytics";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const fullTitle = `${SITE_NAME} - Self-Scaling Stablecoin Operating System`;

export const metadata: Metadata = {
  title: fullTitle,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: "Polaris Team", url: SITE_URL }],
  keywords: [
    "stablecoin",
    "DeFi",
    "yield",
    "Ethereum",
    "decentralized finance",
    "CDP",
    "bonding curve",
    "pUSD",
    "pETH",
    "POLAR",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: fullTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/polaris-og.png",
        width: 1200,
        height: 630,
        alt: fullTitle,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: SITE_DESCRIPTION,
    images: ["/polaris-og.png"],
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Polaris Protocol Blog" href="/blog/feed.xml" />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
