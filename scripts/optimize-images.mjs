// Re-compresses (and gently caps the dimensions of) the heaviest raster assets.
// Preview:  bun run scripts/optimize-images.mjs        (writes *.opt.webp, prints sizes)
// Apply:    bun run scripts/optimize-images.mjs --apply (overwrites originals)
// Originals are tracked in git, so `git restore` is the undo.
import sharp from 'sharp';
import { stat, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');

const targets = [
  { file: 'src/assets/453769781_1145851049814387_2954952142584413301_n-removebg-preview.webp', max: 900, q: 82, alpha: true },
  { file: 'public/images/reviews/bobbydiv.webp', max: 800, q: 78 },
  { file: 'public/images/reviews/corbinsylk.webp', max: 800, q: 78 },
  { file: 'public/images/reviews/coach_westfit.webp', max: 800, q: 78 },
  { file: 'public/images/results/result-1.webp', max: 1000, q: 80 },
  { file: 'public/images/results/result-2.webp', max: 1000, q: 80 },
  { file: 'public/images/results/result-3.webp', max: 1000, q: 80 },
  { file: 'public/images/results/result-4.webp', max: 1000, q: 80 },
];

for (const t of targets) {
  const abs = join(root, t.file);
  let before;
  try { before = (await stat(abs)).size; } catch { console.log(`skip (missing): ${t.file}`); continue; }
  const img = sharp(abs);
  const meta = await img.metadata();
  const buf = await img
    .resize(t.max, t.max, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: t.q, effort: 6, alphaQuality: t.alpha ? 90 : 100 })
    .toBuffer();
  const outMeta = await sharp(buf).metadata();
  const pct = Math.round((1 - buf.length / before) * 100);
  console.log(
    `${basename(t.file).slice(0, 30).padEnd(32)} ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height}  ` +
    `${(before / 1024).toFixed(0).padStart(4)}KB -> ${(buf.length / 1024).toFixed(0).padStart(4)}KB  (${pct}% smaller)`
  );
  if (buf.length >= before) {
    console.log('  ↳ kept original (re-encode gave no gain)');
    continue;
  }
  if (apply) {
    await writeFile(abs, buf);
  } else {
    await writeFile(abs.replace(/\.webp$/, '.opt.webp'), buf);
  }
}
console.log(apply ? '✓ applied (originals overwritten)' : '✓ preview written as *.opt.webp');
