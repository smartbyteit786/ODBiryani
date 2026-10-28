import assert from 'node:assert/strict';
import sharp from 'sharp';
import { readFile, stat } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('public/images/optimized/manifest.json', 'utf8'));
let smallBytes = 0;
let originalBytes = 0;
for (const image of manifest) {
  const info = await sharp(image.file).metadata();
  const bytes = (await stat(image.file)).size;
  assert.equal(info.width, image.width);
  assert.equal(info.height, image.height);
  assert.equal(bytes, image.bytes);
  assert(info.width * info.height <= 3_000_000, `${image.file}: excessive decoded image memory`);
  assert(bytes < 300_000, `${image.file}: image transfer budget exceeded`);
  assert(!info.exif && !info.xmp && !info.iptc, `${image.file}: private photo metadata must be stripped`);
  if (image.file.endsWith('-640.webp')) {
    smallBytes += bytes;
    originalBytes += (await stat(image.file.replace('/optimized/', '/').replace('-640.webp', '.jpg'))).size;
  }
}
assert(smallBytes < 450_000, 'Mobile kitchen photo set exceeds 450 KB');
const html = await readFile('out/index.html', 'utf8');
assert(html.includes('/images/optimized/pot-fresh-640.webp 640w'), 'Responsive hero missing');
assert(html.includes('decoding="async"'), 'Async image decoding missing');
assert(!/<img[^>]+src="\/images\/[^"/]+\.jpg"/.test(html), 'An original full-size kitchen image is still rendered');
console.log(JSON.stringify({ passed: true, variants: manifest.length, smallBytes, originalBytes, reductionPercent: Math.round((1 - smallBytes / originalBytes) * 100) }));
