"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Soup, Users, PartyPopper, Flame, FlameKindling, CheckCircle2, Loader2, Phone, CalendarDays } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useOrderDraft } from "@/lib/order-store";
import { MEATS, type MeatKey, type SizeKey } from "@/lib/biryani-data";

const SIZE_OPTS: { key: SizeKey; label: string; serves: string; icon: typeof Soup }[] = [
  { key: "solo", label: "Solo Bowl", serves: "1", icon: Soup },
  { key: "family", label: "Family Tray", serves: "4–6", icon: Users },
  { key: "party", label: "Party Tray", serves: "10–12", icon: PartyPopper },
];

const SPICE_OPTS = [
  { key: "mild", label: "Mild", icon: Flame },
  { key: "medium", label: "Medium", icon: Flame },
  { key: "hot", label: "Hot", icon: FlameKindling },
];

export default function Order() {
  const { meat, size, setDraft } = useOrderDraft();
  const [spice, setSpice] = useState<"mild" | "medium" | "hot">("medium");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  // sync highlight pulse when menu "Order this" clicked
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const unsub = useOrderDraft.subscribe(() => {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1200);
      return () => clearTimeout(t);
    });
    return unsub;
  }, []);

  const activeMeat = MEATS.find((m) => m.key === meat)!;
  const total = activeMeat.prices[size];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const reference = crypto.randomUUID();
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "biryani-order", "bot-field": "", reference, name, phone, email, meat, size, spice, notes, estimatedTotal: total.toFixed(2) }).toString(),
      });
      if (res.ok) {
        setConfirmed(reference);
        toast({
          title: "Order received!",
          description: "We have received your request. We will contact you to confirm the details.",
        });
      } else {
        toast({
          title: "Hmm, that didn't work",
          description: "Your request was not sent. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Connection hiccup",
        description: "Couldn't reach the kitchen. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="order"
      className="grain relative overflow-hidden bg-espresso py-24 md:py-32"
      aria-label="Place an order"
    >
      {/* bg image wash */}
      <div className="absolute inset-0 opacity-[0.14]" aria-hidden="true">
        { }
        <img
          src="/images/pot-fresh.jpg"
          alt=""
          className="animate-kenburns-alt h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/pot-fresh.jpg";
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/70 to-espresso" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-xs font-extrabold tracking-[0.35em] text-saffron uppercase"
          >
            Reserve Your Pot
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl leading-tight font-semibold text-cream md:text-6xl"
          >
            Ready when <span className="gold-gradient-text italic">you are.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-cream/60 md:text-base"
          >
            Choose your biryani and portion size, then send us your details.
            Place your request below and we&apos;ll ring you to confirm timing.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-saffron/20 bg-roast/90 p-7 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-md md:p-10"
        >
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
                >
                  <CheckCircle2 className="h-20 w-20 text-leaf" />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl font-semibold text-cream">
                  Thank you for your order request.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65">
                  Thanks, <strong className="text-saffron">{name.split(" ")[0]}</strong>. Your
                  {" "}{activeMeat.label} ({SIZE_OPTS.find((s) => s.key === size)?.label}) is logged
                  with request reference <span className="font-mono text-saffron">#{confirmed.slice(-6).toUpperCase()}</span>.
                  We&apos;ll contact <strong className="text-cream">{phone}</strong> to
                  confirm your cook time and address.
                </p>
                <button
                  onClick={() => {
                    setConfirmed(null);
                    setName("");
                    setPhone("");
                    setEmail("");
                    setNotes("");
                  }}
                  className="mt-8 rounded-full border border-saffron/50 px-7 py-3 text-sm font-extrabold tracking-wide text-saffron uppercase transition-all hover:bg-saffron hover:text-espresso"
                >
                  Place another order
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="space-y-7"
              >
                {/* meat */}
                <fieldset>
                  <legend className="mb-3 text-[11px] font-extrabold tracking-[0.28em] text-cream/50 uppercase">
                    1 · Your biryani
                  </legend>
                  <div className="grid grid-cols-3 gap-2.5">
                    {MEATS.map((m) => (
                      <button
                        type="button"
                        key={m.key}
                        onClick={() => setDraft(m.key, size)}
                        aria-pressed={meat === m.key}
                        className={`rounded-xl border px-3 py-3.5 text-center transition-all duration-300 ${
                          meat === m.key
                            ? "border-saffron bg-saffron/15 shadow-[0_0_22px_rgba(233,161,59,0.22)]"
                            : "border-cream/15 hover:border-saffron/50"
                        } ${pulse && meat === m.key ? "animate-pulse" : ""}`}
                      >
                        <span className={`block text-sm font-bold ${meat === m.key ? "text-saffron" : "text-cream/70"}`}>
                          {m.label}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-cream/45">
                          from ${m.prices[size].toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* size + spice */}
                <div className="grid gap-6 md:grid-cols-2">
                  <fieldset>
                    <legend className="mb-3 text-[11px] font-extrabold tracking-[0.28em] text-cream/50 uppercase">
                      2 · Size
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {SIZE_OPTS.map((s) => {
                        const Icon = s.icon;
                        const active = size === s.key;
                        return (
                          <button
                            type="button"
                            key={s.key}
                            onClick={() => setDraft(meat, s.key)}
                            aria-pressed={active}
                            className={`rounded-xl border px-2 py-3 text-center transition-all duration-300 ${
                              active ? "border-saffron bg-saffron/15" : "border-cream/15 hover:border-saffron/50"
                            } ${pulse && active ? "animate-pulse" : ""}`}
                          >
                            <Icon className={`mx-auto h-5 w-5 ${active ? "text-saffron" : "text-cream/50"}`} />
                            <span className={`mt-1.5 block text-[11px] font-bold leading-tight ${active ? "text-cream" : "text-cream/60"}`}>
                              {s.label}
                            </span>
                            <span className="block text-[10px] text-cream/40">serves {s.serves}</span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-[11px] font-extrabold tracking-[0.28em] text-cream/50 uppercase">
                      3 · Spice level
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {SPICE_OPTS.map((s, i) => {
                        const Icon = s.icon;
                        const active = spice === s.key;
                        return (
                          <button
                            type="button"
                            key={s.key}
                            onClick={() => setSpice(s.key as typeof spice)}
                            aria-pressed={active}
                            className={`rounded-xl border px-2 py-3 text-center transition-all duration-300 ${
                              active ? "border-ember bg-ember/20" : "border-cream/15 hover:border-ember/50"
                            }`}
                          >
                            <Icon
                              className={`mx-auto h-5 w-5 ${active ? "text-ember" : "text-cream/50"}`}
                              style={{ opacity: 0.55 + i * 0.22 }}
                            />
                            <span className={`mt-1.5 block text-[11px] font-bold ${active ? "text-cream" : "text-cream/60"}`}>
                              {s.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                {/* contact */}
                <fieldset>
                  <legend className="mb-3 text-[11px] font-extrabold tracking-[0.28em] text-cream/50 uppercase">
                    4 · Your details
                  </legend>
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name *"
                      minLength={2}
                      className="rounded-xl border border-cream/15 bg-espresso/60 px-4 py-3.5 text-sm text-cream placeholder-cream/35 transition-colors focus:border-saffron focus:outline-none"
                      aria-label="Full name"
                    />
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number *"
                      type="tel"
                      minLength={7}
                      className="rounded-xl border border-cream/15 bg-espresso/60 px-4 py-3.5 text-sm text-cream placeholder-cream/35 transition-colors focus:border-saffron focus:outline-none"
                      aria-label="Phone number"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email (optional)"
                      type="email"
                      className="rounded-xl border border-cream/15 bg-espresso/60 px-4 py-3.5 text-sm text-cream placeholder-cream/35 transition-colors focus:border-saffron focus:outline-none md:col-span-1"
                      aria-label="Email address"
                    />
                    <input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Delivery address / notes (optional)"
                      maxLength={300}
                      className="rounded-xl border border-cream/15 bg-espresso/60 px-4 py-3.5 text-sm text-cream placeholder-cream/35 transition-colors focus:border-saffron focus:outline-none md:col-span-1"
                      aria-label="Delivery address or notes"
                    />
                  </div>
                </fieldset>

                {/* total + submit */}
                <div className="flex flex-col items-center justify-between gap-5 border-t border-saffron/15 pt-6 sm:flex-row">
                  <div>
                    <p className="text-[11px] font-extrabold tracking-[0.28em] text-cream/50 uppercase">
                      Estimated total
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={total}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="gold-gradient-text font-display text-4xl font-bold"
                      >
                        ${total.toFixed(2)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="animate-glow group flex w-full items-center justify-center gap-3 rounded-full bg-saffron px-9 py-4 text-sm font-extrabold tracking-widest text-espresso uppercase transition-all duration-300 hover:scale-[1.03] hover:bg-saffron-bright disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending your request...
                      </>
                    ) : (
                      <>
                        <CalendarDays className="h-5 w-5" />
                        Send order request
                      </>
                    )}
                  </button>
                </div>

                <p className="flex items-center justify-center gap-2 text-center text-xs text-cream/40">
                  <Phone className="h-3.5 w-3.5" />
                  Have a question or a special request? Add it in the notes above.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
