export default function Welcome() {
  return (
    <section id="top" className="relative isolate flex min-h-[78svh] items-center overflow-hidden bg-espresso px-5 pt-32 pb-16 text-cream md:min-h-[80svh]" aria-labelledby="welcome-heading">
      <img src="/images/pot-fresh.jpg" alt="Home-cooked biryani from the ODB kitchen" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/95 via-espresso/80 to-espresso/40" />
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-5 text-xs font-bold tracking-[0.18em] text-saffron uppercase">Home-cooked · Clean · Fresh</p>
        <h1 id="welcome-heading" className="max-w-3xl font-display text-[clamp(2.4rem,7.5vw,5.5rem)] leading-[1.08] font-semibold">Welcome to ODB.<br /><span className="italic text-saffron">Make yourself at home.</span></h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/85 md:text-lg">Fresh, home-cooked chicken biryani, prepared with care. For family dinners and a table full of friends.</p>
        <a href="#order" className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-saffron px-8 py-4 text-base font-bold text-espresso transition hover:bg-saffron-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron">Let&apos;s plan your meal</a>
        <p className="mt-4 text-sm text-cream/80">For 4 people or more. Beef and lamb coming soon.</p>
      </div>
    </section>
  );
}
