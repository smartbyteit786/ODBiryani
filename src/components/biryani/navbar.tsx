"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

const LINKS = [
  { href: "#story", label: "Our Story" },
  { href: "#craft", label: "How We Cook" },
  { href: "#menu", label: "Menu & Prices" },
  { href: "#gallery", label: "Gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-saffron via-saffron-bright to-ember"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "border-b border-saffron/15 bg-espresso/80 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "bg-transparent py-4"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-saffron/50 bg-roast transition-transform duration-500 group-hover:rotate-12">
              <svg viewBox="0 0 48 48" className="h-5 w-5 text-saffron" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M8 22h32c0 9.5-6 17-16 17S8 31.5 8 22Z" />
                <path d="M14 14c2-2 2-4 0-6M24 12c2-2 2-4 0-6M34 14c2-2 2-4 0-6" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-2xl font-semibold tracking-[0.12em] text-cream">
                ODB
              </span>
              <span className="block text-[9px] font-bold tracking-[0.14em] text-saffron uppercase">
                One Dish Biryani
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[13px] font-semibold tracking-wide text-cream/80 uppercase transition-colors hover:text-saffron"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-saffron transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#order"
              className="group hidden items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-[13px] font-extrabold tracking-wide text-espresso uppercase transition-all duration-300 hover:bg-saffron-bright hover:shadow-[0_0_28px_rgba(233,161,59,0.5)] sm:flex"
            >
              <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Order Now
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-saffron/30 text-cream lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-b border-saffron/15 bg-espresso/95 backdrop-blur-xl lg:hidden"
            >
              <ul className="space-y-1 px-6 py-5">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ x: -18, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.06 * i }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 font-display text-xl text-cream transition-colors hover:text-saffron"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <li className="pt-3">
                  <a
                    href="#order"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-extrabold tracking-wide text-espresso uppercase"
                  >
                    <ShoppingBag className="h-4 w-4" /> Order Now
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
