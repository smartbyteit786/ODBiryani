"use client";


import { Heart } from "lucide-react";
import { OrderStatusLink } from "@/components/biryani/order-status-card";


export default function Footer() {

  return (
    <footer className="relative overflow-hidden border-t border-saffron/15 bg-[#0d0804] pb-8 pt-16 text-cream">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-saffron/8 blur-[100px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-saffron/50 bg-roast">
                <svg viewBox="0 0 48 48" className="h-6 w-6 text-saffron" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M8 22h32c0 9.5-6 17-16 17S8 31.5 8 22Z" />
                  <path d="M14 14c2-2 2-4 0-6M24 12c2-2 2-4 0-6M34 14c2-2 2-4 0-6" />
                </svg>
              </span>
              <div>
                <p className="font-display text-2xl font-semibold tracking-[0.12em]">ODB</p>
                <p className="text-[10px] font-extrabold tracking-[0.14em] text-saffron uppercase">
                  One Dish Biryani
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
              Clean, fresh, home-cooked chicken biryani. Prepared with care for
              family meals and time together.
            </p>

          </div>

          {/* quick links */}
          <nav aria-label="Footer">
            <h3 className="font-display text-base font-semibold text-saffron">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/60">
              {[
                ["#order", "Plan Your Meal"],
                ["#gallery", "Our Kitchen"],
                ["#reviews", "Reviews"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-saffron">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="font-display text-base font-semibold text-saffron">Planning a meal?</h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">Pickup available with no delivery charge. Delivery within 5 miles costs extra based on your route. Pay with Zelle, Apple Cash, or Cash App after we confirm your total privately. A 50% booking deposit secures your order; the rest is due at pickup or delivery. </p>
            <a href="#order" className="mt-4 inline-block rounded-full bg-saffron px-6 py-3 text-sm font-bold text-espresso">Order</a>
            <OrderStatusLink />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/40 md:flex-row">
          <p>© {new Date().getFullYear()} One Dish Biryani. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Cooked with <Heart className="h-3.5 w-3.5 fill-ember text-ember" /> in one pot, always.
          </p>
        </div>
      </div>
    </footer>
  );
}
