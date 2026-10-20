"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Flame, Leaf } from "lucide-react";

const HEADLINE = ["Good food.", "A full table.", "Biryani to share."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label="One Dish Biryani hero"
    >
      {/* Background image with Ken Burns + parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="animate-kenburns absolute inset-0">
          { }
          <img
            src="/images/pot-fresh.jpg"
            alt="Biryani from our kitchen"
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/pot-fresh.jpg";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/45 to-espresso" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(20,13,7,0.72)_100%)]" />
      </motion.div>

      {/* steam puffs rising */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] z-[5] flex justify-center" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="steam-puff absolute h-16 w-16 rounded-full bg-cream/20 blur-2xl"
            style={{
              animationDelay: `${i * 1.35}s`,
              marginLeft: `${(i - 2) * 70}px`,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 px-5 pt-24 pb-16 text-center">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-saffron/35 bg-espresso/50 px-5 py-2 backdrop-blur-md"
        >
          <Flame className="h-4 w-4 text-saffron" />
          <span className="text-[11px] font-bold tracking-[0.3em] text-cream/90 uppercase">
            Homemade · Slow cooked · Made to share
          </span>
        </motion.div>

        {/* staggered headline */}
        <h1 className="font-display text-[clamp(2.9rem,10vw,8rem)] leading-[0.98] font-semibold text-cream">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={`inline-block ${i === 2 ? "italic text-saffron" : ""}`}
                initial={{ y: "110%", rotate: 4 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 0.15 + i * 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg"
        >
          Tender meat, fragrant rice, and warm spices, cooked together in one pot.
          Choose a bowl for yourself or a tray for the people you love.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#menu"
            className="group relative overflow-hidden rounded-full bg-saffron px-8 py-4 text-sm font-extrabold tracking-widest text-espresso uppercase transition-transform duration-300 hover:scale-[1.04]"
          >
            <span className="relative z-10">See the menu</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#story"
            className="group flex items-center gap-3 rounded-full border border-cream/30 px-8 py-4 text-sm font-bold tracking-widest text-cream uppercase backdrop-blur-sm transition-all duration-300 hover:border-saffron hover:text-saffron"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-espresso transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3 fill-current"><path d="M2 1.5v9l8-4.5-8-4.5Z" /></svg>
            </span>
            Meet our kitchen
          </a>
        </motion.div>

        {/* healthy badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-saffron/90 uppercase"
        >
          <Leaf className="h-4 w-4" />
          Olive oil · Real saffron · Whole spices
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-cream/60 transition-colors hover:text-saffron"
        aria-label="Scroll to story"
      >
        <ChevronDown className="animate-scroll-cue h-7 w-7" />
      </motion.a>

      {/* rotating seal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="animate-floaty absolute top-24 right-8 z-10 hidden lg:block"
        aria-hidden="true"
      >
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full">
            <defs>
              <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="fill-saffron text-[9.5px] font-bold tracking-[0.22em] uppercase">
              <textPath href="#circlePath">
                · One Pot One Dish · Cooked With Love
              </textPath>
            </text>
          </svg>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-saffron/40 bg-espresso/70 backdrop-blur-md">
            <span className="font-display text-xl text-saffron">1</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
