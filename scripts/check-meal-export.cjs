/* eslint-disable @typescript-eslint/no-require-imports -- Direct Node build verification. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('out/index.html', 'utf8');
const text = html.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<style\b[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, ' ');
assert(text.includes('Welcome to ODB.'));
assert(!/(\d+\.99|10% off)/i.test(text), 'Legacy prices or discounts found');
for (const price of [50, 75, 120, 145]) assert(new RegExp('\\$\\s*' + price + '\\b').test(text), 'Missing approved package price ' + price);
const input = [...html.matchAll(/<input\b[^>]*>/g)].map(m => m[0]).find(tag => tag.includes('name="people"'));
assert(input && input.includes('min="4"') && input.includes('required'), 'Guest count must require at least four');
const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
for (const meat of ['Beef', 'Lamb']) {
  const button = buttons.find(m => m[2].includes(meat));
  assert(button && button[1].includes('disabled') && button[2].includes('Coming soon'), meat + ' must be unavailable');
}
const form = fs.readFileSync('public/__forms.html', 'utf8');
assert(form.includes('name="people"'));
for (const field of ['deliveryAddress', 'foodSubtotal', 'deliveryFee']) assert(form.includes('name="' + field + '"'), 'Missing order field ' + field);
const address = [...html.matchAll(/<textarea\b([^>]*)>/g)].find(m => m[1].includes('name="deliveryAddress"'));
assert(address && address[1].includes('required'), 'Delivery address must be required');
assert(text.includes('Delivery fee') && text.includes('Confirmed by distance'));
assert(text.includes('within 5 miles') && text.includes('What happens next?'));
console.log('Meal export passed: four approved prices; minimum four; unavailable meats; required delivery address; separate distance-based delivery quote.');
