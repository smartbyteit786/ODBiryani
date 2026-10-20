"use client";

import { motion } from "framer-motion";
import { Droplet, Flower2, Wheat, Sprout, Drumstick, Milk, Citrus, ShieldCheck } from "lucide-react";

const INGREDIENTS = [
  {
    icon: Droplet,
    title: "Pure Olive Oil",
    body: "Olive oil is used to cook the onions and spices.",
    accent: "from-amber-400/25 to-transparent",
    stat: "Olive oil",
  },
  {
    icon: Flower2,
    title: "Real Saffron",
    body: "Saffron adds its own color and a gentle aroma.",
    accent: "from-orange-400/25 to-transparent",
    stat: "Nature's coloring",
  },
  {
    icon: Wheat,
    title: "Aged Basmati",
    body: "Long-grain basmati rice makes the base of every biryani.",
    accent: "from-yellow-300/25 to-transparent",
    stat: "Long-grain rice",
  },
  {
    icon: Drumstick,
    title: "Your choice of meat",
    body: "Choose chicken, beef, or lamb.",
    accent: "from-red-400/25 to-transparent",
    stat: "Chicken · Beef · Lamb",
  },
  {
    icon: Sprout,
    title: "Fresh Aromatics",
    body: "Mint, cilantro, ginger, and garlic add freshness and flavor.",
    accent: "from-green-400/25 to-transparent",
    stat: "Fresh herbs",
  },
  {
    icon: Milk,
    title: "Yogurt Marinade",
    body: "Yogurt helps tenderize the meat and adds a gentle tang.",
    accent: "from-sky-200/25 to-transparent",
    stat: "24h marinade",
  },
  {
    icon: Citrus,
    title: "Whole Spices",
    body: "Cardamom, cinnamon, and cloves bring warmth to the rice.",
    accent: "from-orange-300/25 to-transparent",
    stat: "Toasted whole",
  },
  {
    icon: ShieldCheck,
    title: "Nothing Artificial",
    body: "We use saffron for color, without artificial food coloring.",
    accent: "from-emerald-300/25 to-transparent",
    stat: "No food coloring",
  },
];

export default function Ingredients() {
  return (
    <section
      id="ingredients"
      className="relative overflow-hidden bg-cream py-24 text-espresso md:py-32"
      aria-label="Our ingredients"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-3 text-xs font-extrabold tracking-[0.35em] text-ember uppercase"
            >
              <span className="h-px w-10 bg-ember" /> What&apos;s Inside
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display text-4xl leading-[1.06] font-semibold md:text-6xl"
            >
              Simple ingredients.
              <br />
              <span className="italic text-ember">Plenty of flavor.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="max-w-sm text-sm leading-relaxed text-espresso/70 lg:justify-self-end"
          >
            Rice, meat, herbs, and spices. Here is what goes into our biryani.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INGREDIENTS.map((ing, i) => {
            const Icon = ing.icon;
            return (
              <motion.article
                key={ing.title}
                initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.09 }}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                className="group relative overflow-hidden rounded-2xl border border-espresso/10 bg-white/70 p-6 shadow-[0_10px_36px_rgba(20,13,7,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(20,13,7,0.18)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${ing.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-espresso text-saffron transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mb-2 inline-block rounded-full bg-espresso/5 px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-ember uppercase">
                    {ing.stat}
                  </span>
                  <h3 className="font-display text-xl font-semibold">{ing.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-espresso/65">{ing.body}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
