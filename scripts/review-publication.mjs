export function validatePublishedReviews(reviews) {
  if (!Array.isArray(reviews)) throw new Error('Published reviews must be an array.');
  const allowed = ['id', 'displayName', 'rating', 'review', 'month', 'verifiedOrder'];
  const ids = new Set();
  for (const item of reviews) {
    if (!item || typeof item !== 'object' || Object.keys(item).some(key => !allowed.includes(key))) throw new Error('Public review contains unapproved fields. Never include private contact or order data.');
    if (typeof item.id !== 'string' || !/^[a-zA-Z0-9-]{8,64}$/.test(item.id) || ids.has(item.id)) throw new Error('Public review IDs must be unique opaque identifiers.');
    ids.add(item.id);
    if (typeof item.displayName !== 'string' || item.displayName.length > 60 || !/^[\p{L}][\p{L}'’-]*(?: [\p{L}]\.)?$/u.test(item.displayName)) throw new Error('Use a first name and optional last initial, not a full surname.');
    if (!Number.isInteger(item.rating) || item.rating < 1 || item.rating > 5 || item.verifiedOrder !== true) throw new Error('A review needs a real rating and completed-order confirmation.');
    if (typeof item.review !== 'string' || item.review.trim().length < 10 || item.review.length > 1200 || /\S+@\S+\.\S+/.test(item.review) || /\+?\d[\d(). -]{5,}\d/.test(item.review)) throw new Error('Review text must be 10–1200 characters and exclude contact details.');
    if (typeof item.month !== 'string' || !/^20\d{2}-(0[1-9]|1[0-2])$/.test(item.month)) throw new Error('Review month must use YYYY-MM.');
  }
  return reviews;
}
