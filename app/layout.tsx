import type { Metadata } from "next";
import { Space_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Growth Pulse — Your Daily Dose of Growth Marketing Intelligence",
  description:
    "Stay ahead with curated growth marketing insights, strategies, and industry trends. Bite-sized intelligence for busy marketers.",
  openGraph: {
    title: "Growth Pulse — Your Daily Dose of Growth Marketing Intelligence",
    description:
      "Curated growth marketing insights, strategies, and industry trends.",
    type: "website",
    siteName: "Growth Pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Pulse",
    description: "Your daily dose of growth marketing intelligence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${newsreader.variable}`}
    >
      <body className="bg-white text-ink antialiased">
        <Header />
        <main className="min-h-screen pt-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
