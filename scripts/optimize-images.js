/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Image optimization for public/images.
 *
 * Three jobs, all idempotent — safe to re-run after dropping new photos in:
 *
 *   1. downscale  Re-encodes any raster source wider/taller than MAX_EDGE.
 *                 Next's largest deviceSize is 2048, so a 5000px original is
 *                 pure repo + build-time waste; nothing is ever served at that
 *                 size. Originals stay in git history if we need them back.
 *
 *   2. avif       Emits an .avif sibling for each source in NEEDS_AVIF_ON_DISK
 *                 — the handful referenced outside next/image, which converts
 *                 <Image> sources on demand and makes other siblings dead weight.
 *
 *   3. og         Builds 1200x630 JPEGs in public/images/og for Open Graph and
 *                 Twitter cards. Social scrapers want that exact aspect ratio
 *                 and many still refuse AVIF/WebP, so these stay JPEG.
 *
 * Usage: npm run optimize-images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const OG_DIR = path.join(IMAGES_DIR, 'og');

const MAX_EDGE = 2560;        // px — comfortably above Next's 2048 deviceSize cap
const AVIF_QUALITY = 62;
const JPEG_QUALITY = 82;

/**
 * Images referenced outside next/image, which therefore need a real AVIF on disk.
 * next/image already converts <Image> sources on demand, so siblings for those
 * are dead weight — but CSS backgrounds (Tailwind arbitrary background-image utilities) and <link rel="preload">
 * bypass the optimizer. Add a path here when you reference an image outside of
 * next/image. Paths are relative to public/images.
 *
 *   projector.jpg  ExperiencesPreview renders it as a Tailwind arbitrary background image
 */
const NEEDS_AVIF_ON_DISK = ['projector.jpg'];

/** Sources that must stay in their original format (logos, icons, favicons). */
const FORMAT_LOCKED = new Set([
  'TheGlampingSpot_W.png',
  'TheGlampingSpot_Variants.png',
  'apple-touch-icon.png',
]);

/** 1200x630 social cards: [source, output basename]. */
const OG_CARDS = [
  ['dome/geodesic-dome-glamping-kountze-texas-night.avif', 'og-the-glamping-spot'],
  ['dome/glamping-dome-deck-string-lights-dusk.avif', 'og-our-dome'],
  ['dome/deck-table-wooden-deck-pine-forest-view.webp', 'og-experiences'],
];

const mb = (bytes) => (bytes / 1048576).toFixed(2) + 'MB';

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'og' || entry.name === 'optimized') continue;
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

async function downscaleOversized(files) {
  let saved = 0;
  for (const file of files) {
    if (!/\.(jpe?g|png|avif)$/i.test(file)) continue;
    if (FORMAT_LOCKED.has(path.basename(file))) continue;

    let meta;
    try { meta = await sharp(file, { failOn: 'none' }).metadata(); } catch { console.warn(`  SKIP       ${path.relative(IMAGES_DIR, file)} — unreadable`); continue; }
    if (Math.max(meta.width, meta.height) <= MAX_EDGE) continue;

    const before = fs.statSync(file).size;
    const ext = path.extname(file).toLowerCase();
    let pipeline = sharp(file, { failOn: 'none' }).rotate().resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    });
    if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 9 });
    else if (ext === '.avif') pipeline = pipeline.avif({ quality: AVIF_QUALITY, effort: 6 });
    else pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });

    let buf;
    try { buf = await pipeline.toBuffer(); } catch (e) { console.warn(`  SKIP       ${path.relative(IMAGES_DIR, file)} — ${e.message}`); continue; }
    if (buf.length >= before) continue; // never grow a file
    fs.writeFileSync(file, buf);
    saved += before - buf.length;
    console.log(
      `  downscale  ${path.relative(IMAGES_DIR, file)}  ` +
      `${meta.width}x${meta.height} ${mb(before)} -> ${MAX_EDGE}px ${mb(buf.length)}`
    );
  }
  return saved;
}

async function emitAvifSiblings() {
  let count = 0;
  for (const rel of NEEDS_AVIF_ON_DISK) {
    const file = path.join(IMAGES_DIR, rel);
    if (!fs.existsSync(file)) {
      console.warn(`  avif       SKIP (missing source) ${rel}`);
      continue;
    }

    const target = file.replace(/.(jpe?g|png)$/i, '.avif');
    if (fs.existsSync(target)) continue;

    try {
      await sharp(file, { failOn: 'none' }).rotate().avif({ quality: AVIF_QUALITY, effort: 6 }).toFile(target);
    } catch (e) {
      console.warn(`  avif       SKIP ${rel} — ${e.message}`);
      continue;
    }

    console.log(
      `  avif       ${path.relative(IMAGES_DIR, target)}  ` +
      `${mb(fs.statSync(file).size)} -> ${mb(fs.statSync(target).size)}`
    );
    count++;
  }
  return count;
}

async function buildOgCards() {
  fs.mkdirSync(OG_DIR, { recursive: true });
  for (const [src, name] of OG_CARDS) {
    const input = path.join(IMAGES_DIR, src);
    if (!fs.existsSync(input)) {
      console.warn(`  og         SKIP (missing source) ${src}`);
      continue;
    }
    const meta = await sharp(input, { failOn: 'none' }).metadata();
    if (meta.width < meta.height) {
      console.warn(
        `  og         WARNING ${src} is ${meta.width}x${meta.height} — a portrait source ` +
        'loses most of the frame when cropped to 1200x630. Prefer a landscape original.'
      );
    }

    const out = path.join(OG_DIR, `${name}.jpg`);
    await sharp(input, { failOn: 'none' })
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(out);
    console.log(`  og         og/${name}.jpg  1200x630 ${mb(fs.statSync(out).size)}`);
  }
}

(async () => {
  console.log('\nOptimizing public/images ...\n');

  console.log('[1/3] Downscaling oversized sources');
  const saved = await downscaleOversized(walk(IMAGES_DIR));

  console.log('\n[2/3] Emitting AVIF siblings');
  const made = await emitAvifSiblings();

  console.log('\n[3/3] Building Open Graph cards');
  await buildOgCards();

  console.log(`\nDone — reclaimed ${mb(saved)} across originals, ${made} AVIF file(s) added.\n`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
