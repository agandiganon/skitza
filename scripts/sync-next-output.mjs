import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, '.next-runtime');
const target = path.join(root, '.next');

if (!fs.existsSync(source)) {
  console.error('[postbuild] expected .next-runtime to exist after build');
  process.exit(1);
}

fs.rmSync(target, {
  force: true,
  recursive: true,
  maxRetries: 10,
  retryDelay: 100,
});

fs.cpSync(source, target, {
  force: true,
  recursive: true,
});

console.log('[postbuild] synced .next-runtime to .next for deployment tooling');
