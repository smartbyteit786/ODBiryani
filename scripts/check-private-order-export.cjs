/* eslint-disable @typescript-eslint/no-require-imports -- Static privacy release check. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync('out/index.html', 'utf8');
const blueprint = fs.readFileSync('out/__forms.html', 'utf8');
assert(!/href="(?:mailto|sms|tel):/i.test(html), 'Public owner contact link found');
assert(html.includes('name="odb-order-request"'), 'Private order form missing');
for (const field of ['customerName', 'customerEmail', 'customerPhone', 'people', 'chickenCut', 'requestedDate', 'requestedTime', 'fulfillment', 'contactConsent']) assert(html.includes(`name="${field}"`) && blueprint.includes(`name="${field}"`), `Private order field mismatch: ${field}`);
assert(blueprint.includes('name="deliveryAddress"') && blueprint.includes('name="reference"'), 'Private order definition incomplete');
function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (/\.(html|js|json|txt|xml|css)$/.test(file)) {
      const contents = fs.readFileSync(file, 'utf8');
      assert(!/[\w.+-]+@icloud\.com/i.test(contents), 'Private iCloud recipient leaked into export');
    }
  }
}
scan('out');
console.log('Private ordering export passed: Order form, matching fields, no public owner contact links or iCloud recipient.');
