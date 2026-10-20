"use client";

import { Sparkle } from "lucide-react";

const ITEMS = [
  "100% Olive Oil",
  "Real Saffron Color",
  "Made to Share",
  "Fresh Ground Spices",
  "No Artificial Colors",
  "Chicken, Beef & Lamb",
  "Slow Cooked",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative z-20 -rotate-1 overflow-hidden border-y border-espresso/20 bg-saffron py-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-lg font-semibold tracking-wide text-espresso italic md:text-xl">
              {item}
            </span>
            <Sparkle className="h-4 w-4 shrink-0 text-espresso/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
