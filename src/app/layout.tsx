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
  title: "ODB — One Dish Biryani",
  applicationName: "ODB — One Dish Biryani",
  description:
    "Home-cooked chicken biryani for 4 people or more. Request your order online for pickup or delivery within 5 miles. Delivery costs extra by route. Zelle, Apple Cash, and Cash App accepted.",
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
    title: "ODB — One Dish Biryani",
    siteName: "ODB — One Dish Biryani",
    description:
      "Home-cooked chicken biryani. Request your order online for pickup or local delivery. Zelle, Apple Cash, and Cash App accepted. Beef and lamb coming soon.",
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
        <a href="#main-content" className="sr-only fixed top-3 left-3 z-[100] rounded-lg bg-cream px-4 py-3 font-semibold text-espresso focus:not-sr-only">Skip to content</a>
          {children}
          <Toaster />
      </body>
    </html>
  );
}
