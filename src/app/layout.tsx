import type { Metadata } from "next";
import { Outfit, Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Samudra Supply | Indonesia Commodity Export Platform",
  description:
    "Samudra Supply connects premium Indonesian commodity suppliers with global buyers.",
  keywords: [
    "Indonesia export",
    "Indonesian suppliers",
    "Indonesian commodities",
    "B2B marketplace",
    "Samudra Supply",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Samudra Supply | Connecting Indonesian Commodities with Global Buyers",
    description:
      "Digital export platform helping Indonesian suppliers get discovered by international buyers.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <HashScrollHandler />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
