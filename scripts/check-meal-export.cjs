/* eslint-disable @typescript-eslint/no-require-imports -- Direct Node build verification. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('out/index.html', 'utf8');
const text = html.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<style\b[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, ' ');
assert(text.includes('Welcome to ODB.'));
assert(!/(\$\s*\d|\d+\.99|Menu &amp; Prices|Estimated total|10% off)/i.test(text), 'Public rate found');
const input = [...html.matchAll(/<input\b[^>]*>/g)].map(m => m[0]).find(tag => tag.includes('name="people"'));
assert(input && input.includes('min="4"') && input.includes('required'), 'Guest count must require at least four');
const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
for (const meat of ['Beef', 'Lamb']) {
  const button = buttons.find(m => m[2].includes(meat));
  assert(button && button[1].includes('disabled') && button[2].includes('Coming soon'), meat + ' must be unavailable');
}
const form = fs.readFileSync('public/__forms.html', 'utf8');
assert(form.includes('name="people"'));
assert(text.includes('current ingredient costs'));
console.log('Meal export passed: no public rates; minimum four; beef and lamb disabled; guest field registered.');
