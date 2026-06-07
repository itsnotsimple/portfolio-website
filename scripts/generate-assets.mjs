// Rasterizes the SVG templates in public/ into the raster assets that social
// platforms (og:image must be JPG/PNG, not SVG) and older / iOS browsers need.
// Re-run after editing public/og-image.svg or public/favicon.svg:
//   bun run scripts/generate-assets.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

async function run() {
  // Social share card — 1200×630 JPG (no alpha; SVG already paints a bg).
  const ogSvg = await readFile(join(pub, 'og-image.svg'));
  await sharp(ogSvg, { density: 192 })
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(pub, 'og-image.jpg'));

  // Favicons + iOS home-screen icon from the brand mark.
  const favSvg = await readFile(join(pub, 'favicon.svg'));
  await sharp(favSvg, { density: 384 }).resize(32, 32).png().toFile(join(pub, 'favicon-32x32.png'));
  await sharp(favSvg, { density: 384 }).resize(16, 16).png().toFile(join(pub, 'favicon-16x16.png'));
  // iOS composites on black + rounds corners itself → flatten onto the brand bg.
  await sharp(favSvg, { density: 768 })
    .resize(180, 180)
    .flatten({ background: '#04080c' })
    .png()
    .toFile(join(pub, 'apple-touch-icon.png'));

  console.log('✓ Generated: og-image.jpg, favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png');
}

run().catch((e) => { console.error(e); process.exit(1); });
