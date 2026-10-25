# Private owner contact — published October 25, 2026

The privacy and order-card release is live on onedishbiryani.com through GitHub main and Netlify. Public owner contact links are absent. The dedicated order notification is configured to the approved private recipient for odb-order-request only. A marked synthetic browser submission was accepted, and aggregate form metadata increased from zero to one. Owner inbox receipt remains unconfirmed. Saved CLI authorization still fails; browser access works.

The owner requested that public phone details be removed and that orders reach the owner-supplied iCloud recipient privately. A disguised `mailto:`, `sms:` or `tel:` button would expose its destination to browsers; this update uses a private Netlify order form instead.

## Prepared behavior

- Header, mobile navigation and footer show **Order** links to the on-page planner. No public phone, email address or owner name is rendered.
- The planner preserves meal prices, required bone-in/boneless choice, requested date/time, pickup/delivery and 50% deposit wording. Delivery requires the customer's address, with fees still manually confirmed. Automatic private routing is a separate unfinished branch.
- Customers supply their own name, email, phone and consent to order-related contact. The form posts privately to the dedicated `odb-order-request` Netlify form, with reference, food subtotal and fulfillment details. This is a request, not automatic booking/payment acceptance.
- The customer's email is copied into the standard Netlify `email` field for reply-to handling. This is customer data, not the owner's notification recipient. Confirmation receipt clears the visible form; failed/uncertain submissions preserve inputs and the same reference to aid duplicate checking.
- Review intake remains private and owner-verified before curated publication. The review form no longer directs customers to a public owner number; correction requests can use a reply to their order confirmation.

## Private notification configuration and acceptance

The owner-approved notification recipient is stored only in ignored `.netlify/private/order-notifications.json`; it is not imported by the application or included in source/public assets. Do not copy the address into this document, GitHub, a hidden HTML field, a `NEXT_PUBLIC_*` variable, a mail link, or a browser API response.

Netlify rejects the saved CLI login with HTTP 401. The following setup and acceptance procedure was completed through the signed-in browser, except owner inbox confirmation and remaining device-specific checks:

1. Build/deploy this branch and verify the new `odb-order-request` form's field definition. Preserve existing forms and records.
2. In Netlify Forms > Submission notifications, add an email notification **only for `odb-order-request`**, addressed to the approved private recipient. Do not silently forward review/customer data to other accounts or alter unrelated notifications.
3. Submit a clearly marked synthetic request with reserved contact details, verify private form acceptance using aggregate metadata, and separately ask the owner to confirm inbox receipt. A successful POST or configured notification is not proof of email delivery.
4. Check the live HTML and assets for absence of owner contact details, check all Order buttons, and test required fields, dates, cut, fulfillment/address, consent and error/success handling on mobile.
5. The owner confirms actual availability, selected-cut price, route fee, final total and deposit with the customer. The website does not collect payment or verify deposits.

The owner email can remain absent from the public site while receiving notifications. If the owner replies directly from a personal iCloud account, its sender address/name can be visible in that private email conversation; website changes do not provide email anonymity. A business sender or relay would be a separate setup if needed.

## Current release boundary

Production publication, form registration, order-specific notification configuration and a synthetic browser request are verified. Thirty live HTTP checks pass. The request card, reminder opt-in/off, hide/restore and conditional delivery address were exercised in the browser. A 390px viewport had no horizontal overflow. Full device coverage, actual iPhone calendar import, background/push notifications and owner inbox receipt are not verified. Historical Git commits and prior archives are not rewritten by this change.

Reference: [Netlify form notifications and reply-to behavior](https://docs.netlify.com/manage/forms/notifications/).
