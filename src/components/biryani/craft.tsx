"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Droplets, Flower2, Layers, FlameKindling } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Droplets,
    title: "Start with the spices",
    body: "We start with olive oil and whole spices in a heavy pot.",
    image: "/images/pot-prep.jpg",
    fallback: "/images/pot-prep.jpg",
  },
  {
    n: "02",
    icon: Flower2,
    title: "Add the saffron",
    body: "Saffron is soaked in warm milk to bring out its color and flavor.",
    image: "/images/biryani-plate.jpg",
    fallback: "/images/pot-fresh.jpg",
  },
  {
    n: "03",
    icon: Layers,
    title: "Layer the rice and meat",
    body: "Meat, rice, onions, mint, and saffron are layered together in the pot.",
    image: "/images/feast-table.jpg",
    fallback: "/images/feast-table.jpg",
  },
  {
    n: "04",
    icon: FlameKindling,
    title: "Cover and cook slowly",
    body: "The pot is covered and cooked over low heat. The trapped steam gently cooks the rice and meat together.",
    image: "/images/pot-fresh.jpg",
    fallback: "/images/pot-fresh.jpg",
  },
];

export default function Craft() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      id="craft"
      className="grain relative bg-espresso py-24 md:py-32"
      aria-label="How our biryani is crafted"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-16 text-center md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-xs font-extrabold tracking-[0.35em] text-saffron uppercase"
          >
            How we cook
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl leading-tight font-semibold text-cream md:text-6xl"
          >
            Four steps.
            <span className="gold-gradient-text italic"> One good meal.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/60 md:text-base"
          >
            A little preparation, a little patience, and plenty of flavor.
          </motion.p>
        </div>

        <div className="relative">
          {/* progress spine */}
          <div className="absolute top-0 bottom-0 left-[26px] w-px bg-saffron/15 md:left-1/2" aria-hidden="true" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute top-0 bottom-0 left-[26px] w-px origin-top bg-gradient-to-b from-saffron-bright to-ember md:left-1/2"
            aria-hidden="true"
          />

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const left = i % 2 === 0;
              return (
                <motion.article
                  key={step.n}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex flex-col gap-6 pl-16 md:w-1/2 md:pl-0 ${
                    left ? "md:pr-14" : "md:ml-auto md:pl-14"
                  }`}
                >
                  {/* node */}
                  <span
                    className={`absolute top-6 left-[12px] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-saffron/60 bg-espresso md:left-auto ${
                      left ? "md:-right-4" : "md:-left-4"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-saffron" />
                  </span>

                  <div
                    className={`group overflow-hidden rounded-2xl border border-saffron/15 shadow-[0_24px_60px_rgba(0,0,0,0.5)] ${
                      left ? "md:text-right" : ""
                    }`}
                  >
                    <div className="relative overflow-hidden">
                      { }
                      <img
                        src={step.image}
                        alt={step.title}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = step.fallback;
                        }}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent" />
                      <span className="absolute top-3 left-4 font-display text-5xl font-bold text-cream/25">
                        {step.n}
                      </span>
                      <div
                        className={`absolute bottom-3 flex items-center gap-2 ${left ? "right-4 md:flex-row-reverse" : "left-4"}`}
                      >
                        <Icon className="h-5 w-5 text-saffron" />
                        <h3 className="font-display text-xl font-semibold text-cream md:text-2xl">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className={`bg-roast px-5 py-5 text-sm leading-relaxed text-cream/70 ${left ? "md:text-right" : ""}`}>
                      {step.body}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
