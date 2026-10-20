"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, Soup, PartyPopper, ShoppingBag, StickyNote } from "lucide-react";
import { MEATS, SIZES, PRICE_NOTES, type MeatKey, type SizeKey } from "@/lib/biryani-data";
import { useOrderDraft } from "@/lib/order-store";

const SIZE_ICONS = { solo: Soup, family: Users, party: PartyPopper } as const;

export default function Menu() {
  const [meat, setMeat] = useState<MeatKey>("chicken");
  const [size, setSize] = useState<SizeKey>("family");

  const activeMeat = MEATS.find((m) => m.key === meat)!;
  const activeSize = SIZES.find((s) => s.key === size)!;
  const price = activeMeat.prices[size];
  const SizeIcon = SIZE_ICONS[size];

  return (
    <section id="menu" className="grain relative overflow-hidden bg-espresso py-24 md:py-32" aria-label="Menu and pricing">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-saffron/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-ember/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-xs font-extrabold tracking-[0.35em] text-saffron uppercase"
          >
            Menu &amp; Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl leading-tight font-semibold text-cream md:text-6xl"
          >
            Choose your <span className="italic text-saffron">biryani</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/60 md:text-base"
          >
            Chicken, beef, or lamb. A bowl for one or a tray to share.
            Every order includes mint chutney, raita and crispy birista onions.
          </motion.p>
        </div>

        {/* meat tabs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label="Choose your protein"
        >
          {MEATS.map((m) => (
            <button
              key={m.key}
              role="tab"
              aria-selected={meat === m.key}
              onClick={() => setMeat(m.key)}
              className={`relative rounded-full px-7 py-3.5 text-sm font-extrabold tracking-wide uppercase transition-all duration-300 ${
                meat === m.key
                  ? "text-espresso"
                  : "border border-cream/20 text-cream/70 hover:border-saffron/60 hover:text-saffron"
              }`}
            >
              {meat === m.key && (
                <motion.span
                  layoutId="meatPill"
                  className="absolute inset-0 rounded-full bg-saffron shadow-[0_0_30px_rgba(233,161,59,0.45)]"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              )}
              <span className="relative z-10">{m.label}</span>
              {m.badge && (
                <span
                  className={`relative z-10 ml-2 hidden rounded-full px-2 py-0.5 text-[9px] tracking-[0.14em] sm:inline ${
                    meat === m.key ? "bg-espresso/15 text-espresso" : "bg-saffron/15 text-saffron"
                  }`}
                >
                  {m.badge}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* main card */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* dish visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-saffron/20 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={meat}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full min-h-[320px]"
              >
                { }
                <img
                  src="/images/biryani-plate.jpg"
                  alt="A plate of biryani from our kitchen"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/biryani-plate.jpg";
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent" />
                <div className="absolute right-4 bottom-4 left-4">
                  <p className="text-[11px] font-extrabold tracking-[0.28em] text-saffron uppercase">
                    From our kitchen
                  </p>
                  <p className="mt-1 font-display text-3xl font-semibold text-cream">Made to share.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* price panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col rounded-3xl border border-saffron/20 bg-roast p-7 md:p-9"
          >
            {/* size selector */}
            <p className="text-[11px] font-extrabold tracking-[0.28em] text-cream/50 uppercase">
              Choose size
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {SIZES.map((s) => {
                const Icon = SIZE_ICONS[s.key as keyof typeof SIZE_ICONS];
                const active = size === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => setSize(s.key)}
                    aria-pressed={active}
                    className={`group relative rounded-xl border p-3.5 text-center transition-all duration-300 ${
                      active
                        ? "border-saffron bg-saffron/15 shadow-[0_0_24px_rgba(233,161,59,0.2)]"
                        : "border-cream/15 hover:border-saffron/50"
                    }`}
                  >
                    <Icon
                      className={`mx-auto h-6 w-6 transition-colors ${active ? "text-saffron" : "text-cream/50 group-hover:text-saffron/80"}`}
                    />
                    <span className={`mt-2 block text-[13px] font-bold ${active ? "text-cream" : "text-cream/60"}`}>
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-cream/45">{s.serves}</span>
                  </button>
                );
              })}
            </div>

            {/* description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={meat + size}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="mt-6 text-sm leading-relaxed text-cream/65">{activeMeat.description}</p>
                <p className="mt-3 flex items-center gap-2 text-xs text-cream/50">
                  <SizeIcon className="h-4 w-4 text-saffron" />
                  {activeSize.detail}
                </p>

                {/* price */}
                <div className="mt-7 flex items-end justify-between border-t border-saffron/15 pt-6">
                  <div>
                    <p className="text-[11px] font-extrabold tracking-[0.28em] text-cream/50 uppercase">
                      Your price
                    </p>
                    <p className="mt-1 flex items-baseline gap-1">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.3 }}
                          className="gold-gradient-text font-display text-6xl font-bold"
                        >
                          ${price.toFixed(2)}
                        </motion.span>
                      </AnimatePresence>
                    </p>
                    <p className="mt-1 text-xs text-cream/45">{activeSize.serves} · incl. sides</p>
                  </div>
                  <a
                    href="#order"
                    onClick={() => useOrderDraft.getState().setDraft(meat, size)}
                    className="group flex items-center gap-2 rounded-full bg-saffron px-6 py-3.5 text-sm font-extrabold tracking-wide text-espresso uppercase transition-all duration-300 hover:scale-105 hover:bg-saffron-bright hover:shadow-[0_0_30px_rgba(233,161,59,0.5)]"
                  >
                    <ShoppingBag className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    Order this
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* notes */}
            <ul className="mt-7 space-y-2.5">
              {PRICE_NOTES.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-xs leading-relaxed text-cream/55">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron" />
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* quick price table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-12 max-w-5xl overflow-x-auto rounded-2xl border border-saffron/15 no-scrollbar"
        >
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <caption className="sr-only">Full price list for all biryani sizes</caption>
            <thead>
              <tr className="bg-saffron/15 text-[11px] tracking-[0.2em] text-saffron uppercase">
                <th scope="col" className="px-3 py-3.5 font-extrabold first:pl-5 md:px-5">Dish</th>
                <th scope="col" className="px-3 py-3.5 text-center font-extrabold md:px-5">Solo · 1</th>
                <th scope="col" className="px-3 py-3.5 text-center font-extrabold md:px-5">Family · 4–6</th>
                <th scope="col" className="px-3 py-3.5 text-center font-extrabold last:pr-5 md:px-5">Party · 10–12</th>
              </tr>
            </thead>
            <tbody>
              {MEATS.map((m, i) => (
                <motion.tr
                  key={m.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border-t border-saffron/10 bg-roast/60 transition-colors hover:bg-saffron/10"
                >
                  <th scope="row" className="px-3 py-4 font-display text-base font-semibold text-cream first:pl-5 md:px-5">
                    {m.label}
                  </th>
                  <td className="px-3 py-4 text-center font-semibold text-cream/80 md:px-5">${m.prices.solo.toFixed(2)}</td>
                  <td className="px-3 py-4 text-center font-semibold text-cream/80 md:px-5">${m.prices.family.toFixed(2)}</td>
                  <td className="px-3 py-4 text-center font-semibold text-cream/80 last:pr-5 md:px-5">${m.prices.party.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-cream/45"
        >
          <StickyNote className="h-4 w-4 shrink-0 text-saffron/70" />
          Bulk orders of 3+ trays get 10% off — ask when you order.
        </motion.p>
      </div>
    </section>
  );
}
