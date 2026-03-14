import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();

const targets = [
  ['.next'],
  ['.next-runtime', 'cache'],
  ['.next-runtime', 'dev'],
  ['.next-runtime', 'diagnostics'],
  ['.next-runtime', 'trace'],
  ['.next-runtime', 'trace-build'],
  ['.next-runtime', 'turbopack'],
  ['.next-runtime', 'types'],
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

const staleDevCommandMarkers = [
  `${ROOT}/node_modules/.bin/next dev`,
  `${ROOT}/node_modules/next/dist/bin/next dev`,
];

try {
  const processes = execSync('ps -axo pid=,command=', {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  })
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const stalePids = processes
    .map((line) => {
      const [pid, ...commandParts] = line.split(/\s+/);
      return { pid: Number(pid), command: commandParts.join(' ') };
    })
    .filter(
      ({ pid, command }) =>
        pid &&
        pid !== process.pid &&
        staleDevCommandMarkers.some((marker) => command.includes(marker)),
    )
    .map(({ pid }) => pid);

  for (const pid of stalePids) {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {}
  }
} catch {}

console.log(
  '[prepare-dev] cleared stale Next.js and Turbopack dev caches while preserving production build output',
);
