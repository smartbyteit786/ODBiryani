# Private delivery quotes — prepared, not activated

Branch: `codex/private-delivery-quotes`. Production remains on the working text/calendar/deposit release. No real kitchen address, API credential, or customer address has been used in implementation tests.

## Customer journey

Selecting delivery reveals street/city/state/ZIP and optional unit fields. Clicking **Check delivery fee** sends the street address in an HTTPS POST to `/api/delivery-quote`. The function privately supplies the configured kitchen origin to Google Routes. The unit stays out of the maps request. No automatic requests are sent while typing.

The response exposes only fee in cents, USD currency and expiry. No kitchen origin, coordinates, route, duration, exact distance, key, or raw provider error is returned. The fee joins the meal price and updates the 50% deposit. Delivery requests require a current successful quote; pickup needs no address or delivery fee. Address edits and pickup/delivery changes invalidate the quote. Requests remain estimates to confirm by text, not online payment transactions or automatically accepted bookings.

## Required private setup

Enter these in Netlify's environment-variable settings, limited to Functions scope where the account supports scopes. Do not paste private addresses or credentials into chat, source, Git, public configuration, `NEXT_PUBLIC_*`, or the static export.

| Variable | Value needed |
| --- | --- |
| `ODB_DELIVERY_ORIGIN` | Private kitchen address used for route origin. |
| `GOOGLE_ROUTES_API_KEY` | Owner-entered key for an enabled Google Routes API project. Restrict to the required API and set an appropriate provider quota. Billing/provider setup remains owner-controlled. |
| `ODB_DELIVERY_BASE_CENTS` | Owner-approved base delivery charge, in cents. Explicit `0` permitted; unset fails closed. |
| `ODB_DELIVERY_PER_MILE_CENTS` | Owner-approved amount per driving mile, in cents. Explicit `0` supports a flat fee. |
| `ODB_DELIVERY_MAX_DRIVING_MILES` | Owner-approved limit, greater than zero and at most five miles. |

**Policy decision pending:** the draft uses driving miles for both service eligibility and pricing. This is not the same as a straight-line five-mile radius. Confirm the intended rule before activation. If straight-line eligibility is wanted, implement and test server-side geocoding for that boundary before release.

Draft fee formula: base cents + round(driving miles × per-mile cents), rounded once to the nearest cent. No live rate or default fee is invented. A missing/invalid origin, credential or rate produces an unavailable response, never a fake/free quote.

## Release and verification

The old static ZIP upload cannot include functions. A guard now stops that publisher from silently dropping the delivery endpoint. Use a functions-aware Netlify build/deploy with `out/` as publish directory and `netlify/functions/` as function directory. Verify the new deployment actually contains `delivery-quote` before publishing; do not assume pushing this branch activates it. Redeploy after private settings are configured.

1. Confirm fee and mileage policy, configure private settings, and verify provider setup without printing values.
2. Deploy a protected preview with functions. Test real nearby and outside-area destinations only with approved test addresses; maps requests transmit those addresses and kitchen origin to Google.
3. Test successful quote, unmatched/partial address, unavailable provider, changed address, repeated requests, expired quote, pickup reset, total/deposit, message preview and mobile layout. No real SMS/payment required for browser checks.
4. Verify configured platform rate limit in deployment logs. Declared limit is eight requests per IP/domain per minute; enforcement is platform-dependent and not guaranteed as a hard spending cap. Set provider quotas as well.
5. Inspect published HTML, JS, JSON, HTTP responses and errors for absence of origin/key. Test public endpoints before calling live routing complete.

No database writes or application-level logging of addresses is implemented. Platform/provider processing still occurs. Same-origin POST checks are basic abuse reduction, not authentication. Repeated eligibility/fee queries can reveal an approximate service area, so this design does not promise geographic anonymity. Coarser fee bands or a flat fee reduce distance inference if that is important to the owner.

## Validation completed

Production build/TypeScript passed. Sixteen unit tests passed, including seven delivery tests covering authoritative server origin, fee arithmetic, five-mile boundary, incomplete/ambiguous routes, missing configuration, sanitized provider failures, request restrictions, input size and declared rate limits. All maps responses in these tests are mocked; no live provider acceptance or deployed rate-limit behavior is claimed.

References: [Google Routes computeRoutes](https://developers.google.com/maps/documentation/routes/reference/rest/v2/TopLevel/computeRoutes), [Netlify function configuration](https://docs.netlify.com/build/functions/configuration/), [function environment variables](https://docs.netlify.com/build/environment-variables/overview/), [Netlify rate limiting](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/).
