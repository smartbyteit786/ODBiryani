// Publish only the business ordering phone supplied by the owner.
// No personal name, payment handle, or private pickup address belongs here.
export const ORDER_PHONE_DISPLAY = "+1 (770) 294-7145";

export function getOrderPhoneHref(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) return null;
  if (!/^\+?[\d().\s-]+$/.test(trimmed)) return null;
  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return `tel:${trimmed.startsWith("+") ? "+" : ""}${digits}`;
}
