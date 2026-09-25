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
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-chivo",
});

// Using Chivo as a fallback for General Sans since we don't have the font file
// In a real scenario, we'd load General Sans via localFont.
const generalSans = Chivo({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-general-sans",
});

export const metadata: Metadata = {
  title: "N-YEIB Investment Funds",
  description: "Funding the dreams of young people & women.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${asul.variable} ${chivo.variable} ${generalSans.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
