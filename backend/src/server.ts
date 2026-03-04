import express from "express";
import cors from "cors";
import helmet from "helmet";
import type { CorsOptions } from "cors";
import { rateLimit } from "express-rate-limit";
import { contactRouter } from "./routes/contact.route.js";
import { healthRouter } from "./routes/health.route.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { corsAllowlist, env } from "./config/env.js";

const app = express();

const port = env.PORT;
const corsAllowlistSet = new Set(corsAllowlist);

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (corsAllowlistSet.has(origin)) {
      callback(null, true);
      return;
    }

    if (env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      callback(null, true);
      return;
    }

    callback(Object.assign(new Error("CORS_NOT_ALLOWED"), { code: "CORS_NOT_ALLOWED" }));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  maxAge: 86_400,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    if (env.NODE_ENV !== "test") {
      const durationMs = Date.now() - start;
      console.info(`[backend] ${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`);
    }
  });
  next();
});

app.use(express.json({ limit: "1mb" }));
const formRateLimit = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  skip: (req) => req.method === "OPTIONS",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "יותר מדי בקשות, נא לנסות שוב בעוד רגע." },
});

app.use("/api/contact", formRateLimit);
app.use("/api", healthRouter);
app.use("/api", contactRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`[backend] listening on http://localhost:${port}`);
});

function shutdown(signal: NodeJS.Signals) {
  console.info(`[backend] received ${signal}, shutting down gracefully`);
  server.close((error) => {
    if (error) {
      console.error("[backend] error while closing server", error);
      process.exit(1);
    }
    process.exit(0);
  });

  setTimeout(() => {
    console.error("[backend] force exit after shutdown timeout");
    process.exit(1);
  }, 10_000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
