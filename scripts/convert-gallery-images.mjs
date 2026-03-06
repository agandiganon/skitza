#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT_DIR = process.cwd();
const PICTURES_DIR = path.join(ROOT_DIR, "public", "pictures");
const SUPPORTED_SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const QUALITY = 78;

async function main() {
  const entries = await fs.readdir(PICTURES_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    if (entry.name === ".DS_Store") {
      await fs.unlink(path.join(PICTURES_DIR, entry.name));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED_SOURCE_EXTENSIONS.has(extension)) {
      continue;
    }

    const sourcePath = path.join(PICTURES_DIR, entry.name);
    const outputName = `${path.basename(entry.name, extension)}.webp`;
    const outputPath = path.join(PICTURES_DIR, outputName);

    await sharp(sourcePath).webp({ quality: QUALITY }).toFile(outputPath);
    await fs.unlink(sourcePath);
    console.log(`converted ${entry.name} -> ${outputName}`);
  }
}

main().catch((error) => {
  console.error("[convert-gallery-images] failed", error);
  process.exitCode = 1;
});
