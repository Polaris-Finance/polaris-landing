import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "./analytics";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        url: "/why-polaris/competitive-positioning.png",
        width: 1929,
        height: 1085,
        alt: "Polaris Protocol - Competitive Positioning",
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
    images: ["/why-polaris/competitive-positioning.png"],
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
      <body className="antialiased">
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
