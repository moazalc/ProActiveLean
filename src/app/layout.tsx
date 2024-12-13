import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/app-header";
import { Toaster } from "@/components/ui/toaster";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${importedCustomFont.className} ${geistMono.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            {/* Sidebar */}
            <AppSidebar />

            {/* Header */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />

              {/* Main content */}
              <main className="container flex-1 overflow-y-auto p-4 ">
                {children}
              </main>
              <Toaster />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
