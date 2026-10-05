import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Variable on weight and width: the kinetic headlines animate both axes
const monaSans = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
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
      className={monaSans.variable}
    >
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-accent selection:text-white">
        <SmoothScrollProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Navbar />
            {children}
            <Analytics />
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
