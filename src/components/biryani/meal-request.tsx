"use client";

import { useState } from "react";
import { Check, CheckCircle2, Loader2, ArrowRight, Users } from "lucide-react";

const PEOPLE = [4, 6, 10, 15, 20];
const inputClass = "w-full rounded-xl border border-espresso/20 bg-white px-4 py-3.5 text-base text-espresso outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20";

export default function MealRequest() {
  const [people, setPeople] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const count = Number(people);
    if (!Number.isSafeInteger(count) || count < 4) {
      setError("Our minimum order is for 4 people. Please enter a whole number of 4 or more.");
      return;
    }
    if (name.trim().length < 2 || phone.trim().length < 7) {
      setError("Please add your name and a phone number so we can contact you.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const reference = crypto.randomUUID();
      const form = new FormData(event.currentTarget);
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "biryani-order",
          "bot-field": String(form.get("bot-field") || ""),
          reference,
          people: String(count),
          meat: "chicken",
          name: name.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
        }).toString(),
      });
      if (!response.ok) throw new Error("Request failed");
      setConfirmed(reference);
    } catch {
      setError("Your request was not sent. Your details are still here. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="order" className="scroll-mt-24 bg-cream px-5 py-16 text-espresso md:py-24" aria-labelledby="order-heading">
      <div className="mx-auto max-w-3xl">
        <div className="mb-9 text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-ember uppercase">A good meal starts here</p>
          <h2 id="order-heading" className="font-display text-4xl font-semibold leading-tight md:text-5xl">Who are we cooking for?</h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-espresso/70">Tell us how many people are coming. We cook for groups of 4 or more.</p>
        </div>

        <div className="rounded-3xl border border-espresso/10 bg-parchment p-5 shadow-[0_16px_50px_rgba(20,13,7,0.06)] sm:p-9">
          {confirmed ? (
            <div role="status" className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-leaf" aria-hidden="true" />
              <h3 className="mt-5 font-display text-3xl font-semibold">Thank you, {name.trim().split(/\s+/)[0]}.</h3>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-espresso/75">We received your request for chicken biryani for {people} people. We&apos;ll contact you to confirm the price, timing, and details before your order is booked.</p>
              <p className="mt-4 text-sm text-espresso/60">Request reference: <span className="font-mono font-bold">{confirmed.slice(-6).toUpperCase()}</span></p>
              <button type="button" onClick={() => { setConfirmed(null); setPeople(""); setName(""); setPhone(""); setNotes(""); }} className="mt-7 min-h-12 rounded-full border border-espresso/25 px-6 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember">Plan another meal</button>
            </div>
          ) : (
            <form name="biryani-order" onSubmit={submit} className="space-y-9" aria-busy={submitting}>
              <input type="hidden" name="form-name" value="biryani-order" />
              <input type="hidden" name="meat" value="chicken" />
              <div hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
              <fieldset disabled={submitting} className="space-y-4">
                <legend className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-sm text-cream">1</span>How many people?</legend>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Quick guest counts">
                  {PEOPLE.map((count) => <button key={count} type="button" aria-pressed={people === String(count)} onClick={() => setPeople(String(count))} className={`min-h-12 min-w-14 rounded-xl border px-4 py-3 text-base font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember ${people === String(count) ? "border-espresso bg-espresso text-cream" : "border-espresso/20 bg-white hover:border-ember"}`}>{count}</button>)}
                </div>
                <div className="max-w-xs">
                  <label htmlFor="people" className="mb-2 block text-sm font-semibold">Number of people</label>
                  <div className="relative"><Users className="pointer-events-none absolute top-4 left-4 h-5 w-5 text-espresso/50" aria-hidden="true" /><input id="people" name="people" type="number" inputMode="numeric" required min={4} step={1} placeholder="4 or more" aria-describedby="minimum-order" value={people} onChange={(event) => setPeople(event.target.value)} className={`${inputClass} pl-12`} /></div>
                  <p id="minimum-order" className="mt-2 text-sm text-espresso/65">Minimum order: 4 people.</p>
                </div>
              </fieldset>

              <fieldset disabled={submitting}>
                <legend className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-sm text-cream">2</span>Your biryani</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border-2 border-ember bg-white px-4 py-4">
                    <div className="flex items-center justify-between gap-2"><span className="text-lg font-bold">Chicken</span><Check className="h-5 w-5 text-ember" aria-hidden="true" /></div>
                    <p className="mt-2 text-sm font-semibold text-leaf">Available now</p>
                    <p className="mt-1 text-sm text-espresso/65">Our home-cooked favorite.</p>
                  </div>
                  {["Beef", "Lamb"].map((label) => <button key={label} type="button" disabled className="cursor-not-allowed rounded-xl border border-espresso/15 bg-espresso/[0.035] px-4 py-4 text-left"><span className="block text-lg font-bold text-espresso/60">{label}</span><span className="mt-2 block text-sm font-semibold text-espresso/65">Coming soon</span></button>)}
                </div>
              </fieldset>

              <fieldset disabled={submitting}>
                <legend className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-sm text-cream">3</span>How can we reach you?</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="customer-name" className="mb-2 block text-sm font-semibold">Your name</label><input id="customer-name" name="name" autoComplete="name" required minLength={2} maxLength={80} value={name} onChange={(event) => setName(event.target.value)} className={inputClass} /></div>
                  <div><label htmlFor="customer-phone" className="mb-2 block text-sm font-semibold">Phone number</label><input id="customer-phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={24} value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} /></div>
                </div>
                <details className="mt-5"><summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold underline decoration-espresso/30 underline-offset-4">Add a date, spice preference, or other notes</summary><label htmlFor="meal-notes" className="mb-2 block text-sm text-espresso/70">Anything we should know? (optional)</label><textarea id="meal-notes" name="notes" rows={3} maxLength={500} placeholder="For example: Saturday dinner, mild spice, or a food allergy." value={notes} onChange={(event) => setNotes(event.target.value)} className={inputClass} /></details>
              </fieldset>

              <div className="border-t border-espresso/15 pt-6">
                <p className="text-base font-semibold">We&apos;ll confirm your price personally.</p>
                <p className="mt-2 text-sm leading-relaxed text-espresso/65">Your quote depends on your group size and current ingredient costs. Nothing is booked until we confirm the details with you.</p>
                {error && <p role="alert" className="mt-4 rounded-xl border border-ember/30 bg-ember/10 p-4 text-sm font-semibold text-espresso">{error}</p>}
                <button type="submit" disabled={submitting} className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-ember px-6 py-4 text-base font-bold text-white transition hover:bg-[#a94025] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember disabled:cursor-wait disabled:opacity-65">
                  {submitting ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />Sending your request…</> : <>Send my meal request<ArrowRight className="h-5 w-5" aria-hidden="true" /></>}
                </button>
                <p className="mt-3 text-center text-xs leading-relaxed text-espresso/60">We use your details to respond to your meal request.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
