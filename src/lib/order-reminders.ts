export type SavedReminder = { reference: string; createdAt: number; remindAt: number };
export const REMINDER_STORAGE_KEY = "odb-request-reminder-v1";
export const REMINDER_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export function parseSavedReminder(raw: string | null, now = Date.now()): SavedReminder | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (typeof value.reference !== "string" || !/^[a-zA-Z0-9-]{8,64}$/.test(value.reference)) return null;
    if (!Number.isSafeInteger(value.createdAt) || !Number.isSafeInteger(value.remindAt) || value.createdAt > now || value.createdAt < now - REMINDER_MAX_AGE || value.remindAt <= value.createdAt || value.remindAt > value.createdAt + REMINDER_MAX_AGE) return null;
    // Whitelist: no contact details, addresses, payment data, or full order payload.
    return { reference: value.reference, createdAt: value.createdAt, remindAt: value.remindAt };
  } catch { return null; }
}

export function tomorrowAtNine(now = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0, 0);
}

export function localDateTimeValue(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function makeCalendarReminder(reference: string, when: Date, now = new Date()): string {
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(reference) || !Number.isFinite(when.getTime()) || when.getTime() <= now.getTime()) throw new Error("Choose a future reminder time.");
  const utc = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ODB//Order reminder//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", `UID:${reference}-${when.getTime()}@odb-reminder`, `DTSTAMP:${utc(now)}`, `DTSTART:${utc(when)}`, `DTEND:${utc(new Date(when.getTime() + 15 * 60000))}`, "SUMMARY:Check your ODB request", `DESCRIPTION:Request reference ${reference}. Check your order confirmation. This reminder does not confirm a booking.`, "BEGIN:VALARM", "TRIGGER:PT0S", "ACTION:DISPLAY", "DESCRIPTION:Check your ODB request", "END:VALARM", "END:VEVENT", "END:VCALENDAR"];
  // All generated text is ASCII. Fold long lines for calendar compatibility.
  return lines.map(line => line.match(/.{1,73}/g)!.join("\r\n ")).join("\r\n") + "\r\n";
}
