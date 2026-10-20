// Publish only the business ordering phone supplied by the owner.
// No personal name, payment handle, or private pickup address belongs here.
export const ORDER_PHONE_DISPLAY = "+1 (770) 294-7145";

// Only opens a message draft. Sending remains the customer's choice.
export function getOrderTextHref(phone: string, message = "", ios = false): string | null {
  const href = getOrderPhoneHref(phone);
  if (!href) return null;
  return href.replace("tel:", "sms:") + (message ? `${ios ? "&" : "?"}body=${encodeURIComponent(message)}` : "");
}

export function getLocalDateMinimum(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function getBookingDeposit(total: number): number {
  return Math.round(total * 100 / 2) / 100;
}

export function getOrderPhoneHref(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) return null;
  if (!/^\+?[\d().\s-]+$/.test(trimmed)) return null;
  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return `tel:${trimmed.startsWith("+") ? "+" : ""}${digits}`;
}
