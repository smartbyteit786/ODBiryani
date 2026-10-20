"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand, BadgeCheck } from "lucide-react";

const PHOTOS = [
  {
    src: "/images/biryani-plate.jpg",
    caption: "Tonight's pot, plated",
    tag: "The Table",
    real: true,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/pot-fresh.jpg",
    caption: "Lid off. Steam on.",
    tag: "Straight From The Pot",
    real: true,
    span: "md:row-span-1",
  },
  {
    src: "/images/feast-table.jpg",
    caption: "A meal to share",
    tag: "The Feast",
    real: true,
    span: "",
  },
  {
    src: "/images/curry-pot.jpg",
    caption: "The masala base, simmering",
    tag: "Behind The Pot",
    real: true,
    span: "",
  },
  {
    src: "/images/pot-prep.jpg",
    caption: "Getting ready to cook",
    tag: "Behind The Pot",
    real: true,
    span: "md:col-span-2",
  },
];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? null : (i + dir + PHOTOS.length) % PHOTOS.length)),
    []
  );

  return (
    <section
      id="gallery"
      className="relative bg-cream py-24 text-espresso md:py-32"
      aria-label="Photo gallery"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-3 text-xs font-extrabold tracking-[0.35em] text-ember uppercase"
            >
              <span className="h-px w-10 bg-ember" /> Gallery
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display text-4xl leading-[1.06] font-semibold md:text-6xl"
            >
              A look inside <span className="italic text-ember">our kitchen.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 text-xs font-bold tracking-wide text-espresso/60"
          >
            <BadgeCheck className="h-4 w-4 text-leaf" />
            Photos from our kitchen
          </motion.p>
        </div>

        <div className="mt-12 grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:[grid-auto-flow:dense]">
          {PHOTOS.map((p, i) => (
            <motion.button
              key={p.src + i}
              initial={{ opacity: 0, y: 34, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.07 }}
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden rounded-2xl text-left shadow-[0_14px_40px_rgba(20,13,7,0.14)] focus:outline-2 focus:outline-offset-2 focus:outline-ember ${p.span}`}
              aria-label={`Open photo: ${p.caption}`}
            >
              { }
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] font-extrabold tracking-[0.22em] text-saffron uppercase">{p.tag}</p>
                <p className="mt-0.5 font-display text-lg text-cream italic">{p.caption}</p>
              </div>
              <span className="absolute top-3 right-3 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-cream/90 text-espresso opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
              {p.real && (
                <span className="absolute top-3 left-3 rounded-full bg-leaf px-2.5 py-1 text-[9px] font-extrabold tracking-[0.16em] text-cream uppercase shadow-md">
                  Real Kitchen
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso/95 p-4 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <button
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-saffron hover:text-saffron"
              onClick={close}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-saffron hover:text-saffron md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-saffron hover:text-saffron md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[82vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              { }
              <img
                src={PHOTOS[index].src}
                alt={PHOTOS[index].caption}
                className="max-h-[72vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-center">
                <p className="text-[10px] font-extrabold tracking-[0.25em] text-saffron uppercase">
                  {PHOTOS[index].tag}
                </p>
                <p className="mt-1 font-display text-xl text-cream italic">{PHOTOS[index].caption}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
