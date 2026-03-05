import { promises as fs } from "node:fs";
import path from "node:path";
import { env } from "../config/env.js";

function getDataDir() {
  if (env.DATA_DIR) {
    return path.resolve(env.DATA_DIR);
  }
  return path.resolve(process.cwd(), "data");
}

async function ensureDir() {
  await fs.mkdir(getDataDir(), { recursive: true });
}

const writeChains = new Map<string, Promise<void>>();

async function enqueueWrite<T>(filename: string, task: () => Promise<T>): Promise<T> {
  const previous = writeChains.get(filename) ?? Promise.resolve();
  let release: (() => void) | undefined;

  const current = new Promise<void>((resolve) => {
    release = resolve;
  });

  writeChains.set(
    filename,
    previous.then(
      () => current,
      () => current
    )
  );

  await previous;
  try {
    return await task();
  } finally {
    release?.();
    if (writeChains.get(filename) === current) {
      writeChains.delete(filename);
    }
  }
}

async function readList<T>(filename: string): Promise<T[]> {
  const filePath = path.join(getDataDir(), filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

async function writeList<T>(filename: string, data: T[]) {
  const filePath = path.join(getDataDir(), filename);
  const tempFilePath = `${filePath}.tmp`;

  await fs.writeFile(tempFilePath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tempFilePath, filePath);
}

export async function appendLead(entry: {
  name: string;
  phone: string;
  email: string;
  service: string;
}) {
  await enqueueWrite("leads.json", async () => {
    await ensureDir();
    const list = await readList<{
      name: string;
      phone: string;
      email: string;
      service: string;
      createdAt: string;
    }>("leads.json");

    list.push({
      ...entry,
      email: entry.email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    });
    await writeList("leads.json", list);
  });
}

export async function appendNewsletterEmail(entry: { email: string }) {
  await enqueueWrite("newsletter.json", async () => {
    await ensureDir();
    const list = await readList<{ email: string; createdAt: string }>("newsletter.json");
    const normalizedEmail = entry.email.trim().toLowerCase();

    if (list.some((item) => item.email.toLowerCase() === normalizedEmail)) {
      return;
    }

    list.push({ email: normalizedEmail, createdAt: new Date().toISOString() });
    await writeList("newsletter.json", list);
  });
}
