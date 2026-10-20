import test from "node:test";
import assert from "node:assert/strict";
import { getFoodPrice, MEAL_PACKAGES, DELIVERY_RADIUS_MILES } from "../src/lib/meal-pricing.ts";

test("published chicken package totals match the owner's approved rates", () => {
  assert.deepEqual(MEAL_PACKAGES, [
    { people: 4, price: 50 },
    { people: 6, price: 75 },
    { people: 10, price: 120 },
    { people: 15, price: 145 },
  ]);
  for (const meal of MEAL_PACKAGES) assert.equal(getFoodPrice(meal.people), meal.price);
});

test("other sizes need a quote rather than an invented price", () => {
  for (const size of [5, 7, 9, 11, 14, 16, 20]) assert.equal(getFoodPrice(size), null);
});

test("invalid quantities and below-minimum requests have no package price", () => {
  for (const size of [-4, 0, 1, 2, 3, 4.5, NaN, Infinity]) assert.equal(getFoodPrice(size), null);
});

test("the delivery policy stays at five miles without inventing a fee", () => {
  assert.equal(DELIVERY_RADIUS_MILES, 5);
});
