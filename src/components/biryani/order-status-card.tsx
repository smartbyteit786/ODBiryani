"use client";

import { useState } from "react";
import { Bell, CalendarPlus, Check, ChevronDown, ShoppingBag, X } from "lucide-react";
import { forgetRequest, hideOrderCard, scheduleReturnReminder, showOrderCard, turnOffReminder, useOrderStatus } from "@/lib/order-status-store";
import { localDateTimeValue, makeCalendarReminder, tomorrowAtNine } from "@/lib/order-reminders";

export function OrderStatusLink() {
  const { receipt } = useOrderStatus();
  if (!receipt) return null;
  return <button type="button" onClick={showOrderCard} className="mt-3 block min-h-11 text-sm font-semibold text-saffron underline underline-offset-4">View your request</button>;
}

export default function OrderStatusCard() {
  const { receipt, visible, reminder, due } = useOrderStatus();
  const [expanded, setExpanded] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [when, setWhen] = useState("");
  const [feedback, setFeedback] = useState("");
  if (!receipt || !visible) return null;

  const chooseReminder = () => { setScheduleOpen(true); setExpanded(true); setWhen(localDateTimeValue(tomorrowAtNine())); setFeedback(""); };
  const selectedDate = () => {
    const date = new Date(when);
    if (!Number.isFinite(date.getTime()) || date.getTime() <= Date.now()) throw new Error("Choose a future date and time.");
    return date;
  };
  const save = () => {
    try { scheduleReturnReminder(selectedDate().getTime()); setFeedback("Saved on this browser. We’ll show the card when you return at or after this time. It won’t send a phone notification."); }
    catch (error) { setFeedback(error instanceof Error ? error.message : "Please choose another time."); }
  };
  const calendar = () => {
    try {
      const content = makeCalendarReminder(receipt.reference, selectedDate());
      const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
      const link = document.createElement("a"); link.href = url; link.download = "odb-order-reminder.ics"; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      setFeedback("Calendar file prepared. Open it and save the event in your calendar to enable its reminder. You can change or remove it there.");
    } catch (error) { setFeedback(error instanceof Error ? error.message : "The calendar reminder could not be prepared."); }
  };

  return <aside aria-label="Your ODB request" className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-[65] mx-auto max-h-[80dvh] max-w-md overflow-y-auto rounded-[1.75rem] border border-saffron/30 bg-espresso text-cream shadow-[0_16px_65px_rgba(0,0,0,0.4)]">
    <div className="flex items-center gap-2 px-4 py-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/15 text-saffron"><ShoppingBag className="h-5 w-5" aria-hidden="true" /></span>
      <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="order-card-details" className="flex min-h-11 min-w-0 flex-1 items-center justify-between gap-2 text-left focus-visible:outline-2 focus-visible:outline-saffron"><span><span className="block text-sm font-bold">{due ? "Your ODB reminder" : "Request received"}</span><span className="block text-xs text-cream/70">Waiting for ODB confirmation</span></span><ChevronDown className={`h-4 w-4 shrink-0 text-saffron transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true" /></button>
      <button type="button" onClick={hideOrderCard} aria-label="Hide order card" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream/75 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-saffron"><X className="h-4 w-4" aria-hidden="true" /></button>
    </div>
    {expanded && <div id="order-card-details" className="border-t border-cream/10 px-5 pb-5 pt-4">
      <p className="text-sm leading-relaxed text-cream/80">Your request has been sent for checking. This card doesn’t confirm availability, payment or booking. Look out for ODB’s reply.</p>
      <p className="mt-3 break-all text-xs text-cream/60">Reference: {receipt.reference}</p>
      <button type="button" onClick={chooseReminder} className="mt-4 flex min-h-11 items-center gap-2 rounded-full bg-saffron px-4 py-2.5 text-sm font-bold text-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"><Bell className="h-4 w-4" aria-hidden="true" />{reminder ? "Change reminder" : "Remind me"}</button>
      {scheduleOpen && <div className="mt-4 rounded-2xl border border-cream/15 bg-white/5 p-4">
        <h3 className="mb-2 text-sm font-semibold">When would you like a reminder?</h3>
        <button type="button" onClick={() => setWhen(localDateTimeValue(tomorrowAtNine()))} className="mb-3 min-h-11 text-sm text-saffron underline underline-offset-4">Tomorrow at 9 am</button>
        <label htmlFor="order-reminder-time" className="mb-2 block text-xs text-cream/80">Choose a local date and time</label>
        <input id="order-reminder-time" type="datetime-local" value={when} onChange={event => { setWhen(event.target.value); setFeedback(""); }} min={localDateTimeValue(new Date())} className="min-h-12 w-full min-w-0 max-w-full rounded-xl bg-cream px-3 py-3 text-base text-espresso focus:outline-2 focus:outline-saffron" />
        <button type="button" onClick={save} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-saffron/50 px-3 py-2 text-sm font-semibold text-saffron focus-visible:outline-2 focus-visible:outline-saffron"><Check className="h-4 w-4" aria-hidden="true" />Remind me when I return</button>
        <p className="mt-2 text-xs leading-relaxed text-cream/65">Works in this browser when the website is open or you return. Only your reference and reminder time are saved on this device.</p>
        <button type="button" onClick={calendar} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cream px-3 py-2 text-sm font-bold text-espresso focus-visible:outline-2 focus-visible:outline-saffron"><CalendarPlus className="h-4 w-4" aria-hidden="true" />Add to calendar</button>
        <p className="mt-2 text-xs leading-relaxed text-cream/65">Opens a calendar file for you to save. Your calendar controls any alert; nothing is added automatically.</p>
      </div>}
      {reminder && <div className="mt-4 text-xs leading-relaxed text-cream/75"><p>Return reminder: {new Date(reminder.remindAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</p><button type="button" onClick={() => { turnOffReminder(); setFeedback("Your website reminder is off. We won’t schedule another unless you ask."); }} className="mt-1 min-h-11 text-saffron underline underline-offset-4">Turn off reminder</button></div>}
      <p role="status" className="mt-3 text-sm leading-relaxed text-saffron">{feedback}</p>
      <div className="mt-4 border-t border-cream/10 pt-3"><button type="button" onClick={forgetRequest} className="min-h-11 text-xs text-cream/70 underline underline-offset-4">Forget this request on this device</button><p className="text-xs leading-relaxed text-cream/55">Hiding or forgetting this card doesn’t cancel your order. Calendar reminders are managed separately in your calendar.</p></div>
    </div>}
  </aside>;
}
