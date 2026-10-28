"use client";

import { useState, useCallback, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
    largeWidth: 1152,
    caption: "A meal to share",
    tag: "The Feast",
    real: true,
    span: "",
  },
  {
    src: "/images/curry-pot.jpg",
    largeWidth: 960,
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
  const opener = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? null : (i + dir + PHOTOS.length) % PHOTOS.length)),
    []
  );

  return (
    <Dialog.Root open={index !== null} onOpenChange={(open) => { if (!open) close(); }}>
    <section
      id="gallery"
      className="relative scroll-mt-24 bg-cream py-24 text-espresso md:py-32"
      aria-label="Photo gallery"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p
              className="mb-4 flex items-center gap-3 text-xs font-extrabold tracking-[0.35em] text-ember uppercase"
            >
              <span className="h-px w-10 bg-ember" /> Gallery
            </p>
            <h2
              className="font-display text-4xl leading-[1.06] font-semibold md:text-6xl"
            >
              A look inside <span className="italic text-ember">our kitchen.</span>
            </h2>
          </div>
          <p
            className="flex items-center gap-2 text-xs font-bold tracking-wide text-espresso/60"
          >
            <BadgeCheck className="h-4 w-4 text-leaf" />
            Photos from our kitchen
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:[grid-auto-flow:dense]">
          {PHOTOS.map((p, i) => (
            <button
              key={p.src + i}
              onClick={(event) => { opener.current = event.currentTarget; setIndex(i); }}
              className={`group relative overflow-hidden rounded-2xl text-left shadow-[0_14px_40px_rgba(20,13,7,0.14)] focus:outline-2 focus:outline-offset-2 focus:outline-ember ${p.span}`}
              aria-label={`Open photo: ${p.caption}`}
            >
              { }
              <img
                src={p.src.replace(".jpg", "-640.webp").replace("/images/", "/images/optimized/")}
                srcSet={`${p.src.replace(".jpg", "-640.webp").replace("/images/", "/images/optimized/")} 640w, ${p.src.replace(".jpg", "-1280.webp").replace("/images/", "/images/optimized/")} ${p.largeWidth ?? 1280}w`}
                sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 640px"
                decoding="async"
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-200 motion-safe:md:group-hover:scale-105"
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
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog.Portal>
        {index !== null && (
          <>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-espresso" />
          <Dialog.Content
            className="fixed inset-0 z-[91] flex items-center justify-center p-4 outline-none"
            onCloseAutoFocus={(event) => { event.preventDefault(); opener.current?.focus(); }}
            onClick={(event) => { if (event.target === event.currentTarget) close(); }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
              if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
            }}
          >
            <Dialog.Title className="sr-only">Photo lightbox</Dialog.Title>
            <Dialog.Description className="sr-only">{PHOTOS[index].caption}. Use the arrow keys to change photos and Escape to close.</Dialog.Description>
            <Dialog.Close asChild>
            <button
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-saffron hover:text-saffron"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            </Dialog.Close>
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

            <figure
              key={index}
              className="max-h-[82vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              { }
              <img
                src={PHOTOS[index].src.replace(".jpg", "-1280.webp").replace("/images/", "/images/optimized/")}
                decoding="async"
                alt={PHOTOS[index].caption}
                className="max-h-[72vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-center">
                <p className="text-[10px] font-extrabold tracking-[0.25em] text-saffron uppercase">
                  {PHOTOS[index].tag}
                </p>
                <p className="mt-1 font-display text-xl text-cream italic">{PHOTOS[index].caption}</p>
              </figcaption>
            </figure>
          </Dialog.Content>
          </>
        )}
      </Dialog.Portal>
    </section>
    </Dialog.Root>
  );
}
