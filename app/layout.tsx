import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Link Hub",
  description: "Connect with me and see all my important links in one place.",
  openGraph: {
    title: "My Link Hub",
    description: "Connect with me and see all my important links in one place.",
    url: "https://links-pink-psi.vercel.app/", 
    siteName: "Link Hub",
    images: [
      {
        url: "/home.jpg",
        width: 1200,
        height: 630,
        alt: "Link Hub Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Link Hub",
    description: "Connect with me and see all my important links in one place.",
    images: ["/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}