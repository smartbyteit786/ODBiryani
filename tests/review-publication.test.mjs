import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePublishedReviews } from '../scripts/review-publication.mjs';

const review = { id: 'fixture-review-id', displayName: 'Amina K.', rating: 1, review: 'The rice was overcooked. Please improve it.', month: '2026-10', verifiedOrder: true };
test('publication permits honest negative reviews with a verified order', () => {
  assert.equal(validatePublishedReviews([review])[0].rating, 1);
  assert.deepEqual(validatePublishedReviews([]), []);
});
test('publication rejects contact data and unverified or duplicate entries', () => {
  for (const extra of [{ orderPhone: '+12025550100' }, { reviewerName: 'Private Name' }, { orderId: 'PRIVATE_ORDER' }, { displayName: 'Amina Khan' }, { verifiedOrder: false }, { rating: 0 }, { rating: 6 }, { month: '2026-13' }, { review: 'Contact me at +1 (202) 555-0100 please.' }, { review: 'Contact me at test@example.com please.' }]) assert.throws(() => validatePublishedReviews([{ ...review, ...extra }]));
  assert.throws(() => validatePublishedReviews([review, review]));
});
