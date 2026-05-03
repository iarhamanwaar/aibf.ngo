#!/usr/bin/env node
// Convert PNG/JPG images in public/images to WebP for faster mobile loads.
// Originals are kept (so OG images and external links keep working).
import { readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "public/images");
const QUALITY = 80;
const SKIP_NEWER_THAN_MS = 0; // always re-encode if .webp missing

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let total = 0,
  converted = 0,
  skipped = 0,
  errors = 0,
  bytesIn = 0,
  bytesOut = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
  total++;
  const webp = file.replace(/\.(png|jpe?g)$/i, ".webp");
  if (existsSync(webp)) {
    skipped++;
    continue;
  }
  try {
    const before = (await stat(file)).size;
    await sharp(file)
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(webp);
    const after = (await stat(webp)).size;
    bytesIn += before;
    bytesOut += after;
    converted++;
    console.log(
      `✓ ${path.relative(ROOT, webp)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (${Math.round((1 - after / before) * 100)}% smaller)`,
    );
  } catch (e) {
    errors++;
    console.error(`✗ ${file}: ${e.message}`);
  }
}

console.log(
  `\nDone. ${converted} converted, ${skipped} skipped (already exist), ${errors} errors out of ${total}.`,
);
if (converted) {
  console.log(
    `Total: ${(bytesIn / 1024 / 1024).toFixed(1)}MB → ${(bytesOut / 1024 / 1024).toFixed(1)}MB  (${Math.round((1 - bytesOut / bytesIn) * 100)}% smaller)`,
  );
}
