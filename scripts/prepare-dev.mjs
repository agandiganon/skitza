import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const targets = [
  ['.next', 'cache'],
  ['.next', 'dev'],
  ['.next', 'diagnostics'],
  ['.next', 'trace'],
  ['.next', 'trace-build'],
  ['.next', 'turbopack'],
  ['.next', 'types'],
  ['.next-dev'],
  ['.next-prod'],
  ['.turbo'],
];

for (const segments of targets) {
  const targetPath = path.join(ROOT, ...segments);
  fs.rmSync(targetPath, {
    force: true,
    recursive: true,
    maxRetries: 10,
    retryDelay: 100,
  });
}

console.log(
  '[prepare-dev] cleared stale Next.js and Turbopack dev caches while preserving production build output',
);
