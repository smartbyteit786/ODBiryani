# One Dish Biryani

Next.js website with Tailwind CSS, Framer Motion, and Netlify Forms.

## Development

Use Node.js 22 or newer. Run `npm ci`, then `npm run dev`.
Run `npm run lint`, `npm run typecheck`, and `npm run build` before release.
The production build is a static export in `out/`.

## Hosting and orders

- GitHub: https://github.com/smartbyteit786/ODBiryani
- Netlify: https://odbiryani.netlify.app
- Netlify site ID: `d9cc4ca2-0473-4f1f-93a2-afd761eec63c`
- Order requests go to the `biryani-order` form in the Netlify dashboard.
- `public/__forms.html` defines the fields Netlify detects. Keep these synchronized with `order.tsx`.
- A request is not a confirmed booking or payment. No email notification or inbox delivery is promised by this implementation.
- The original SQLite API has been retired from the deployed site. Local database files and uploaded originals are excluded from Git.
- Confirm pricing, food claims, fulfillment details, and notification recipients before promoting the site to customers.

See `worklog.md` for continuity and verification evidence.
