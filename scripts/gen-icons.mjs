// Rasterize the SVG favicon into PNG app icons (apple-touch + PWA).
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url));

for (const size of [180, 192, 512]) {
  await sharp(svg, { density: 512 })
    .resize(size, size)
    .png()
    .toFile(new URL(`../public/icon-${size}.png`, import.meta.url).pathname);
  console.log(`  icon-${size}.png`);
}
