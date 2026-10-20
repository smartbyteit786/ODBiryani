"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I ordered the lamb family tray for Friday dinner and my father-in-law — who grew up in Lahore — said it reminded him of his mother's. Nobody talks in my house during this meal. That's the review.",
    name: "Sarah M.",
    role: "Family Tray Regular",
  },
  {
    quote:
      "The fact that it's olive oil and real saffron sold me, but the flavor kept me coming back. Three orders in two weeks. The crispy bottom layer is worth fighting your siblings for.",
    name: "Imran K.",
    role: "Chicken Biryani Devotee",
  },
  {
    quote:
      "We got the party tray for 12 people and it disappeared in minutes. Guests kept asking which restaurant we ordered from — I said, no, it's One Dish. One pot. They didn't believe me.",
    name: "Priya D.",
    role: "Party Tray Host",
  },
  {
    quote:
      "As someone who avoids heavy, greasy food, this biryani is a gift. Rich taste, zero grease, and that saffron aroma fills the entire kitchen. My weekly treat is now a standing order.",
    name: "Daniel R.",
    role: "Solo Bowl Weekly",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(t);
  }, [paused]);

  const current = TESTIMONIALS[idx];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-parchment py-24 text-espresso md:py-32"
      aria-label="Customer testimonials"
    >
      <Quote
        className="pointer-events-none absolute -top-8 left-8 h-48 w-48 text-espresso/5"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-xs font-extrabold tracking-[0.35em] text-ember uppercase"
        >
          Word Around The Pot
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-display text-4xl leading-tight font-semibold md:text-5xl"
        >
          Plates come back <span className="italic text-ember">empty. Every time.</span>
        </motion.h2>

        <div
          className="relative mt-12 min-h-[240px] md:min-h-[210px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-start"
            >
              <div className="flex gap-1 text-saffron" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </motion.span>
                ))}
              </div>
              <p className="mt-6 font-display text-xl leading-relaxed text-espresso/85 italic md:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <p className="font-display text-lg font-semibold">{current.name}</p>
                <p className="text-xs font-bold tracking-[0.2em] text-espresso/50 uppercase">{current.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            onClick={() => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/20 transition-all hover:border-ember hover:text-ember"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-400 ${
                  i === idx ? "w-8 bg-ember" : "w-2 bg-espresso/25 hover:bg-espresso/45"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/20 transition-all hover:border-ember hover:text-ember"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
