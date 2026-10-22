# Customer reviews — private intake and manual order checks

## How reviews arrive

New reviews go to the **odb-customer-review** form in ODB's Netlify project, under Forms. The intake contains the customer's name, order phone number, rating, review text, publication consent and a submission reference. Only authorized Netlify project members can access this inbox. No email/SMS notification recipient has been added; check the Forms inbox manually. Existing order forms and historical records are preserved.

The website explains that this is manual matching, not an automated SMS code or proof that the person controls a phone. Spam filtering and a required phone field do not establish a purchase. No review automatically appears publicly.

## Before publishing each review

1. Open the individual submission in Netlify. Verify publication consent and check that the feedback relates to ODB.
2. Match the supplied phone number against a **completed** order in the business's existing text conversation/order records. An inquiry or deposit without fulfillment is not a completed order. If identity is uncertain, ask the customer to confirm from the original order text thread; do not label an unmatched submission verified.
3. Check a private register for an existing published review of that same order. Allow one review per completed order; a repeat should update the existing review, not count twice. Record the Netlify reference, private completed-order reference and public random review ID in a private register outside Git. This step is manual, not an automatically enforced order database constraint.
4. Apply the same moderation rules to every star rating. Do not withhold honest criticism because it is negative. Remove spam, threats/abuse, unrelated content and personal/payment information consistently. Preserve meaning; ask for a corrected review rather than silently changing what the customer said.
5. Prepare a public record containing **only** a random ID, first name/last initial, original rating, approved review text, month and `verifiedOrder: true`. Never copy the full Netlify submission, phone number, full surname, private order ID, payment details or kitchen/customer address into source files.
6. Add the approved record to `src/data/customer-reviews.json`, run `node scripts/check-reviews.mjs`, rebuild, review the public output and publish. The owner can ask Codex to publish a specific approved, sanitized review; do not paste customer phone/order records into public GitHub issues or PRs.
7. Update the private register after publication. Corrections/removals are requested through the original order number; remove the public entry and rebuild as needed. Any Netlify data deletion or retention schedule is a separate owner action; no automatic deletion is promised.

Example schema below is documentation only, not a published customer testimonial:

```json
{
  "id": "random-public-identifier",
  "displayName": "First L.",
  "rating": 3,
  "review": "The customer's actual approved review text.",
  "month": "2026-10",
  "verifiedOrder": true
}
```

## Privacy and operation

- The public display starts empty. No fake rating, sample customer, or verified-order badge is shown for unverified data.
- Contact details are collected only in the private review intake. Phone numbers are never rendered into review cards. Customer consent covers publication of first name/last initial, rating and review; it does not authorize publishing contact information.
- The publication validator rejects extra fields, common phone/email patterns in review text, invalid ratings/months, duplicate IDs and entries without completed-order confirmation. A human must still review text for addresses, unusual personal information and real order evidence; a validator cannot prove purchase or detect every privacy issue.
- The validator permits low ratings. No filter ranks or removes reviews based on positivity.
- Static HTML at `public/__forms.html` defines the matching Netlify form and honeypot. The browser submits URL-encoded data to `/__forms.html`, with timeout/error feedback and a receipt state. A failed/uncertain request does not promise publication; retry can create a duplicate, so check before resending.
- There is no automated publication, owner admin portal, phone-code provider or customer SMS sending. Public review changes remain a deliberate owner-approved release. No existing customer submission records are read by release/UAT scripts.

References: [Netlify form setup](https://docs.netlify.com/manage/forms/setup/), [Netlify spam filtering](https://docs.netlify.com/manage/forms/spam-filters/), [FTC guidance on soliciting reviews](https://www.ftc.gov/business-guidance/resources/soliciting-paying-online-reviews-guide-marketers).
