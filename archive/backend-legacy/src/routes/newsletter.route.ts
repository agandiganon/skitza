import { Router } from "express";
import { newsletterSchema } from "../schemas/newsletter.schema.js";
import { appendNewsletterEmail } from "../services/json-store.service.js";

export const newsletterRouter = Router();

newsletterRouter.post("/newsletter", async (req, res, next) => {
  try {
    const parsed = newsletterSchema.safeParse(req.body);

    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message = Object.values(first).flat().join(" ") || 'נא להזין דוא"ל תקין';
      return res.status(400).json({ error: message });
    }

    await appendNewsletterEmail(parsed.data);
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
});
