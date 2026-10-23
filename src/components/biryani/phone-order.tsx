"use client";

import { useSyncExternalStore, useState, useRef, type FormEvent } from "react";
import { Check, CheckCircle2, ShoppingBag, Truck, LockKeyhole } from "lucide-react";
import { MEAL_PACKAGES, DELIVERY_RADIUS_MILES, getFoodPrice } from "@/lib/meal-pricing";
import { getOrderPhoneHref, getLocalDateMinimum, getBookingDeposit } from "@/lib/order-contact";

const subscribeToLocalDay = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 60000);
  window.addEventListener("focus", onChange);
  return () => { window.clearInterval(timer); window.removeEventListener("focus", onChange); };
};
const getBrowserSettings = () => getLocalDateMinimum();
const getServerSettings = () => "";

export default function PhoneOrder() {
  const [people, setPeople] = useState("");
  const [chickenCut, setChickenCut] = useState<"" | "bone-in" | "boneless">("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const count = Number(people);
  const foodPrice = getFoodPrice(count);
  const quantityValid = Number.isSafeInteger(count) && count >= 4;
  const [requestedDate, setRequestedDate] = useState("");
  const [requestedTime, setRequestedTime] = useState("");
  const minimumDate = useSyncExternalStore(subscribeToLocalDay, getBrowserSettings, getServerSettings);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const sending = useRef(false);
  const planner = useRef<HTMLFormElement | null>(null);
  const dateValid = !!requestedDate && requestedDate >= getLocalDateMinimum();
  const ready = quantityValid && !!chickenCut && dateValid && !!requestedTime;
  const money = (amount: number) => amount.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: amount % 1 ? 2 : 0 });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const phone = form.elements.namedItem("customerPhone") as HTMLInputElement;
    phone.setCustomValidity(getOrderPhoneHref(phone.value) ? "" : "Enter a valid phone number for your order.");
    if (!form.reportValidity() || !ready) return;
    sending.current = true;
    setStatus("sending"); setError("");
    const id = reference || crypto.randomUUID();
    setReference(id);
    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form)) body.set(key, String(value).trim());
    body.set("email", body.get("customerEmail") || "");
    body.set("reference", id);
    body.set("meat", "chicken");
    body.set("foodSubtotal", foodPrice === null ? "Quote needed" : String(foodPrice));
    body.set("deliveryFee", fulfillment === "pickup" ? "0" : "Route quote needed");
    body.set("depositPercent", "50");
    try {
      const response = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString(), signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error("Receipt not confirmed");
      form.reset(); setPeople(""); setChickenCut(""); setRequestedDate(""); setRequestedTime(""); setFulfillment("pickup");
      setStatus("success");
      requestAnimationFrame(() => document.getElementById("order-receipt")?.focus());
    } catch { setStatus("error"); setError("We couldn’t confirm receipt. Your details are still here. Please check your connection before trying again; your request may already have arrived."); }
    finally { sending.current = false; }
  }

  if (status === "success") return <section id="order" className="scroll-mt-24 bg-cream px-5 py-20 text-espresso"><div id="order-receipt" role="status" tabIndex={-1} className="mx-auto max-w-xl rounded-3xl border border-espresso/10 bg-white p-8 text-center outline-none"><CheckCircle2 className="mx-auto mb-5 h-12 w-12 text-leaf" aria-hidden="true" /><h2 className="font-display text-4xl font-semibold">Your request is on its way.</h2><p className="mt-4 leading-relaxed text-espresso/70">We’ve received your request for checking. We’ll reply using the contact details you provided to confirm availability, the final price and your 50% deposit. Please wait for confirmation before paying.</p><p className="mt-4 break-all text-xs text-espresso/60">Request reference: {reference}</p><button type="button" onClick={() => { setStatus("idle"); setReference(""); }} className="mt-6 min-h-12 rounded-full bg-ember px-6 py-3 font-bold text-white">Plan another meal</button></div></section>;

  return (
    <section id="order" className="scroll-mt-24 bg-cream px-5 py-16 text-espresso md:py-24" aria-labelledby="order-heading">
      <div className="mx-auto max-w-3xl">
        <header className="mb-9 text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-ember uppercase">A good meal starts here</p>
          <h2 id="order-heading" className="font-display text-4xl font-semibold leading-tight md:text-5xl">A good meal starts here.</h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-espresso/70">Home-cooked chicken biryani for 4 people or more. Plan your meal below. We’ll get back to you to confirm the details.</p>
        </header>

        <form ref={planner} name="odb-order-request" action="/__forms.html" method="POST" onSubmit={submit} className="space-y-9 rounded-3xl border border-espresso/10 bg-parchment p-5 shadow-[0_16px_50px_rgba(20,13,7,0.06)] sm:p-9">
          <input type="hidden" name="form-name" value="odb-order-request" />
          <div hidden aria-hidden="true"><label htmlFor="order-bot">Leave this empty</label><input id="order-bot" name="order-bot" tabIndex={-1} autoComplete="off" /></div>
          <fieldset className="space-y-4">
            <legend className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-sm text-cream">1</span>How many people?</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Choose your meal size and food price">
              {MEAL_PACKAGES.map((meal) => <button key={meal.people} type="button" aria-pressed={people === String(meal.people)} onClick={() => setPeople(String(meal.people))} className={`min-h-24 rounded-xl border px-4 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember ${people === String(meal.people) ? "border-espresso bg-espresso text-cream" : "border-espresso/20 bg-white hover:border-ember"}`}><span className="block text-sm font-semibold">{meal.people} people</span><span className="mt-2 block font-display text-3xl font-semibold">${meal.price}</span></button>)}
            </div>
            <div className="max-w-xs">
              <label htmlFor="people" className="mb-2 block text-sm font-semibold">Number of people <span className="font-normal text-espresso/60">(or enter another size)</span></label>
              <input id="people" name="people" type="number" inputMode="numeric" min={4} step={1} required placeholder="4 or more" value={people} onChange={(event) => setPeople(event.target.value)} aria-describedby="minimum-order" aria-invalid={!!people && !quantityValid} className="w-full rounded-xl border border-espresso/20 bg-white px-4 py-3.5 text-base outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20" />
              <p id="minimum-order" className={`mt-2 text-sm ${people && !quantityValid ? "font-semibold text-ember" : "text-espresso/65"}`}>Minimum order: 4 people. Please use a whole number.</p>
            </div>
          </fieldset>

          <div>
            <h3 className="mb-4 font-display text-2xl font-semibold">Your biryani</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border-2 border-ember bg-white px-4 py-4"><div className="flex items-center justify-between gap-2"><span className="text-lg font-bold">Chicken</span><Check className="h-5 w-5 text-ember" aria-hidden="true" /></div><p className="mt-2 text-sm font-semibold text-leaf">Available now</p></div>
              {["Beef", "Lamb"].map((label) => <button key={label} type="button" disabled className="cursor-not-allowed rounded-xl border border-espresso/15 bg-espresso/[0.035] px-4 py-4 text-left"><span className="block text-lg font-bold text-espresso/60">{label}</span><span className="mt-2 block text-sm font-semibold text-espresso/65">Coming soon</span></button>)}
            </div>
          </div>

          <fieldset aria-describedby="chicken-cut-help">
            <legend className="mb-4 font-display text-2xl font-semibold">How would you like your chicken?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {([
                { value: "bone-in", label: "Bone-in", detail: "Chicken pieces with the bone" },
                { value: "boneless", label: "Boneless", detail: "Chicken pieces with the bone removed" },
              ] as const).map((cut) => <label key={cut.value} className="relative cursor-pointer">
                <input type="radio" name="chickenCut" value={cut.value} required checked={chickenCut === cut.value} onChange={() => setChickenCut(cut.value)} className="peer sr-only" />
                <span className="flex min-h-24 items-center justify-between gap-3 rounded-xl border border-espresso/20 bg-white p-4 transition peer-checked:border-ember peer-checked:bg-ember/5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember"><span><span className="block text-lg font-bold">{cut.label}</span><span className="mt-1 block text-sm text-espresso/70">{cut.detail}</span></span><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${chickenCut === cut.value ? "border-ember bg-ember text-white" : "border-espresso/25"}`} aria-hidden="true">{chickenCut === cut.value && <Check className="h-4 w-4" />}</span></span>
              </label>)}
            </div>
            <p id="chicken-cut-help" className="mt-3 text-sm leading-relaxed text-espresso/70">Choose one. We’ll confirm the price for your selected cut privately before payment.</p>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-sm text-cream">2</span>When do you need it?</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="min-w-0"><label htmlFor="requested-date" className="mb-2 block text-sm font-semibold">Requested date</label><input id="requested-date" name="requestedDate" type="date" required min={minimumDate || undefined} value={requestedDate} onChange={(event) => setRequestedDate(event.target.value)} aria-describedby="date-help" className="min-h-14 w-full min-w-0 max-w-full rounded-xl border border-espresso/20 bg-white px-3 py-3 text-base focus:outline-2 focus:outline-ember" /></div>
              <div className="min-w-0"><label htmlFor="requested-time" className="mb-2 block text-sm font-semibold">Preferred time</label><input id="requested-time" name="requestedTime" type="time" required value={requestedTime} onChange={(event) => setRequestedTime(event.target.value)} aria-describedby="date-help" className="min-h-14 w-full min-w-0 max-w-full rounded-xl border border-espresso/20 bg-white px-3 py-3 text-base focus:outline-2 focus:outline-ember" /></div>
            </div>
            <p id="date-help" className="text-sm leading-relaxed text-espresso/70">Choose your local date and time. This is a request, not a reservation. We’ll confirm availability privately.</p>
          </fieldset>

          <fieldset>
            <legend className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-sm text-cream">3</span>Pickup or delivery?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {([
                { key: "pickup", label: "Pickup", detail: "No delivery charge", icon: ShoppingBag },
                { key: "delivery", label: "Delivery", detail: `Within ${DELIVERY_RADIUS_MILES} miles · extra charge`, icon: Truck },
              ] as const).map((option) => <label key={option.key} className="relative cursor-pointer">
                <input type="radio" name="fulfillment" value={option.key} checked={fulfillment === option.key} onChange={() => setFulfillment(option.key)} className="peer sr-only" />
                <span className="flex min-h-24 items-center gap-3 rounded-xl border border-espresso/20 bg-white p-4 transition peer-checked:border-ember peer-checked:bg-ember/5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember hover:border-ember"><option.icon className="h-6 w-6 shrink-0 text-ember" aria-hidden="true" /><span><span className="block text-lg font-bold">{option.label}</span><span className="mt-1 block text-sm text-espresso/70">{option.detail}</span></span><span className={`ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${fulfillment === option.key ? "border-ember bg-ember text-white" : "border-espresso/25"}`} aria-hidden="true">{fulfillment === option.key && <Check className="h-4 w-4" />}</span></span>
              </label>)}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-espresso/70" aria-live="polite">{fulfillment === "pickup" ? "We’ll share the pickup location and confirm a time privately after your order is confirmed. There is no delivery charge for pickup." : `We deliver within ${DELIVERY_RADIUS_MILES} miles of our kitchen. The extra charge depends on your address and delivery route. We’ll confirm the charge before you place your order.`}</p>
            {fulfillment === "delivery" && <div className="mt-4"><label htmlFor="order-address" className="mb-2 block text-sm font-semibold">Delivery address</label><textarea id="order-address" name="deliveryAddress" autoComplete="street-address" required minLength={12} maxLength={300} rows={3} placeholder="Street, apartment or unit, city, state and ZIP" className="w-full rounded-xl border border-espresso/20 bg-white px-4 py-3 text-base focus:outline-2 focus:outline-ember" /><p className="mt-2 text-xs leading-relaxed text-espresso/65">We’ll check your address and confirm the delivery charge before payment.</p></div>}
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-sm text-cream">4</span>How can we reach you?</legend>
            <div><label htmlFor="order-name" className="mb-2 block text-sm font-semibold">Your name</label><input id="order-name" name="customerName" autoComplete="name" required minLength={2} maxLength={80} className="w-full rounded-xl border border-espresso/20 bg-white px-4 py-3 text-base focus:outline-2 focus:outline-ember" /></div>
            <div><label htmlFor="order-email" className="mb-2 block text-sm font-semibold">Your email</label><input id="order-email" name="customerEmail" type="email" autoComplete="email" required maxLength={150} className="w-full rounded-xl border border-espresso/20 bg-white px-4 py-3 text-base focus:outline-2 focus:outline-ember" /></div>
            <div><label htmlFor="order-phone" className="mb-2 block text-sm font-semibold">Your phone number</label><input id="order-phone" name="customerPhone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} onInput={event => event.currentTarget.setCustomValidity("")} className="w-full rounded-xl border border-espresso/20 bg-white px-4 py-3 text-base focus:outline-2 focus:outline-ember" /></div>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-espresso/65"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Your details are shared privately with ODB through Netlify to handle this request. They won’t appear on the website.</p>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-espresso/75"><input type="checkbox" name="contactConsent" value="yes" required className="mt-1 h-5 w-5 shrink-0 accent-ember" /><span>I agree that ODB may contact me about this order request using these details.</span></label>
          </fieldset>

          <div>
            <h3 className="font-display text-2xl font-semibold">Ways to pay</h3>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Accepted payment methods">{["Zelle", "Apple Cash", "Cash App"].map((method) => <li key={method} className="rounded-full border border-espresso/15 bg-white px-4 py-2.5 text-sm font-semibold">{method}</li>)}</ul>
            <p className="mt-3 text-sm leading-relaxed text-espresso/70">We&apos;ll confirm your total and share payment details privately privately. A 50% booking deposit is required to secure your confirmed order. The remaining 50% is due at pickup or delivery. Please wait for our confirmation before paying.</p>
          </div>

          <div className="border-t border-espresso/15 pt-6">
            <div className="space-y-3" aria-live="polite" aria-atomic="true">
              <div className="flex items-center justify-between gap-4 text-base font-semibold"><span>Listed meal price</span><span>{foodPrice === null ? "Confirm privately" : `$${foodPrice}`}</span></div>
              <div className="flex items-center justify-between gap-4 text-sm text-espresso/70"><span>Chicken cut</span><span>{chickenCut === "bone-in" ? "Bone-in" : chickenCut === "boneless" ? "Boneless" : "Choose above"}</span></div>
              <div className="flex items-center justify-between gap-4 text-sm text-espresso/70"><span>{fulfillment === "pickup" ? "Pickup" : "Delivery charge"}</span><span className="text-right">{fulfillment === "pickup" ? "No delivery charge" : "Extra · confirmed by route"}</span></div>
              <div className="flex items-center justify-between gap-4 text-sm font-semibold"><span>50% booking deposit</span><span className="text-right">{foodPrice === null ? "After quote" : fulfillment === "delivery" ? "After final total" : `${money(getBookingDeposit(foodPrice))} on meal price`}</span></div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-espresso/65">{people && quantityValid && foodPrice === null ? "For this group size, we’ll quote your meal privately. " : ""}The amounts shown use our listed meal prices. We’ll confirm the price for your selected cut, any delivery charge, and your 50% deposit privately before payment.</p>
            {status === "error" && <p role="alert" className="mt-4 rounded-xl border border-ember/25 bg-ember/5 p-4 text-sm text-ember">{error}</p>}
            <button type="submit" disabled={status === "sending"} className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-ember px-6 py-4 text-base font-bold text-white transition hover:bg-[#a94025] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"><ShoppingBag className="h-5 w-5" aria-hidden="true" />{status === "sending" ? "Sending your request…" : "Order"}</button>
            <p className="mt-3 text-sm leading-relaxed text-espresso/65">This sends a request, not a confirmed booking. Please wait for our reply before paying your deposit.</p>
          </div>
        </form>
        <div className="mt-9 rounded-2xl border border-espresso/10 bg-white/60 p-6">
          <h3 className="font-display text-2xl font-semibold">How to order</h3>
          <ol className="mt-4 grid gap-4 text-sm leading-relaxed text-espresso/75 sm:grid-cols-3">
            <li><span className="mb-1 block font-bold text-espresso">1. Plan your meal</span>Choose your meal size, requested date and time, then pickup or delivery.</li>
            <li><span className="mb-1 block font-bold text-espresso">2. Send your request</span>Send your request. We’ll confirm availability, your total, and any delivery charge.</li>
            <li><span className="mb-1 block font-bold text-espresso">3. Confirm your booking</span>Pay the 50% deposit after confirmation. Pay the rest at pickup or delivery using the details we share privately.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
