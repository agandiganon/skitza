import { Router } from "express";
import { env } from "../config/env.js";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: Number(process.uptime().toFixed(3)),
  });
});
