import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SmoothScrolling from "@/components/ui/SmoothScrolling";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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
        className={`${trajanPro.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrolling>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
