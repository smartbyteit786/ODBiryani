import test from 'node:test';
import assert from 'node:assert/strict';
import { deliveryQuote } from '../server/delivery-quote.mjs';
import { config } from '../netlify/functions/delivery-quote.mjs';

// Synthetic placeholders only; no customer or kitchen locations are used.
const env = { ODB_DELIVERY_ORIGIN: 'PRIVATE_ORIGIN_FIXTURE', GOOGLE_ROUTES_API_KEY: 'TEST_KEY_NOT_REAL', ODB_DELIVERY_BASE_CENTS: '200', ODB_DELIVERY_PER_MILE_CENTS: '100', ODB_DELIVERY_MAX_DRIVING_MILES: '5' };
const destination = '123 Test Street, Test City, GA 00000';
const request = (body = { address: destination }, headers = {}, method = 'POST') => new Request('https://onedishbiryani.com/api/delivery-quote', { method, headers: { origin: 'https://onedishbiryani.com', 'content-type': 'application/json', ...headers }, ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}) });
const provider = (meters, extra = {}) => async () => Response.json({ routes: [{ distanceMeters: meters }], geocodingResults: { destination: { type: ['street_address'], ...extra } } });

test('calculates configured route fee while keeping kitchen and provider data private', async () => {
  let upstream;
  const response = await deliveryQuote(request({ address: destination, origin: 'ATTACKER_ORIGIN', feeCents: 0 }), env, async (url, options) => {
    upstream = JSON.parse(options.body);
    assert.equal(url, 'https://routes.googleapis.com/directions/v2:computeRoutes');
    assert.equal(options.headers['X-Goog-FieldMask'], 'routes.distanceMeters,geocodingResults.destination');
    return provider(1609.344 * 2.5)();
  }, () => 1000);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { feeCents: 450, currency: 'USD', expiresAt: 601000 });
  assert.equal(upstream.origin.address, env.ODB_DELIVERY_ORIGIN);
  assert.equal(upstream.destination.address, destination + ', USA');
  assert.match(response.headers.get('cache-control'), /no-store/);
});

test('exact five-mile boundary accepted, beyond it declined', async () => {
  assert.equal((await deliveryQuote(request(), env, provider(5 * 1609.344))).status, 200);
  const outside = await deliveryQuote(request(), env, provider(5 * 1609.344 + 1));
  assert.equal(outside.status, 422);
  assert.equal((await outside.json()).feeCents, undefined);
});

test('rejects partial matches, city-only matches, missing routes and bad distances', async () => {
  for (const fetcher of [provider(100, { partialMatch: true }), provider(100, { type: ['locality'] }), provider(undefined), provider(-1), async () => Response.json({})]) {
    assert.equal((await deliveryQuote(request(), env, fetcher)).status, 422);
  }
});

test('missing or invalid settings fail closed without contacting the provider', async () => {
  for (const settings of [{}, { ...env, ODB_DELIVERY_BASE_CENTS: '' }, { ...env, ODB_DELIVERY_PER_MILE_CENTS: '-1' }, { ...env, ODB_DELIVERY_MAX_DRIVING_MILES: '10' }]) {
    assert.equal((await deliveryQuote(request(), settings, () => { throw new Error('must not call'); })).status, 503);
  }
});

test('does not leak upstream errors, keys or private origin', async () => {
  for (const fetcher of [async () => { throw new Error(JSON.stringify(env)); }, async () => new Response(JSON.stringify(env), { status: 403 })]) {
    const response = await deliveryQuote(request(), env, fetcher);
    assert.equal(response.status, 503);
    const text = await response.text();
    assert(!text.includes(env.ODB_DELIVERY_ORIGIN));
    assert(!text.includes(env.GOOGLE_ROUTES_API_KEY));
  }
});

test('blocks other origins, GET, invalid JSON, incomplete and oversized input', async () => {
  assert.equal((await deliveryQuote(request({}, { origin: 'https://other.example' }), env)).status, 403);
  assert.equal((await deliveryQuote(request({}, {}, 'GET'), env)).status, 405);
  assert.equal((await deliveryQuote(request({}, { 'content-type': 'text/plain' }), env)).status, 415);
  for (const input of ['{', { address: 'Test City' }, { address: destination + '\nInjected' }, { address: 'x'.repeat(3000) }]) assert.equal((await deliveryQuote(request(input), env)).status, 400);
});

test('function declares rate limits on the quote endpoint', () => {
  assert.equal(config.path, '/api/delivery-quote');
  assert.deepEqual(config.rateLimit, { windowLimit: 8, windowSize: 60, aggregateBy: ['ip', 'domain'] });
});
