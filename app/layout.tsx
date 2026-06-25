import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";

import SmoothScrolling from "@/components/ui/SmoothScrolling";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AgeVerification from "@/components/AgeVerification";
import PageTransition from "@/components/PageTransition";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const trajanPro = localFont({
  src: "../public/fonts/trajanpro_bold.woff2",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Drink It Nepal",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${trajanPro.className} ${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} ${playfairDisplay.variable} antialiased`}
      >
        <AgeVerification />
        <SmoothScrolling>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScrolling>
        <div aria-hidden="true" className="grain-overlay" />
      </body>
    </html>
  );
}
