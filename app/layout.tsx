import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Wahad Ahmed | Web Developer",
  description:
    "Portfolio of Wahad Ahmed — a passionate full-stack web developer from Lahore, Pakistan. Building modern, animated, and high-performance web experiences.",
  keywords: ["Wahad Ahmed", "Web Developer", "Lahore", "Pakistan", "Next.js", "React", "Portfolio"],
  openGraph: {
    title: "Wahad Ahmed | Web Developer",
    description: "Full-stack web developer based in Lahore, Pakistan.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <Navbar />
          <ThemeToggle />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
