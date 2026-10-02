import type { Metadata } from "next";
import { Asul, Chivo } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const asul = Asul({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-asul",
});

const chivo = Chivo({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chivo",
});

export const metadata: Metadata = {
  title: "YEIB Investment Fund",
  description: "Funding the dreams of young people & women.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${asul.variable} ${chivo.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
