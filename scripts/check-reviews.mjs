import fs from 'node:fs';
import assert from 'node:assert/strict';
import { validatePublishedReviews } from './review-publication.mjs';

const reviews = validatePublishedReviews(JSON.parse(fs.readFileSync('src/data/customer-reviews.json', 'utf8')));
const definition = fs.readFileSync('public/__forms.html', 'utf8');
assert(definition.includes('name="odb-customer-review"') && definition.includes('netlify-honeypot="review-bot"'));
for (const name of ['reviewerName', 'orderPhone', 'rating', 'reviewText', 'publicationConsent', 'submissionRef']) assert(definition.includes(`name="${name}"`), `Missing review field ${name}`);
console.log(`Review privacy contract passed: ${reviews.length} owner-verified public reviews; private intake is separate.`);
