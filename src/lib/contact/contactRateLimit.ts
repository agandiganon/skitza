type RateLimitEntry = {
  hits: number[];
  windowMs: number;
  limit: number;
};

type ContactRateLimitInput = {
  ipAddress?: string | null;
  email: string;
  phone: string;
};

type ContactRateLimitResult =
  | {
      allowed: true;
    }
  | {
      allowed: false;
      retryAfterMs: number;
    };

const CONTACT_RATE_LIMIT_STORE_KEY = "__skitza_contact_rate_limit__";

function getStore() {
  const globalScope = globalThis as typeof globalThis & {
    [CONTACT_RATE_LIMIT_STORE_KEY]?: Map<string, RateLimitEntry>;
  };

  if (!globalScope[CONTACT_RATE_LIMIT_STORE_KEY]) {
    globalScope[CONTACT_RATE_LIMIT_STORE_KEY] = new Map<string, RateLimitEntry>();
  }

  return globalScope[CONTACT_RATE_LIMIT_STORE_KEY]!;
}

function normalizeKeyPart(value: string | null | undefined) {
  return value?.trim().toLowerCase() || null;
}

function readEntry(key: string, windowMs: number, limit: number, now: number) {
  const store = getStore();
  const existing = store.get(key);
  const hits = (existing?.hits ?? []).filter((timestamp) => now - timestamp < windowMs);
  const entry: RateLimitEntry = { hits, windowMs, limit };
  store.set(key, entry);
  return entry;
}

export function enforceContactRateLimit({
  ipAddress,
  email,
  phone,
}: ContactRateLimitInput): ContactRateLimitResult {
  const now = Date.now();
  const normalizedEmail = normalizeKeyPart(email);
  const normalizedPhone = normalizeKeyPart(phone);
  const normalizedIp = normalizeKeyPart(ipAddress);
  const rules = [
    normalizedIp
      ? {
          key: `ip:${normalizedIp}`,
          windowMs: 15 * 60 * 1000,
          limit: 5,
        }
      : null,
    normalizedEmail
      ? {
          key: `email:${normalizedEmail}`,
          windowMs: 60 * 60 * 1000,
          limit: 3,
        }
      : null,
    normalizedPhone
      ? {
          key: `phone:${normalizedPhone}`,
          windowMs: 60 * 60 * 1000,
          limit: 3,
        }
      : null,
  ].filter(Boolean) as { key: string; windowMs: number; limit: number }[];

  for (const rule of rules) {
    const entry = readEntry(rule.key, rule.windowMs, rule.limit, now);

    if (entry.hits.length >= entry.limit) {
      return {
        allowed: false,
        retryAfterMs: Math.max(rule.windowMs - (now - entry.hits[0]), 1000),
      };
    }
  }

  for (const rule of rules) {
    const entry = readEntry(rule.key, rule.windowMs, rule.limit, now);
    entry.hits.push(now);
    getStore().set(rule.key, entry);
  }

  return {
    allowed: true,
  };
}
