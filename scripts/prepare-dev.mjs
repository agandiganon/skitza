import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const targets = [
  ['.next', 'cache'],
  ['.next', 'dev'],
  ['.next', 'trace'],
  ['.next-dev'],
  ['.next-prod'],
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

const generatedTypeArtifacts = [
  path.join(ROOT, '.next', 'types', 'routes.d 2.ts'),
  path.join(ROOT, '.next', 'types', 'validator 2.ts'),
  path.join(ROOT, '.next', 'types', 'cache-life 2.d.ts'),
];

for (const artifact of generatedTypeArtifacts) {
  fs.rmSync(artifact, { force: true });
}

console.log('[prepare-dev] cleared stale Next.js dev caches');
