"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, LockKeyhole, Send, Star } from "lucide-react";
import { getOrderPhoneHref } from "@/lib/order-contact";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const lock = useRef(false);
  const result = useRef<HTMLDivElement | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const phone = form.elements.namedItem("orderPhone") as HTMLInputElement;
    phone.setCustomValidity(getOrderPhoneHref(String(values.get("orderPhone") || "")) ? "" : "Enter the phone number you used for your order.");
    if (!form.reportValidity()) return;
    lock.current = true;
    setStatus("sending");
    setError("");
    const body = new URLSearchParams();
    for (const [key, value] of values.entries()) body.set(key, String(value).trim());
    body.set("submissionRef", crypto.randomUUID());
    try {
      const response = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString(), signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error("Not confirmed");
      form.reset();
      setRating(0);
      setStatus("success");
      requestAnimationFrame(() => result.current?.focus());
    } catch {
      setStatus("error");
      setError("We couldn’t confirm receipt. Your review is still here. Please check your connection or text ODB before trying again.");
    } finally { lock.current = false; }
  }

  const field = "w-full rounded-xl border border-espresso/20 bg-white px-4 py-3.5 text-base text-espresso placeholder:text-espresso/45 focus:outline-2 focus:outline-offset-2 focus:outline-ember";
  return <div className="rounded-3xl border border-espresso/10 bg-white p-5 shadow-[0_16px_50px_rgba(20,13,7,0.05)] sm:p-8">
    {status === "success" ? <div ref={result} role="status" tabIndex={-1} className="py-8 text-center outline-none">
      <CheckCircle2 className="mx-auto mb-5 h-10 w-10 text-leaf" aria-hidden="true" />
      <h3 className="font-display text-3xl font-semibold">Thank you for sharing.</h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-espresso/70">Your review was sent for checking. We’ll match it to a completed order before publishing. Your phone number stays private.</p>
      <button type="button" onClick={() => setStatus("idle")} className="mt-6 min-h-11 rounded-full border border-espresso/25 px-5 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ember">Back to review form</button>
    </div> : <>
      <h3 className="font-display text-3xl font-semibold">How was your meal?</h3>
      <p className="mt-3 text-sm leading-relaxed text-espresso/70">We’d love to hear what you enjoyed and what we could do better.</p>
      <form name="odb-customer-review" method="POST" action="/__forms.html" onSubmit={submit} className="mt-6 space-y-5">
        <input type="hidden" name="form-name" value="odb-customer-review" />
        <input type="hidden" name="submissionRef" value="" />
        <div hidden aria-hidden="true"><label htmlFor="review-bot">Leave this empty</label><input id="review-bot" name="review-bot" tabIndex={-1} autoComplete="off" /></div>
        <fieldset disabled={status === "sending"} className="space-y-5 disabled:opacity-60">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Your rating <span className="font-normal">(required)</span></legend>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map(value => <label key={value} className="cursor-pointer">
                <input type="radio" name="rating" value={value} required checked={rating === value} onChange={() => setRating(value)} className="peer sr-only" />
                <span className="flex h-12 min-w-11 items-center justify-center gap-1 rounded-xl border border-espresso/20 bg-cream px-2 text-sm font-bold transition peer-checked:border-ember peer-checked:bg-ember peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember"><span>{value}</span><Star className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">{value === 1 ? "star" : "stars"}</span></span>
              </label>)}
            </div>
          </fieldset>
          <div><label htmlFor="review-name" className="mb-2 block text-sm font-semibold">Your name</label><input id="review-name" name="reviewerName" autoComplete="name" required minLength={2} maxLength={80} className={field} aria-describedby="review-name-help" /><p id="review-name-help" className="mt-2 text-xs leading-relaxed text-espresso/65">Only your first name and last initial will appear publicly.</p></div>
          <div><label htmlFor="review-phone" className="mb-2 block text-sm font-semibold">Phone number used for your order</label><input id="review-phone" name="orderPhone" type="tel" autoComplete="tel" inputMode="tel" required minLength={7} maxLength={30} onInput={event => event.currentTarget.setCustomValidity("")} className={field} aria-describedby="review-phone-help" /><p id="review-phone-help" className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-espresso/65"><LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />Private. Used only to match your review to a completed order.</p></div>
          <div><label htmlFor="review-message" className="mb-2 block text-sm font-semibold">Your review</label><textarea id="review-message" name="reviewText" required minLength={10} maxLength={1200} rows={4} className={`${field} resize-y`} placeholder="Tell us about your biryani, portions, or pickup and delivery experience." aria-describedby="review-message-help" /><p id="review-message-help" className="mt-2 text-xs leading-relaxed text-espresso/65">Please leave phone numbers, addresses and payment details out of your review. 10–1,200 characters.</p></div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-espresso/75"><input type="checkbox" name="publicationConsent" value="yes" required className="mt-1 h-5 w-5 shrink-0 accent-ember" /><span>I ordered from ODB and agree that my review, rating, first name and last initial may be published after my order is checked. My phone number will stay private.</span></label>
          <p className="text-xs leading-relaxed text-espresso/65">Your submission is stored privately with our website provider, Netlify. It is checked manually; this is not text-code verification. To request a correction or removal, text ODB from the phone number you used for your order.</p>
          {status === "error" && <p role="alert" className="rounded-xl border border-ember/25 bg-ember/5 p-4 text-sm leading-relaxed text-ember">{error}</p>}
          <button type="submit" disabled={status === "sending"} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 font-bold text-white transition hover:bg-[#a94025] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"><Send className="h-4 w-4" aria-hidden="true" />{status === "sending" ? "Sending your review…" : "Send review for checking"}</button>
        </fieldset>
      </form>
    </>}
  </div>;
}
