/* eslint-disable @typescript-eslint/no-require-imports -- Direct Node UAT runner. */
const fs = require('node:fs');
const results = [];
const base = 'https://odbiryani.netlify.app';
const expectedRelease = JSON.parse(fs.readFileSync('public/release.json', 'utf8')).release;
function record(name, passed, detail) { results.push({ name, passed, detail }); }
async function get(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(20000) });
  return response;
}
async function main() {
  const response = await get('/');
  const html = await response.text();
  record('Homepage HTTPS and HTTP 200', response.ok && response.url.startsWith('https://'));
  record('Correct page title', html.includes('<title>ODB — One Dish Biryani</title>'));
  for (const [header, value] of Object.entries({
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'strict-origin-when-cross-origin',
  })) record('Security header: ' + header, response.headers.get(header) === value);
  const texts = [...html.matchAll(/href="(sms:[^"]+)"/g)].map(match => match[1]);
  record('Every text link uses the approved number', texts.length >= 2 && texts.every(link => link.startsWith('sms:+17702947145')), { links: texts.length });
  record('Text-only contact, no public mail links or customer contact form', !/href="mailto:/i.test(html) && !/href="tel:/i.test(html) && !/name="(?:name|phone|deliveryAddress)"/.test(html));
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  const anchors = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]))];
  record('Every internal navigation anchor has a target', anchors.every(anchor => ids.has(anchor)), anchors);
  const releaseResponse = await get('/release.json');
  const release = await releaseResponse.json();
  record('Production release matches the tested source', releaseResponse.ok && release.release === expectedRelease, release.release);
  const missing = await get('/uat-nonexistent-page');
  record('Unknown pages return 404', missing.status === 404, missing.status);
  const retired = await get('/api/order');
  record('Retired SQLite order API is not exposed', retired.status === 404, retired.status);
  const robots = await get('/robots.txt');
  record('robots.txt available', robots.ok);
  const assets = [...new Set([...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]).filter(path => path.startsWith('/') && !path.startsWith('//') && /\.(?:js|css|jpg|jpeg|png|woff2|svg|ico)(?:\?|$)/.test(path)))];
  let index = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (index < assets.length) {
      const asset = assets[index++];
      try {
        const assetResponse = await get(asset);
        const bytes = (await assetResponse.arrayBuffer()).byteLength;
        record('Asset: ' + asset, assetResponse.ok && bytes > 0 && !assetResponse.headers.get('content-type')?.includes('text/html'), { status: assetResponse.status, bytes });
      } catch (error) { record('Asset: ' + asset, false, error.message); }
    }
  }));
  fs.mkdirSync('.netlify/uat', { recursive: true });
  const report = { base, expectedRelease, passed: results.filter(result => result.passed).length, failed: results.filter(result => !result.passed).length, results };
  fs.writeFileSync('.netlify/uat/http-results.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: report.passed, failed: report.failed, assets: assets.length, failures: results.filter(result => !result.passed) }, null, 2));
  if (report.failed) process.exitCode = 1;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
