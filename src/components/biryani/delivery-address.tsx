"use client";

import { useEffect, useRef, useState } from "react";

export type DeliveryQuote = { feeCents: number; expiresAt: number };
export type DeliverySelection = { address: string; quote: DeliveryQuote | null };

export default function DeliveryAddress({ onChange }: { onChange: (selection: DeliverySelection) => void }) {
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const sequence = useRef(0);
  const activeRequest = useRef<AbortController | null>(null);
  useEffect(() => () => { sequence.current++; activeRequest.current?.abort(); }, []);
  const addressInput = useRef<HTMLInputElement | null>(null);
  const fullAddress = (street: string, apartment: string) => [street.trim(), apartment.trim() ? `Unit ${apartment.trim()}` : ""].filter(Boolean).join(", ");
  const editAddress = (street: string, apartment: string) => {
    sequence.current++;
    activeRequest.current?.abort();
    setBusy(false);
    setFeedback("");
    onChange({ address: fullAddress(street, apartment), quote: null });
  };
  const calculate = async () => {
    if (!addressInput.current?.reportValidity()) return;
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const current = ++sequence.current;
    setBusy(true);
    setFeedback("");
    onChange({ address: fullAddress(address, unit), quote: null });
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/delivery-quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ address }), signal: controller.signal });
      const data = await response.json();
      if (current !== sequence.current) return;
      if (!response.ok) {
        setFeedback(typeof data.error === "string" ? data.error : "Delivery quotes are unavailable. Please try again or choose pickup.");
        return;
      }
      if (!Number.isSafeInteger(data.feeCents) || data.feeCents < 0 || !Number.isFinite(data.expiresAt) || data.expiresAt <= Date.now()) throw new Error("Invalid quote");
      onChange({ address: fullAddress(address, unit), quote: { feeCents: data.feeCents, expiresAt: data.expiresAt } });
      setFeedback(`Delivery fee: ${(data.feeCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}. Your total and deposit are updated below. Quote valid for 10 minutes.`);
    } catch {
      if (current === sequence.current) setFeedback("We couldn’t check delivery right now. Please try again or choose pickup.");
    } finally {
      clearTimeout(timeout);
      if (current === sequence.current) setBusy(false);
    }
  };
  const inputStyle = "w-full min-w-0 rounded-xl border border-espresso/20 bg-white px-4 py-3.5 text-base focus:outline-2 focus:outline-ember";
  return <div className="mt-5 space-y-3 rounded-2xl border border-espresso/15 bg-white/60 p-4">
    <label htmlFor="delivery-address" className="block text-sm font-semibold">Delivery address</label>
    <input ref={addressInput} id="delivery-address" name="deliveryAddress" autoComplete="street-address" required minLength={12} maxLength={300} value={address} onChange={(event) => { setAddress(event.target.value); editAddress(event.target.value, unit); }} placeholder="Street address, city, state, ZIP" aria-describedby="delivery-privacy delivery-feedback" className={inputStyle} />
    <label htmlFor="delivery-unit" className="block text-sm font-semibold">Apartment or unit <span className="font-normal">(optional)</span></label>
    <input id="delivery-unit" name="deliveryUnit" autoComplete="address-line2" maxLength={60} value={unit} onChange={(event) => { setUnit(event.target.value); editAddress(address, event.target.value); }} className={inputStyle} />
    <p id="delivery-privacy" className="text-sm leading-relaxed text-espresso/70">When you check delivery, your street address is sent securely to our route service, powered by Google Maps. Your unit number is shared only in your order text. We don’t save these details on the website.</p>
    <button type="button" disabled={busy} onClick={calculate} className="min-h-12 rounded-full bg-espresso px-5 py-3 text-sm font-bold text-cream disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember">{busy ? "Checking delivery…" : "Check delivery fee"}</button>
    <p id="delivery-feedback" role="status" aria-live="polite" className="text-sm font-semibold leading-relaxed text-espresso/80">{feedback}</p>
  </div>;
}
