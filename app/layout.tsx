import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/SocialSidebar";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CreativePulse from "@/components/canvas/CreativePulse";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "High-end personal portfolio of a Lead Creative Developer and UX Engineer.",
  icons: {
    icon: "/favicon.ico",
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
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-accent selection:text-white">
        <SmoothScrollProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <CreativePulse />
            <CustomCursor />
            <Navbar />
            <SocialSidebar />
            {children}
            <Analytics />
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
