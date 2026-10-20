import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "One Dish Biryani — Homemade. One Pot. Pure Saffron.",
  description:
    "Homemade chicken, beef, and lamb biryani with olive oil and real saffron. Choose a bowl for yourself or a tray to share.",
  keywords: [
    "biryani",
    "homemade biryani",
    "chicken biryani",
    "beef biryani",
    "lamb biryani",
    "saffron biryani",
    "olive oil biryani",
    "one pot biryani",

    "biryani catering",
  ],
  openGraph: {
    title: "One Dish Biryani — One Pot. Pure Saffron.",
    description:
      "Homemade biryani for your table. Browse chicken, beef, and lamb bowls and sharing trays.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${manrope.variable} antialiased bg-background text-foreground font-[family-name:var(--font-body)]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
