# ODB — One Dish Biryani

Next.js website with Tailwind CSS, Framer Motion, and Netlify Forms.

## Development

Use Node.js 22 or newer. Run `npm ci`, then `npm run dev`.
Run `npm run lint`, `npm run typecheck`, and `npm run build` before release.
The production build is a static export in `out/`.

## Hosting and orders

- GitHub: https://github.com/smartbyteit786/ODBiryani
- Netlify: https://odbiryani.netlify.app
- Netlify site ID: `d9cc4ca2-0473-4f1f-93a2-afd761eec63c`
- Ordering is phone only at **+1 (770) 294-7145**. The owner approved this public number; it is configured in `src/lib/order-contact.ts`. No owner name, payment handles, private pickup address, or customer contact form appears in the new page. The deployment script blocks publishing a phone-only build without a valid call link.
- Customers can plan chicken biryani for four or more people, choose pickup or delivery, then call ODB. The four approved food prices are published; other sizes are confirmed by phone. Beef and lamb are coming soon.
- Pickup has no delivery charge. Delivery is within five miles, with an additional charge confirmed from the address and route. The kitchen origin and fee schedule are still needed for automated calculations. Pickup location and time are shared privately when the order is confirmed.
- Zelle, Apple Cash, and Cash App are listed as accepted payment methods. Payment details are shared privately; there is no payment integration or automatic verification. The order phone is not assumed to be the payment recipient identifier.
- Existing Netlify form submissions and their legacy definition are preserved. They are historical requests; the new public ordering flow calls ODB instead of submitting to Netlify. No records were deleted or notification recipients changed.
- The original SQLite API has been retired from the deployed site. Local database files and uploaded originals are excluded from Git.
- Confirm pricing, food claims, fulfillment details, and notification recipients before promoting the site to customers.

See `worklog.md` for continuity and verification evidence.
