"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Youtube } from "lucide-react";
import { YOUTUBE_VIDEOS } from "@/lib/biryani-data";

const POSTERS = ["/images/hero-biryani.png", "/images/craft-layering.png", "/images/dish-chicken.png"];
const FALLBACKS = ["/images/pot-fresh.jpg", "/images/feast-table.jpg", "/images/biryani-plate.jpg"];

export default function Videos() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section
      id="videos"
      className="grain relative overflow-hidden bg-espresso py-24 md:py-32"
      aria-label="Cooking videos"
    >
      <div className="pointer-events-none absolute top-1/3 -left-48 h-[420px] w-[420px] rounded-full bg-ember/8 blur-[130px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-xs font-extrabold tracking-[0.35em] text-saffron uppercase"
          >
            Watch The Magic
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl leading-tight font-semibold text-cream md:text-6xl"
          >
            Sound on. <span className="gold-gradient-text italic">Saliva ready.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/60 md:text-base"
          >
            The sizzle of onions in olive oil. The hiss of dum steam escaping.
            These are the videos that made our neighbors knock on the door.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {YOUTUBE_VIDEOS.map((v, i) => (
            <motion.button
              key={v.id}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              whileHover={{ y: -10 }}
              onClick={() => setPlaying(v.id)}
              className="group relative overflow-hidden rounded-2xl border border-saffron/15 text-left shadow-[0_20px_60px_rgba(0,0,0,0.5)] focus:outline-2 focus:outline-offset-2 focus:outline-saffron"
              aria-label={`Play video: ${v.title}`}
            >
              <div className="relative aspect-video overflow-hidden">
                { }
                <img
                  src={POSTERS[i % POSTERS.length]}
                  alt={v.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACKS[i % FALLBACKS.length];
                  }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent" />

                {/* play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-saffron text-espresso shadow-[0_0_40px_rgba(233,161,59,0.55)] transition-transform duration-400 group-hover:scale-115">
                    <span className="absolute inset-0 animate-ping rounded-full bg-saffron/40" aria-hidden="true" />
                    <Play className="relative ml-1 h-6 w-6 fill-current" />
                  </span>
                </div>

                <span className="absolute top-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold tracking-wider text-cream uppercase backdrop-blur-sm">
                  HD
                </span>
              </div>

              <div className="bg-roast p-5">
                <p className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.25em] text-saffron uppercase">
                  <Youtube className="h-4 w-4" /> Now Playing Series
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-cream">{v.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-cream/55">{v.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-espresso/96 p-4 backdrop-blur-lg"
            onClick={() => setPlaying(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
          >
            <button
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-saffron hover:text-saffron"
              onClick={() => setPlaying(null)}
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl border border-saffron/25 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video w-full bg-black">
                {playing && (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${playing}?autoplay=1&rel=0&modestbranding=1`}
                    title="One Dish Biryani cooking video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
