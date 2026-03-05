import type { NextFunction, Request, Response } from "express";

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: "נתיב לא נמצא" });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (
    err instanceof Error &&
    ((err as { code?: string }).code === "CORS_NOT_ALLOWED" || err.message === "CORS_NOT_ALLOWED")
  ) {
    return res.status(403).json({ error: "מקור הבקשה אינו מורשה" });
  }

  console.error("[backend] Unexpected error", err);
  res.status(500).json({ error: "שגיאת שרת" });
}
