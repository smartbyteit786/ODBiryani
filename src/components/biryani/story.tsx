"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { STATS } from "@/lib/biryani-data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-espresso md:text-5xl">
      {display}
      <span className="text-ember">{suffix}</span>
    </span>
  );
}

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [120, -30]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden bg-cream py-24 text-espresso md:py-36"
      aria-label="Our story"
    >
      {/* giant watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-display text-[22vw] leading-none font-bold whitespace-nowrap text-espresso/[0.045] select-none"
      >
        Our Kitchen
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-3 text-xs font-extrabold tracking-[0.35em] text-ember uppercase"
            >
              <span className="h-px w-10 bg-ember" /> Our Story
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display text-4xl leading-[1.05] font-semibold md:text-6xl"
            >
              From our one pot,
              <br />
              <span className="italic text-ember">straight to your table.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-7 space-y-5 text-[15px] leading-relaxed text-espresso/75 md:text-base"
            >
              <p>
                Good biryani brings people to the table. That is what we want to share:
                a warm meal, generous portions, and a reason to sit down together.
              </p>
              <p>
                We cook our biryani in one pot with rice, meat, whole spices,
                olive oil, and real saffron. Slow cooking gives the flavors time to come together.
              </p>
              <p>
                Whether it is dinner for one or a meal with family and friends,
                there is a bowl or tray to suit your table.
              </p>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              href="#craft"
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-espresso pb-1 font-display text-lg italic transition-colors hover:border-ember hover:text-ember"
            >
              See how we cook
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>

          {/* parallax images */}
          <div className="relative h-[480px] md:h-[560px]">
            <motion.figure
              style={{ y: yMain }}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="absolute top-0 right-0 w-[78%] overflow-hidden rounded-2xl shadow-[0_30px_70px_rgba(20,13,7,0.35)]"
            >
              <div className="animate-kenburns">
                { }
                <img
                  src="/images/pot-fresh.jpg"
                  alt="Biryani fresh out of the pot with fried onions and cilantro"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-espresso/75 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-cream uppercase backdrop-blur-sm">
                Straight off the stove
              </figcaption>
            </motion.figure>

            <motion.figure
              style={{ y: ySmall }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="absolute bottom-0 left-0 w-[52%] overflow-hidden rounded-2xl border-4 border-cream shadow-[0_24px_60px_rgba(20,13,7,0.4)]"
            >
              { }
              <img
                src="/images/biryani-plate.jpg"
                alt="Plated three-color saffron biryani served at the table"
                className="aspect-[3/4] w-full object-cover"
              />
            </motion.figure>

            <motion.div
              initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
              className="animate-floaty absolute bottom-[38%] left-[38%] rounded-xl bg-espresso px-5 py-3 text-cream shadow-xl"
            >
              <p className="font-display text-sm italic">Made for sharing.</p>
            </motion.div>
          </div>
        </div>

        {/* stats */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-espresso/10 md:mt-28 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex flex-col items-center bg-parchment px-4 py-8 text-center transition-colors duration-300 hover:bg-saffron/25"
            >
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-2 text-[13px] font-extrabold tracking-[0.14em] uppercase">{s.label}</p>
              <p className="mt-1 text-xs text-espresso/60">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
