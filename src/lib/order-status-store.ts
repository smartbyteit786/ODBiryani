"use client";

import { useSyncExternalStore } from "react";
import { parseSavedReminder, REMINDER_MAX_AGE, REMINDER_STORAGE_KEY, type SavedReminder } from "@/lib/order-reminders";

type Receipt = { reference: string; receivedAt: number };
type State = { receipt: Receipt | null; visible: boolean; reminder: SavedReminder | null; due: boolean };
const initial: State = { receipt: null, visible: false, reminder: null, due: false };
let state = initial;
let hydrated = false;
const listeners = new Set<() => void>();
let cleanup: (() => void) | undefined;
const notify = () => listeners.forEach(listener => listener());
const update = (changes: Partial<State>) => { state = { ...state, ...changes }; notify(); };
function removeSaved() { try { localStorage.removeItem(REMINDER_STORAGE_KEY); } catch { /* Browser storage is optional. */ } }
function checkDue() {
  if (state.reminder && state.reminder.remindAt <= Date.now()) {
    const reminder = state.reminder;
    removeSaved();
    update({ receipt: { reference: reminder.reference, receivedAt: reminder.createdAt }, reminder: null, visible: true, due: true });
  }
}
function readSaved() {
  try {
    const raw = localStorage.getItem(REMINDER_STORAGE_KEY);
    const reminder = parseSavedReminder(raw);
    if (raw && !reminder) removeSaved();
    update({ reminder, ...(reminder && !state.receipt ? { receipt: { reference: reminder.reference, receivedAt: reminder.createdAt } } : {}) });
    checkDue();
  } catch { /* The current-page card works even if storage is blocked. */ }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!hydrated) { hydrated = true; readSaved(); }
  if (listeners.size === 1) {
    const onStorage = (event: StorageEvent) => { if (event.key === REMINDER_STORAGE_KEY || event.key === null) readSaved(); };
    const timer = window.setInterval(checkDue, 15000);
    window.addEventListener("focus", checkDue);
    document.addEventListener("visibilitychange", checkDue);
    window.addEventListener("storage", onStorage);
    cleanup = () => { clearInterval(timer); window.removeEventListener("focus", checkDue); document.removeEventListener("visibilitychange", checkDue); window.removeEventListener("storage", onStorage); };
  }
  return () => { listeners.delete(listener); if (!listeners.size) { cleanup?.(); cleanup = undefined; } };
}
const getSnapshot = () => state;
const getServerSnapshot = () => initial;
export const useOrderStatus = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export function recordReceivedRequest(reference: string) {
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(reference)) return;
  removeSaved();
  update({ receipt: { reference, receivedAt: Date.now() }, visible: true, reminder: null, due: false });
}
export const hideOrderCard = () => update({ visible: false, due: false });
export const showOrderCard = () => update({ visible: true });
export function forgetRequest() { removeSaved(); update(initial); }
export function turnOffReminder() { removeSaved(); update({ reminder: null, due: false }); }
export function scheduleReturnReminder(when: number) {
  if (!state.receipt || !Number.isSafeInteger(when) || when <= Date.now() || when > Date.now() + REMINDER_MAX_AGE) throw new Error("Choose a time in the next 30 days.");
  const reminder: SavedReminder = { reference: state.receipt.reference, createdAt: Date.now(), remindAt: when };
  try { localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(reminder)); }
  catch { throw new Error("This browser cannot save reminders. You can add one to your calendar instead."); }
  update({ reminder, due: false });
}
