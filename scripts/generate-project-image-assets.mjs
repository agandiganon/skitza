#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, 'public', 'pictures');
const DERIVED_ROOT_DIR = path.join(ROOT_DIR, 'public', 'pictures-derived');
const SOURCE_PATTERN = /^(\d+)(fav)?\.(png|jpg|jpeg|webp)$/i;
const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

const VARIANTS = [
  {
    key: 'hero',
    size: 384,
    quality: 70,
  },
  {
    key: 'card',
    size: 768,
    quality: 80,
  },
  {
    key: 'thumb',
    size: 160,
    quality: 60,
  },
];

async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function listSourceEntries() {
  const entries = await fs.readdir(SOURCE_DIR, { withFileTypes: true });
  const validEntries = [];
  const ignoredEntries = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    if (entry.name === '.DS_Store') {
      await fs.unlink(path.join(SOURCE_DIR, entry.name));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    const isSupported = SOURCE_EXTENSIONS.has(extension);
    const matchesPattern = SOURCE_PATTERN.test(entry.name);

    if (!isSupported || !matchesPattern) {
      ignoredEntries.push(entry.name);
      continue;
    }

    validEntries.push(entry.name);
  }

  validEntries.sort((left, right) =>
    left.localeCompare(right, 'en', { numeric: true }),
  );

  return {
    validEntries,
    ignoredEntries,
  };
}

async function cleanStaleDerivedFiles(validBaseNames) {
  for (const variant of VARIANTS) {
    const variantDirectory = path.join(DERIVED_ROOT_DIR, variant.key);
    await ensureDirectory(variantDirectory);

    const entries = await fs.readdir(variantDirectory, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isFile()) {
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();
      const basename = path.basename(entry.name, extension);

      if (extension !== '.webp' || !validBaseNames.has(basename)) {
        await fs.unlink(path.join(variantDirectory, entry.name));
      }
    }
  }
}

async function generateVariant(sourcePath, outputPath, size, quality) {
  await sharp(sourcePath)
    .resize({
      width: size,
      height: size,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: true,
    })
    .webp({
      quality,
      alphaQuality: 100,
    })
    .toFile(outputPath);
}

async function main() {
  const { validEntries, ignoredEntries } = await listSourceEntries();
  const validBaseNames = new Set(
    validEntries.map((entryName) =>
      path.basename(entryName, path.extname(entryName)),
    ),
  );
  const lowResolutionEntries = [];
  let generatedFilesCount = 0;

  await ensureDirectory(DERIVED_ROOT_DIR);
  await cleanStaleDerivedFiles(validBaseNames);

  for (const entryName of validEntries) {
    const basename = path.basename(entryName, path.extname(entryName));
    const sourcePath = path.join(SOURCE_DIR, entryName);
    const metadata = await sharp(sourcePath).metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;

    if (width <= 1024 || height <= 1024) {
      lowResolutionEntries.push(`${entryName} (${width}x${height})`);
    }

    for (const variant of VARIANTS) {
      const variantDirectory = path.join(DERIVED_ROOT_DIR, variant.key);
      const outputPath = path.join(variantDirectory, `${basename}.webp`);

      await generateVariant(
        sourcePath,
        outputPath,
        variant.size,
        variant.quality,
      );
      generatedFilesCount += 1;
    }
  }

  console.log(`[project-images] scanned ${validEntries.length} source images`);
  console.log(
    `[project-images] generated ${generatedFilesCount} derived assets`,
  );

  if (ignoredEntries.length > 0) {
    console.warn(
      `[project-images] ignored ${ignoredEntries.length} files: ${ignoredEntries.join(', ')}`,
    );
  }

  if (lowResolutionEntries.length > 0) {
    console.warn(
      `[project-images] lower-resolution source images detected: ${lowResolutionEntries.join(', ')}`,
    );
  }
}

main().catch((error) => {
  console.error('[project-images] failed', error);
  process.exitCode = 1;
});
