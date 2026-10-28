import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Keep supplied originals intact; publish bounded, metadata-free display copies.
const names = ['biryani-plate', 'pot-fresh', 'feast-table', 'curry-pot', 'pot-prep'];
await mkdir('public/images/optimized', { recursive: true });
const report = [];
for (const name of names) {
  for (const width of [640, 1280]) {
    const file = `public/images/optimized/${name}-${width}.webp`;
    const result = await sharp(`public/images/${name}.jpg`).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(file);
    report.push({ file, width: result.width, height: result.height, bytes: result.size });
  }
}
await writeFile('public/images/optimized/manifest.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
