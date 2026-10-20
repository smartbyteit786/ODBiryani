import test from "node:test";
import assert from "node:assert/strict";
import { getOrderPhoneHref, getOrderTextHref, getBookingDeposit, getLocalDateMinimum } from "../src/lib/order-contact.ts";

test("formats owner-supplied local and international phone numbers without inventing a country code", () => {
  assert.equal(getOrderPhoneHref("(202) 555-0100"), "tel:2025550100");
  assert.equal(getOrderPhoneHref("+1 (202) 555-0100"), "tel:+12025550100");
});

test("text drafts preserve the number and encode customer selections for both SMS formats", () => {
  const message = "People: 6\nPickup & delivery? 50%";
  assert.equal(getOrderTextHref("+1 (770) 294-7145", message), `sms:+17702947145?body=${encodeURIComponent(message)}`);
  assert.equal(getOrderTextHref("+1 (770) 294-7145", message, true), `sms:+17702947145&body=${encodeURIComponent(message)}`);
  assert.equal(getOrderTextHref("not a number", message), null);
});

test("50 percent deposits retain cents for all approved meals and a delivery-inclusive total", () => {
  assert.deepEqual([50, 75, 120, 145, 85].map(getBookingDeposit), [25, 37.5, 60, 72.5, 42.5]);
});

test("calendar minimum uses the local day instead of UTC", () => {
  assert.equal(getLocalDateMinimum(new Date(2026, 9, 20, 23, 59)), "2026-10-20");
});

test("a missing, placeholder, or malformed number does not create a public call link", () => {
  for (const value of ["", " ", "coming soon", "123", "+", "202+5550100", "abc2025550100", "1234567890123456"]) {
    assert.equal(getOrderPhoneHref(value), null);
  }
});
