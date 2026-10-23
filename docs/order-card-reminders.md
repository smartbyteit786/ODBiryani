# Request card and optional reminders

After a successful order-form response, a floating card says Request received and Waiting for ODB confirmation. It does not claim a confirmed booking, payment, preparation or delivery status.

Customers can expand, hide or reopen the latest request using the footer link. The card stays in memory for this page visit by default. Choosing a website reminder saves only its reference and timestamps in this browser for up to 30 days. A due reminder appears once while the site is open or on return. Turning it off does not schedule another reminder. A new successful request replaces the previous card and website reminder.

Add to calendar downloads an ICS event with a display alarm. The customer must save it to their calendar; calendar settings control alerts. Turning off the website reminder does not remove calendar events. Neither hiding nor forgetting a card cancels the order.

No native Dynamic Island, background push, live order tracking or end-to-end encrypted messaging is provided. HTTPS and private form handling remain the ordering approach. No owner or customer contact details, addresses or payment data are stored by the card or included in calendar files.

Verification: unit tests cover date handling, reminder validation, data minimization, calendar alarms and injection rejection. Production acceptance and owner notification delivery remain pending Netlify access and configured notifications.
