# Worklog

## October 25, 2026 — Privacy release is live through GitHub

- Owner connected ODB Netlify to GitHub main. Fast-forwarded main to the tested feature work, then published 842bba4 with explicit required pickup/delivery selection and corrected payment wording. Netlify reports main@842bba4 published. Live marker is odbiryani-2026-10-23-order-reminders.
- Verified 30/30 production HTTP checks, expected release/assets/security headers, no public contact links, corrected payment copy and no default fulfillment selection. Final local build/TypeScript, privacy export and changed-component lint passed.
- All three Netlify forms registered; preserved legacy biryani-order and its four prior submissions. Configured only odb-order-request email notifications to the approved private recipient. Initial any-form scope was corrected and rechecked as order-specific before the test request.
- Submitted one clearly marked ODB UAT Test - do not prepare request with reserved example.com/555 contacts. Receipt and floating card appeared; aggregate order form count increased from zero to one. Did not read customer submission records. Owner inbox receipt is still unconfirmed; no real order/payment was accepted by this test.
- Browser verified conditional delivery address, required-field validation, received-request card, reminder opt-in and turn-off, hide and footer restore. At 390px, document width was 380px with no horizontal overflow. Proof screenshot: ignored .netlify/uat/live-order-card.png. Calendar generation has unit coverage; real iPhone import/native alerts not tested. No native Dynamic Island or push service.
- Remaining: owner confirms test email delivery, broader real-device UAT including calendar import and delivery/error paths, and review-intake acceptance. Automatic route pricing remains unactivated on its separate branch. Saved CLI token still returns 401; GitHub deployments now work.

## October 25, 2026 — Release access rechecked

- Confirmed clean feature branch at 10e4e1d and checked the existing static export: private order contract passes; release.zip is ready with the order-reminders release marker.
- Live HTTPS homepage and release metadata still fail the new-release acceptance checks; the site has not received these changes. Netlify saved authorization still returns HTTP 401 Access Denied.
- Signed-in Chrome still has access to the correct ODB project. Retried its normal ZIP upload once; the extension blocked file access because Allow access to file URLs remains disabled. No permission settings were changed and no publication occurred. Kept the project tab for handoff and provided the exact extension setting instructions.
- Next required user action: enable the Chrome ChatGPT extension file-URL access, or manually upload workspace release.zip in the ODB Netlify project. Then continue live form/privacy verification, configure private notifications, and run synthetic customer-flow acceptance. Do not report owner contacts hidden on production until checked after publishing.

## October 23, 2026 — Optional request card and reminders (not live)

- Added a floating request card only after a successful private-form response. Customers can expand, hide, restore from the footer, or forget the latest request. Copy clearly distinguishes a received request from booking/payment confirmation.
- Reminders require a customer choice: tomorrow at 9 am or a chosen local time. Website reminders save only reference/timestamps for up to 30 days and appear once when open or on return. Turning off does not reschedule. Calendar export includes an alarm and requires the customer to save it. No native Dynamic Island, background push or live fulfillment tracking is claimed.
- Production build/TypeScript, ESLint and 16 unit tests passed. Private ordering export passed. Local Chrome preview at 127.0.0.1:8765 timed out, so browser interaction, responsive visual acceptance and real iPhone calendar import are still pending.
- Release marker: odbiryani-2026-10-23-order-reminders. See docs/order-card-reminders.md. Netlify CLI authorization and browser file-upload permission remain unresolved; this is not deployed, owner notification is not configured, and the live public contact removal is still pending. Next: upload latest release.zip, verify live privacy and forms, configure private notification, run synthetic order/card/mobile tests, and obtain owner inbox confirmation.

## October 23, 2026 — Hide owner contact and use private order form (not live)

- Browser fallback found an authenticated Chrome Netlify session and opened the correct odbiryani project. Upload of privacy-checked release.zip was attempted through its existing “choose a file” control, but the ChatGPT extension rejected file access because “Allow access to file URLs” is disabled. No extension permissions were changed and no site publication occurred. Deployment page is kept for handoff. The CLI still returns 401; browser access is functional, browser file upload is the immediate blocker.
- A ready-to-upload release.zip is in the workspace (ignored by Git), containing only the checked out/ export. Owner can enable the Chrome extension's file-URL access or manually upload that archive in the open ODB Netlify project. Then verify deployment, register/configure only the new order notification privately, and run live acceptance checks. Do not expose the notification recipient in screenshots, source, or public settings.
- Owner revoked public display of the ordering phone and supplied a private iCloud notification recipient. Removed the phone from active browser configuration and phone/email links from current header/order/footer. Public buttons now say Order and open the planner. Neither the notification address nor private origin is included in application source or build output.
- Replaced SMS drafting with a dedicated private Netlify `odb-order-request` form: customer name/email/phone/consent, meal count, cut, requested date/time, fulfillment, conditional delivery address, subtotal, manual fee and 50% deposit. Added required-field validation, busy/error/receipt states and reference-based duplicate checking support. Customers wait for confirmation before paying.
- Private recipient stored only in ignored .netlify/private/order-notifications.json, not Git/public assets. Notification hook has NOT been configured, no email sent, and no order submission tested live. See docs/private-ordering.md for private setup and mailbox acceptance steps.
- Netlify access was rechecked once and still returned 401 Access Denied. The public site has NOT changed and still contains the old public phone. This privacy fix is urgent to deploy once access is restored; do not say the live number has been hidden yet.
- Local production build/TypeScript, full ESLint, 11 unit tests, ordering/review exports and private-order export checks passed. Export scan found no iCloud recipient, contact links or owner phone in 17 HTML/JS/JSON files. These are local checks, not live workflow or mailbox proof.
- Changes remain on codex/customer-reviews alongside the unpublished review section. Next: restore Netlify access, publish, verify three form definitions without reading customer records, configure only the new order notification to the private recipient, test synthetic acceptance and owner-confirmed inbox delivery, then merge the released feature into main. Automatic delivery calculations remain unactivated separately.

## October 22, 2026 — Customer reviews prepared; publication blocked by Netlify access

- Owner approved manual completed-order verification with private customer phone numbers. Added a styled reviews section after the kitchen gallery, navigation links, a truthful empty state, and a private name/order-phone/rating/review/consent form. No fake testimonials or public customer records were added.
- Intake uses a distinct `odb-customer-review` Netlify form with a matching static definition, honeypot, validation, sending/error/receipt states and private publication consent. Nothing automatically publishes. Existing ordering and legacy forms are preserved; private routing work remains on its separate branch.
- Public reviews are curated separately in src/data/customer-reviews.json (currently empty). Added publication checks rejecting extra/private fields, common phone/email content, unverified entries and duplicates; low ratings are accepted. One review per completed order requires the documented manual order/register check. See docs/customer-reviews.md for the exact owner workflow; no automatic SMS verification or notifications were activated.
- Eleven unit tests, full ESLint, production build/TypeScript, publication contract and existing ordering export check passed. Additional review-export contract checks placement, field/consent wiring and separation from ordering. Build and deployment run publication privacy checks.
- Netlify upload was attempted once and rejected with HTTP 401 “Access Denied: User does not have access.” Saved config has one selected user/token and no environment override; no alternate credential was selected, no customer records fetched, and no publication occurred. Live site remains the October 20 chicken-choice release. New draft marker is odbiryani-2026-10-22-customer-reviews.
- Work saved on codex/customer-reviews so production main stays consistent. Next: restore Netlify access to project odbiryani, deploy the built review release, verify both form definitions/aggregate counts, then browser-test required fields/rating/consent/mobile/error/success paths and one marked synthetic intake (never publish it). Owner matching and public review publication remain manual.

## October 20, 2026 — Private delivery origin configured

- Owner supplied the kitchen origin for delivery routing. Stored it in Netlify site `odbiryani` as `ODB_DELIVERY_ORIGIN`, marked secret, restricted to Functions scope and production context. Verified the saved security metadata without printing the value. No address was added to Git, application source, build output, or public website. Temporary value-free setup helper removed afterward.
- This config change does not activate automatic quotes or publish a new site release. The delivery calculator remains on `codex/private-delivery-quotes`; main still serves the tested chicken-choice release. Origin has not been geocoded or sent to Google.
- Next: owner-entered `GOOGLE_ROUTES_API_KEY` in private Netlify settings; final delivery-rate and driving-mile policy approval; merge current main into delivery branch; functions-aware deployment and route/privacy acceptance testing. Latest cost-model suggestion was $5 base + $3 per one-way driving mile, maximum five driving miles; it remains a suggestion, not a configured or published rate. Do not record the private origin value in continuity documents.

## October 20, 2026 — Customer chooses chicken cut

- Owner clarified that bone-in versus boneless is the customer's choice. Added a required, unselected-by-default radio choice before the requested date. The selected cut appears in the summary and prepared order text.
- Listed package prices remain the owner's existing prices. No new cut surcharge or cost-model price is published. UI and SMS explicitly ask to confirm the selected cut's final price and deposit before payment. The private costing report remains a planning estimate, not an approved menu schedule.
- Shipped this independently on main so it does not depend on private routing configuration. Release `odbiryani-2026-10-20-chicken-choice`; Netlify deploy `6ad7c8d9c5b0915f81dcb514` ready at 20:02 UTC on https://onedishbiryani.com.
- Production build/TypeScript, exported contract, ESLint and live release checks passed. A temporary ignored local preview helper initially caused lint errors; removed that unused helper, then full lint passed. Live mobile browser verified missing-cut validation, both cut selections in SMS drafts, mutual exclusivity, and no horizontal overflow at 390px. No message was sent. Screenshot .netlify/uat/chicken-choice.png.
- Private delivery calculator remains on `codex/private-delivery-quotes`, not deployed. Merge updated main into that draft before release so customer cut selection is retained. Private origin/key and owner-approved delivery/cut-specific prices remain outstanding; earlier assistant-suggested costs/rates are not approved public prices.

## October 20, 2026 — Text-only requests, calendar and 50% deposit

- Owner requested text-only ordering for privacy, requested date/time, and approved a 50% booking deposit. Replaced active call links with text drafting and planner navigation. Public number stays +1 (770) 294-7145; no owner name or private address added.
- Planner requires at least four people, a requested local date (past dates rejected), and preferred time. Native calendar/time controls are used. SMS draft includes meal size, date/time, pickup/delivery, meal price, and a request to confirm availability/final total/deposit. User must send the message; no automatic reservation, submission, payment, or SMS sending exists. Copy/preview fallback included for desktop or unsupported SMS clients.
- Deposit is half the confirmed final total including delivery. Pickup meal examples: $25/$37.50/$60/$72.50. Delivery displays “After final total”; no invented mileage fee. Remaining balance due at pickup/delivery. Refund/change/cancellation rules are unspecified; agree privately before taking payment and do not invent non-refundability.
- Nine unit tests passed, full ESLint passed after correcting client date initialization, production build/TypeScript passed, exported contract passed. Live HTTP UAT 30/30 passed (18 assets); custom-domain release check passed. Browser checked required-field blocking, past-date rejection, selected date/time in SMS href, $37.50 pickup deposit on $75, delivery deposit deferral, copy success, and no overflow at 320/390/768/1440px. No console warnings/errors reported.
- Published release `odbiryani-2026-10-20-text-calendar-deposit`, Netlify deploy `6ad7bb07d5c3d0facb81ab02`, ready at 19:03 UTC on https://onedishbiryani.com. Screenshot .netlify/uat/text-deposit.png.
- No message was sent and no payment made. Actual iPhone/Android Messages handoff/receipt still needs physical device acceptance; both platform SMS URI formats are unit checked. Website removes call links but cannot disable incoming voice calls or hide identities within payment apps. Next: business-number call handling, private payment recipient verification, cancellation terms and delivery fee policy.

## October 20, 2026 — Full website UAT and accessibility fixes

- Completed live functional UAT against the phone-only release; detailed results and remaining operational acceptance steps are in docs/UAT-2026-10-20.md.
- Fixed gallery Escape/focus containment and return using the existing Radix dialog dependency; added keyboard photo navigation. Fixed mobile menu Escape/focus return. Added skip-to-content and reduced-motion support.
- Rebuilt and published release `odbiryani-2026-10-20-uat-accessibility`, Netlify deploy `6ad7b3a67df5324369c1551c`, ready at 18:32 UTC. Both the Netlify hostname and Netlify-reported custom domain https://onedishbiryani.com return the new marker and approved call target.
- Final live browser checks passed: all four prices, six quantity cases, availability, pickup/delivery, navigation, gallery keyboard behavior, loaded images, skip-link focus, and no reported console warnings/errors. Eight viewport configurations had no horizontal overflow (320–1440px plus landscape).
- Public HTTP UAT: 30 passed, zero failed, 18 assets checked. Six unit tests, ESLint, production build/TypeScript, exported contract and diff checks passed. Evidence under ignored .netlify/uat/; reusable public runner scripts/uat-http.cjs added.
- No calls, payments, or customer submissions were made/read/changed. Next operational acceptance: real iPhone Safari and receiving-phone check; confirm payment recipient details privately; supply delivery origin/mileage policy/fee schedule if automatic delivery pricing is wanted. Physical device sharing/offline/PWA capabilities are not certified by this UAT.

## October 20, 2026 — Approved phone number and pickup/payment release

- User supplied and approved the public order number +1 (770) 294-7145. Configured display and call links as `tel:+17702947145`; no owner name, public email, pickup address, or payment handle is published.
- Completing the tested `codex/pickup-phone-orders` draft for production. Pickup has no delivery charge; delivery within five miles has an extra route charge confirmed by phone. Listed payment methods are Zelle, Apple Cash, and Cash App; payment details are shared privately and are not integrated or verified by the website.
- Built-page checks now verify the exact approved number and all rendered call targets. Live verification checks phone, payment methods, release marker, images, and headers.
- Validation completed: six unit checks, full ESLint, production build including TypeScript, and the built-page contract check passed. The exact displayed number and all call hrefs were verified.
- Source commit `3f69441` fast-forwarded into main and pushed. Netlify deploy `6ad7a02881da9e602658eb6c` reached ready at https://odbiryani.netlify.app. Live HTTP checks passed for the number, correct tel target, payment methods, release marker, photo, and security headers.
- Live browser confirmed six people shows $75; delivery adds an extra route-confirmed charge; switching back to pickup shows no delivery charge. Zelle, Apple Cash, and Cash App are displayed; no customer name/phone/address web form is present. Header, order section, and footer link to `tel:+17702947145`.
- No call was placed, no money transferred, and no payment receipt or order handling at the receiving phone was tested. Existing Netlify records were not accessed, deleted, or changed. Orders now arrive as customer calls rather than website submissions.
- Screenshot saved locally under `.netlify/screenshots/phone-pickup-payments.png`. Delivery origin and exact route fee schedule remain unspecified, so distance eligibility and delivery fees are confirmed by phone; no automatic route calculation is claimed. Pickup location/time and payment details remain private.

## October 20, 2026 — Pickup, payments, and phone-only orders (awaiting number)

- User requested pickup and delivery options, route-based extra delivery charges, Zelle/Apple Cash/Cash App, phone-only ordering contact, and no visible owner name.
- Prepared a new phone-order planner: approved meal prices, minimum four people, chicken available with beef/lamb coming soon, pickup selected by default with no delivery charge, delivery within five miles with an extra route charge confirmed by phone, and payment-method badges. Pickup location/time and payment details are shared privately.
- Removed active web collection of customer name, phone, and address from this new flow. Call links replace order submission once a number is provided. Legacy form files and records are preserved; no records or notifications were deleted or changed.
- Public order phone is missing. Asked the user which number to publish; response pending. No placeholder/fake number was used. `ORDER_PHONE_DISPLAY` is empty in src/lib/order-contact.ts, and the deploy utility blocks this phone-only release unless its built HTML contains a valid call link. Do not deploy it while missing the number.
- Six unit checks, full ESLint, final production build including TypeScript, and the updated built-page contract check passed. Final navbar call-link wiring passed targeted lint and was included in the final build. No physical call or payment was initiated.
- Owner name is not included in page copy, metadata, contact details, or payment handles. Payment apps control their enrolled recipient names; website privacy does not hide those names in a payment app.
- Delivery origin and exact route-fee schedule are also still missing. No automatic calculation or route approval is claimed.
- Live site remains on the prior pricing/delivery request version until the approved public order number is provided.
- Draft is being saved on `codex/pickup-phone-orders`, separate from production `main`. Next: set the supplied number in src/lib/order-contact.ts, rebuild and verify rendered call links, merge/push to main, package/deploy, then verify the live pickup/delivery controls and correct tel links without placing a call or transferring money.

## October 20, 2026 — Published prices and five-mile delivery

- User authorized publishing the four approved food prices and specified a five-mile service radius with delivery charged separately by mileage. This supersedes the previous no-public-pricing direction.
- Meal size cards show 4 people $50, 6 people $75, 10 people $120, 15 people $145. Exact counts use these food subtotals; other group sizes still require a personal quote. No inferred discounts, fees, or inflation increases.
- Added required delivery address, separate food-subtotal/delivery-fee summary, five-mile eligibility wording, and a three-step explanation of requesting, confirming, and receiving the meal. Confirmation remains a request, not an accepted booking or payment.
- Current limitation: kitchen origin, distance metric, and mileage fee schedule are not supplied. Delivery eligibility, mileage fee, final total, and timing are owner-confirmed manually. No automatic geofence or mileage calculation is claimed. Asked user for starting address/ZIP; response pending.
- Verified Netlify order notifications configuration: no submission-created hooks exist. Requests arrive in Netlify Forms; email/SMS alerts are not configured. An approved recipient is needed before forwarding customer data. Do not assume an account/profile email is the intended recipient.
- Four pricing/radius unit checks, full ESLint, production build including TypeScript, and the built-page contract check passed. The form definition contains deliveryAddress, foodSubtotal, and deliveryFee. Aggregate form count before acceptance test: 3; no submission records were fetched.
- Source commit 1edbd6e pushed to main; Netlify deploy 6ad70931d94fad5c8f8db661 reached ready at https://odbiryani.netlify.app. Live page, new release marker, delivery form definition, photo, and security-header checks passed.
- Live browser: all four rates displayed; six people showed $75; eight people required a personal quote. Missing delivery address blocked submission. A marked synthetic six-person request showed confirmation reference 82003E with $75 meal price and delivery charged separately. Aggregate count increased from 3 to 4; no submission records were fetched.
- Netlify form metadata confirmed deliveryAddress, foodSubtotal, and deliveryFee fields are registered. The marked request remains DO NOT FULFILL; no customer records were opened or deleted.
- Local screenshots: .netlify/screenshots/pricing-delivery.png and pricing-delivery-success.png. Reset cleared customer name, phone, address, and notes.
- Outstanding setup: kitchen origin/ZIP (question pending), mileage measurement basis and fee schedule for automatic calculation, and approved order-alert recipient. Until then use Netlify Forms and manually confirm delivery eligibility, fee, total, and timing.

## October 20, 2026 — Approved quote prices

- Owner supplied chicken biryani totals: 4 people $50; 6 people $75; 10 people $120; 15 people $145.
- Recorded exact-count pricing in docs/pricing-policy.md. The earlier instruction to show no public rates remains in effect; no customer-facing prices or automatic calculation were added.
- Other group sizes require a personal quote. No automatic interpolation, extra fees, discounts, or inflation increases were assumed. Future price changes require owner approval.
- Public site and order flow are unchanged; no deployment is needed for this documentation-only update.

## October 20, 2026 — Personal meal requests, no public rates

- User requested a friendly greeting, guest count, meat choice, no displayed rates, and clean/fresh home-cooked positioning; then specified a minimum of four people with beef and lamb coming soon.
- Homepage simplified to welcome, meal request, kitchen photos, and footer. Removed the active price table, size presets, promotions, and price navigation. Original components remain in source for history but are not imported by the page.
- Request form asks guest count first (minimum four), shows chicken available and beef/lamb disabled, and collects name/phone with optional notes. It sends people and chicken to Netlify Forms, without calculating or submitting an estimated price.
- Retained legacy hidden form fields so earlier submission history remains readable. Form requests are not confirmed bookings; the owner confirms minimum quantity, availability, current quote, and timing.
- Pricing is quoted privately using current ingredient costs. No inflation percentage or margin was invented; see docs/pricing-policy.md. No automatic inflation feed or price engine is configured.
- Replaced forced smooth scrolling and the floating order pill with native anchors and an unobstructed form. Inputs use 16px text, visible labels, large targets, native guest-count validation, pending/error/success states.
- Verification so far: full ESLint and production build including TypeScript passed. Built page checks confirmed the welcome, minimum four, no visible rates, disabled coming-soon meats, guest count field, and personal-quote wording. Published source commit 5fe9269. Netlify deploy 6ad7017b2a390a2622d9bb22 reached ready at https://odbiryani.netlify.app. Live homepage, release marker, form definition, photo, and security-header checks passed.
- Live browser acceptance: three-person submission blocked with the guest field focused; aggregate count stayed at 1. Four-person chicken request showed success reference 7E3B5C, then Netlify aggregate count rose to 2. Test notes explicitly say RELEASE TEST - DO NOT FULFILL. No customer submission records were fetched.
- Live page showed no rates, chicken available now, beef/lamb disabled with Coming soon. Resetting the request cleared guest count and customer details. Screenshots saved locally under .netlify/screenshots/meal-request.png and meal-request-success.png.
- Local browser preview was unavailable; final visual and workflow acceptance used the deployed site. Desktop browser review completed; no physical iPhone test was performed.
- Next: owner reviews meal requests in Netlify and confirms current ingredient-cost quote and timing. Email notifications and automatic GitHub builds remain unconfigured.

## October 20, 2026 — ODB brand clarification

- User specified `ODB (one dish biryani)` as the brand name.
- Header and footer now lead with ODB and display One Dish Biryani beneath it. Page title, application name, and social sharing metadata use ODB — One Dish Biryani.
- Existing menu, photos, order handling, GitHub repository, and Netlify URL are retained.
- Release marker: `odbiryani-2026-10-20-brand-odb`.
- Validation: targeted lint and production build (including TypeScript) passed. Source commit `85cf32e` pushed; Netlify deploy `6ad6f06c21220e3988d34261` reached ready. Live browser confirmed ODB in the header/footer and ODB — One Dish Biryani as the page title. Preview saved locally under `.netlify/screenshots/odb-brand.png`.

## October 20, 2026 — GitHub and Netlify release

- User authorized commit, push, and deployment to Netlify.
- GitHub origin: https://github.com/smartbyteit786/ODBiryani.git (empty before initial release).
- Netlify site: https://odbiryani.netlify.app; site ID `d9cc4ca2-0473-4f1f-93a2-afd761eec63c`.
- Static Next.js export replaces standalone server hosting. Portable npm scripts and `netlify.toml` added; strict build type checking enabled.
- Retired the local SQLite order API from the deployed app. Order requests now submit to Netlify Forms (`biryani-order`) with a request reference. Local database and original uploads are excluded from Git.
- Imported UI helpers updated to subscribe to viewport/carousel state with `useSyncExternalStore`; carousel cleanup removes both listeners.
- Verification: dependency install completed; Prisma client generated for retained development types; full ESLint, standalone TypeScript, and production build passed. All pages statically exported.
- Release marker: `/release.json`, value `odbiryani-2026-10-20`.
- Deployment and live form storage checks pending at initial commit; results will be recorded below.
- This release uses a direct Netlify deployment. Automatic deployment on GitHub pushes is not configured. No order email notifications are configured or verified.

### Live release verification

- Initial source commit `212c89b` pushed to GitHub `main`.
- Production deploy `6ad6ef7112437e787cd047f8` reached `ready`; live URL https://odbiryani.netlify.app.
- Corrected Netlify form detection using `processing_settings.ignore_html_forms=false`; verified `use_forms=true`. Added `_headers` to the direct upload so security headers apply.
- Public homepage, release marker, form definition, and kitchen photo returned HTTP 200 with expected content.
- Browser review showed the real-photo homepage and confirmed lamb + party selection displays $149.99 and carries through to the request form.
- Submitted one clearly labeled `RELEASE TEST - DO NOT FULFILL` request with reserved test contact data. The browser showed success reference `999EF2`; Netlify's aggregate submission count increased from 0 to 1.
- Record-level submission inspection was blocked by automatic approval review because the API would fetch all submissions before filtering. No submission records were read. Aggregate form metadata and visible browser confirmation were used instead.
- Live confirmation screenshot saved locally as `order-request-proof.png` (excluded from Git). Test request remains marked do not fulfill in Netlify; no deletion performed.
- Next: confirm pricing/service details and configure an approved recipient for order notifications. Automatic GitHub deploys remain unconfigured; release scripts support direct publication using the operator's existing Netlify sign-in.

---
Task ID: 1
Agent: Main agent (Z.ai)
Task: Build modern Squarespace-style fully animated "One Dish Biryani" flyer website

Work Log:
- Loaded fullstack-dev skill, initialized Next.js 16 environment via init script
- Researched homemade biryani catering pricing (half tray ~$40, full tray 4-6 people $60-80, individual $12-18; lamb premium, chicken base) via web search
- Copied 5 user-uploaded real biryani photos to /public/images with descriptive names (biryani-plate, pot-fresh, feast-table, curry-pot, pot-prep)
- Generated 10 AI food photographs via z-ai CLI (hero pot, chicken/beef/lamb dishes, saffron+olive oil, rice aromatics, dum pot, layering, saffron bloom, solo bowl); fixed size bug: API requires 32-multiple dimensions (1440x720 rejected, used 1344x768)
- Stock video sites (Pexels/Pixabay) Cloudflare-blocked from sandbox; pivoted to YouTube embeds (youtube-nocookie, click-to-play modal) with 3 verified biryani video IDs
- Installed lenis; framer-motion already present
- Built design system in globals.css: espresso/cream/saffron/ember palette, Fraunces+Manrope fonts, keyframes (kenburns, marquee, steam, floaty, shimmer, glow, scroll-cue), grain overlay, gold gradient text
- Fixed next/font error: Fraunces axes require no explicit weight array
- Built components in src/components/biryani/: preloader (steam pot animation), smooth-scroll (lenis + anchor handling), navbar (glass on scroll, scroll progress bar, mobile sheet), hero (parallax+Ken Burns, staggered headline, steam puffs, rotating seal badge), marquee (tilted saffron strip), story (parallax real photos, animated counters), craft (4-step timeline with scroll progress spine), ingredients (8 tilt cards), menu (meat tabs with layoutId pill, size selector, animated price, full price table), gallery (masonry, lightbox with prev/next), videos (3 YouTube cards + modal), testimonials (auto-carousel), order (4-step form wired to API + zustand store sync from menu), footer
- Created zustand store (order-store) so "Order this" pre-selects meat+size in order form
- Created Prisma Order model + POST/GET /api/order with zod validation
- Browser verification via agent-browser: fixed hero bg invisible (negative z-index stacking → isolate + z-0), fixed mobile price table overflow (scroll container), verified: menu tab switching (chicken $59.99 → lamb party $149.99), order form end-to-end submit (DB row confirmed: lamb/party), lightbox open/next/close, video modal iframe src, mobile hamburger menu, mobile hero, no console errors, lint clean

Stage Summary:
- Deliverable: fully animated One Dish Biryani flyer website on Next.js 16 + Tailwind 4 + framer-motion + lenis + Prisma/SQLite
- Prices set from research: Solo $13.99/$15.99/$17.99, Family $59.99/$69.99/$79.99, Party $109.99/$129.99/$149.99 (chicken/beef/lamb)
- 15 images total (5 real user photos + 10 AI-generated), 3 YouTube videos embedded
- Order system live: orders persist to SQLite via /api/order, confirmation screen with order ID + toast


## October 19, 2026 — Plain-language and real-photo refresh

- Imported the supplied archive into this workspace, preserving the existing Git directory. The archive's .env was not imported.
- Simplified hero, story, cooking steps, ingredients, menu, footer, metadata, and order messages. Kept the cream, saffron, and brown design.
- Switched visible food photography to the five supplied kitchen photos. The menu uses a general kitchen photo rather than claiming the photo represents each meat selection. Generated assets remain on disk but are not used by the current page.
- Removed unsourced testimonials and third-party cooking videos from the homepage, along with their navigation links. Removed placeholder contact details/social links and unverified certification and health language.
- Removed the opening preloader and shortened initial animation delays. Existing menu pricing and order logic were preserved. Order submission text now describes an order request without promising a 30-minute callback.
- Verification: checked local image references; no missing assets found. Dependency installation stalled and was stopped. No build, lint, type check, browser review, or order acceptance test completed in this environment. Not deployed.
- Next: install dependencies, generate Prisma client, run type/lint/build checks, and review desktop/mobile pages. Confirm actual prices, ingredients, service area, contact details, and order handling before release. Existing order API security and hosting readiness have not been audited.
