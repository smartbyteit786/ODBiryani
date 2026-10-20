// Server-only: never import this module into a browser component.
const METERS_PER_MILE = 1609.344;
const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, private', 'X-Content-Type-Options': 'nosniff' };
const reply = (status, data) => new Response(JSON.stringify(data), { status, headers });
const unavailable = () => reply(503, { error: 'Delivery quotes are unavailable. Please try again later or choose pickup.' });

function settings(env) {
  const integer = key => typeof env[key] === 'string' && /^\d+$/.test(env[key]) ? Number(env[key]) : NaN;
  const base = integer('ODB_DELIVERY_BASE_CENTS');
  const perMile = integer('ODB_DELIVERY_PER_MILE_CENTS');
  const maxMiles = Number(env.ODB_DELIVERY_MAX_DRIVING_MILES);
  if (!env.ODB_DELIVERY_ORIGIN || !env.GOOGLE_ROUTES_API_KEY || !Number.isSafeInteger(base) || !Number.isSafeInteger(perMile) || base > 10000 || perMile > 10000 || !Number.isFinite(maxMiles) || maxMiles <= 0 || maxMiles > 5) return null;
  return { origin: env.ODB_DELIVERY_ORIGIN, key: env.GOOGLE_ROUTES_API_KEY, base, perMile, maxMiles };
}

async function readSmallJson(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('input');
  let text = '';
  let size = 0;
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 2048) { await reader.cancel(); throw new Error('input'); }
    text += decoder.decode(value, { stream: true });
  }
  return JSON.parse(text + decoder.decode());
}

export async function deliveryQuote(request, env, routeFetch = fetch, now = Date.now) {
  if (request.method !== 'POST') return reply(405, { error: 'Use POST.' });
  if (request.headers.get('origin') !== new URL(request.url).origin) return reply(403, { error: 'Please request delivery through the ODB website.' });
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, { error: 'Send a delivery address as JSON.' });
  let address;
  try {
    const body = await readSmallJson(request);
    // Only the destination is accepted. A client can never override the kitchen or rates.
    address = typeof body?.address === 'string' ? body.address.trim() : '';
    if (address.length < 12 || address.length > 300 || /[\r\n\x00-\x1f]/.test(address) || !/\d/.test(address) || !/\b\d{5}(?:-\d{4})?\b/.test(address)) throw new Error('input');
  } catch { return reply(400, { error: 'Enter a complete street address, city, state and ZIP code.' }); }
  const config = settings(env);
  if (!config) return unavailable();
  try {
    const result = await routeFetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': config.key, 'X-Goog-FieldMask': 'routes.distanceMeters,geocodingResults.destination' },
      body: JSON.stringify({ origin: { address: config.origin }, destination: { address: `${address}, USA` }, travelMode: 'DRIVE', routingPreference: 'TRAFFIC_UNAWARE', computeAlternativeRoutes: false, units: 'IMPERIAL', regionCode: 'us' }),
      signal: AbortSignal.timeout(8000),
    });
    if (!result.ok) return unavailable();
    const data = await result.json();
    const destination = data.geocodingResults?.destination;
    if (!destination || destination.partialMatch || (destination.geocoderStatus?.code ?? 0) !== 0 || !destination.type?.some(type => ['street_address', 'premise', 'subpremise'].includes(type))) return reply(422, { error: 'We could not confirm that street address. Check the street, city and ZIP code.' });
    const meters = data.routes?.[0]?.distanceMeters;
    if (!Number.isFinite(meters) || meters < 0) return reply(422, { error: 'No driving route was found. Check your address or choose pickup.' });
    if (meters > config.maxMiles * METERS_PER_MILE) return reply(422, { error: 'This address is outside our delivery area. Pickup is available.' });
    const feeCents = config.base + Math.round(meters / METERS_PER_MILE * config.perMile);
    // Return no origin, coordinates, distance, duration, route, or upstream errors.
    return reply(200, { feeCents, currency: 'USD', expiresAt: now() + 10 * 60 * 1000 });
  } catch { return unavailable(); }
}
