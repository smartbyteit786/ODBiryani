/* eslint-disable @typescript-eslint/no-require-imports -- Direct Node build verification. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('out/index.html', 'utf8');
const text = html.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<style\b[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, ' ');
assert(text.includes('Welcome to ODB.'));
assert(!/(\d+\.99|10% off)/i.test(text), 'Legacy prices or discounts found');
for (const price of [50, 75, 120, 145]) assert(new RegExp('\\$\\s*' + price + '\\b').test(text), 'Missing approved package price ' + price);
const input = [...html.matchAll(/<input\b[^>]*>/g)].map(m => m[0]).find(tag => tag.includes('name="people"'));
assert(input && input.includes('min="4"'), 'Guest count must indicate a minimum of four');
const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
for (const meat of ['Beef', 'Lamb']) {
  const button = buttons.find(m => m[2].includes(meat));
  assert(button && button[1].includes('disabled') && button[2].includes('Coming soon'), meat + ' must be unavailable');
}
assert(html.includes('name="fulfillment"') && html.includes('value="pickup"') && html.includes('value="delivery"'), 'Pickup and delivery must be available');
assert(text.includes('No delivery charge') && text.includes('by route'));
for (const method of ['Zelle', 'Apple Cash', 'Cash App']) assert(text.includes(method), 'Missing payment method ' + method);
assert(text.includes('How to order') && text.includes('Call ODB'));
assert(!html.includes('name="name"') && !html.includes('name="phone"') && !html.includes('name="deliveryAddress"'), 'Phone-only ordering must not collect customer details through the website');
assert(!text.includes('Send my meal request'), 'Old web request button must not be visible');
const callLinks = [...html.matchAll(/href="(tel:[^"]+)"/g)].map(match => match[1]);
assert(callLinks.length >= 3 && callLinks.every(link => link === 'tel:+17702947145'), 'All order call links must use the approved ODB number');
assert(text.includes('+1 (770) 294-7145'), 'Approved phone number must be visible');
console.log('Ordering export passed: approved prices, minimum four, unavailable meats, pickup/delivery, payment methods, and phone-only flow.');
