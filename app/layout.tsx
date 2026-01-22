import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Polaris Protocol - Self-Scaling Stablecoin Operating System",
  description:
    "Polaris re-architects onchain activity to generate uncorrelated, scalable returns, without T-Bills, without CEXs, without compromises.",
  metadataBase: new URL("https://polarisfinance.io"),
  openGraph: {
    title: "Polaris Protocol - Self-Scaling Stablecoin Operating System",
    description:
      "Polaris re-architects onchain activity to generate uncorrelated, scalable returns.",
    url: "https://polarisfinance.io",
    siteName: "Polaris Protocol",
    images: [
      {
        url: "/polaris-system-social.png",
        width: 1200,
        height: 510,
        alt: "Polaris Protocol System Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polaris Protocol - Self-Scaling Stablecoin Operating System",
    description:
      "Polaris re-architects onchain activity to generate uncorrelated, scalable returns.",
    images: ["/polaris-system-social.png"],
    creator: "@polarisfinance_",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/brand-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
