import "dotenv/config";
import { z } from "zod";

const DEFAULT_CORS_ORIGINS = [
  "https://skitza-pack.co.il",
  "https://www.skitza-pack.co.il",
  "http://localhost:3000",
  "http://localhost:3001",
] as const;

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CORS_ORIGIN: z.string().default(DEFAULT_CORS_ORIGINS.join(",")),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().min(1000).default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().int().min(1).default(40),
  DATA_DIR: z.string().trim().default(""),
  RESEND_API_KEY: z.string().trim().default(""),
  RESEND_FROM_EMAIL: z.string().trim().default(""),
  RESEND_TO_EMAIL: z.string().trim().default(""),
}).superRefine((value, ctx) => {
  if (value.NODE_ENV !== "production") {
    return;
  }

  if (!value.RESEND_API_KEY) {
    ctx.addIssue({
      path: ["RESEND_API_KEY"],
      code: z.ZodIssueCode.custom,
      message: "RESEND_API_KEY is required in production",
    });
  }

  if (!value.RESEND_FROM_EMAIL) {
    ctx.addIssue({
      path: ["RESEND_FROM_EMAIL"],
      code: z.ZodIssueCode.custom,
      message: "RESEND_FROM_EMAIL is required in production",
    });
  }

  if (!value.RESEND_TO_EMAIL) {
    ctx.addIssue({
      path: ["RESEND_TO_EMAIL"],
      code: z.ZodIssueCode.custom,
      message: "RESEND_TO_EMAIL is required in production",
    });
  }
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
  throw new Error(`Invalid environment configuration:\n${issues.join("\n")}`);
}

export const env = parsed.data;

export const corsAllowlist = [...new Set(
  env.CORS_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
)];
