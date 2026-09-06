import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Wahad Ahmed | Web Developer",
  description:
    "Portfolio of Wahad Ahmed — a passionate web developer from Lahore, Pakistan. Building modern, animated, and high-performance web experiences.",
  keywords: ["Wahad Ahmed", "Web Developer", "Lahore", "Pakistan", "Next.js", "React", "Portfolio"],
  openGraph: {
    title: "Wahad Ahmed | Web Developer",
    description: "Full-stack web developer based in Lahore, Pakistan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
