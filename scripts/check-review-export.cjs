/* eslint-disable @typescript-eslint/no-require-imports -- Static release contract. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('out/index.html', 'utf8');
assert(html.indexOf('id="reviews"') > html.indexOf('id="gallery"'), 'Reviews must follow the kitchen photos');
assert(html.includes('No published reviews yet.'), 'Empty state must be honest until verified reviews exist');
const form = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)].map(match => match[0]).find(value => value.includes('name="odb-customer-review"'));
assert(form, 'Private review intake is missing');
for (const field of ['rating', 'reviewerName', 'orderPhone', 'reviewText', 'publicationConsent']) assert(form.includes(`name="${field}"`), `Missing review input ${field}`);
assert(form.includes('name="review-bot"'), 'Review honeypot missing');
assert(form.includes('My phone number will stay private.'), 'Publication consent must preserve phone privacy');
assert(html.includes('href="#reviews"'), 'Review navigation missing');
const order = html.slice(html.indexOf('id="order"'), html.indexOf('id="gallery"'));
assert(!order.includes('name="orderPhone"'), 'Review contact collection must stay outside ordering');
console.log('Review export passed: placement, private intake, consent, empty state and order separation.');
