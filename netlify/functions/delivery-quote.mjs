import { deliveryQuote } from '../../server/delivery-quote.mjs';

export default function handler(request) { return deliveryQuote(request, process.env); }

export const config = {
  path: '/api/delivery-quote',
  rateLimit: { windowLimit: 8, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
