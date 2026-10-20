export const MEAL_PACKAGES = [
  { people: 4, price: 50 },
  { people: 6, price: 75 },
  { people: 10, price: 120 },
  { people: 15, price: 145 },
] as const;

export const DELIVERY_RADIUS_MILES = 5;

// Only exact, owner-approved package sizes receive a published food price.
// Delivery is separate and must be confirmed before the request is accepted.
export function getFoodPrice(people: number): number | null {
  if (!Number.isSafeInteger(people) || people < 4) return null;
  return MEAL_PACKAGES.find((meal) => meal.people === people)?.price ?? null;
}
