import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { customFont as importedCustomFont } from "./font";

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

export const customFont = localFont({
  src: "/fonts/Satoshi-Regular.otf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProActiveLean",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${importedCustomFont.className} ${geistMono.className} antialiased`}
      >
        {/* Main content */}
        <main>
          <div className="">{children}</div>
        </main>
      </body>
    </html>
  );
}
