"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          {/* steam puffs */}
          <div className="relative">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="steam-puff absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 rounded-full bg-cream/25 blur-xl"
                style={{ animationDelay: `${i * 1.1}s`, marginLeft: `${(i - 1) * 14}px` }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "backOut" }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full border border-saffron/40 bg-roast"
            >
              <motion.svg
                viewBox="0 0 48 48"
                className="h-12 w-12 text-saffron"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <motion.path
                  d="M8 22h32c0 9.5-6 17-16 17S8 31.5 8 22Z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                />
                <motion.path
                  d="M14 14c2-2 2-4 0-6M24 12c2-2 2-4 0-6M34 14c2-2 2-4 0-6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
              </motion.svg>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 font-display text-2xl tracking-[0.35em] text-cream uppercase"
          >
            One Dish
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-2 text-xs tracking-[0.5em] text-saffron uppercase"
          >
            Biryani
          </motion.p>

          <motion.div
            className="mt-8 h-px w-40 origin-left bg-gradient-to-r from-transparent via-saffron to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
