"use client";

import { motion } from "framer-motion";

import SmoothScroll from "@/components/biryani/smooth-scroll";
import Navbar from "@/components/biryani/navbar";
import Hero from "@/components/biryani/hero";
import Marquee from "@/components/biryani/marquee";
import Story from "@/components/biryani/story";
import Craft from "@/components/biryani/craft";
import Ingredients from "@/components/biryani/ingredients";
import Menu from "@/components/biryani/menu";
import Gallery from "@/components/biryani/gallery";


import Order from "@/components/biryani/order";
import Footer from "@/components/biryani/footer";

export default function Home() {
  return (
    <SmoothScroll>

      <Navbar />

      <main className="min-h-screen bg-espresso">
        <Hero />
        <Marquee />
        <Story />
        <Craft />
        <Ingredients />
        <Menu />
        <Gallery />


        <Order />
      </main>

      <Footer />

      {/* floating order pill */}
      <motion.a
        href="#order"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.07 }}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 rounded-full bg-ember px-6 py-4 text-[13px] font-extrabold tracking-widest text-cream uppercase shadow-[0_18px_44px_rgba(196,80,46,0.5)] transition-colors hover:bg-[#d55a35] lg:hidden"
        aria-label="Jump to order form"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream/70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cream" />
        </span>
        Order biryani
      </motion.a>
    </SmoothScroll>
  );
}
