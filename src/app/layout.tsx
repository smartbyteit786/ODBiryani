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
    "Clean, fresh, home-cooked chicken biryani for groups of 4 or more. Tell ODB how many people and request a personal quote. Beef and lamb coming soon.",
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
      "Home-cooked chicken biryani for 4 people or more. Request a personal quote. Beef and lamb coming soon.",
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
