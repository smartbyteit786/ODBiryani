import test from "node:test";
import assert from "node:assert/strict";
import { getOrderPhoneHref } from "../src/lib/order-contact.ts";

test("formats owner-supplied local and international phone numbers without inventing a country code", () => {
  assert.equal(getOrderPhoneHref("(202) 555-0100"), "tel:2025550100");
  assert.equal(getOrderPhoneHref("+1 (202) 555-0100"), "tel:+12025550100");
});

test("a missing, placeholder, or malformed number does not create a public call link", () => {
  for (const value of ["", " ", "coming soon", "123", "+", "202+5550100", "abc2025550100", "1234567890123456"]) {
    assert.equal(getOrderPhoneHref(value), null);
  }
});
