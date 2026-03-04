import { Router } from "express";
import { contactSchema } from "../schemas/contact.schema.js";
import { sendLeadEmail } from "../services/sendLeadEmail.service.js";

export const contactRouter = Router();

contactRouter.post("/contact", async (req, res, next) => {
  try {
    if (!req.is("application/json")) {
      return res.status(415).json({ error: "תוכן הבקשה לא תקין" });
    }

    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message = Object.values(first).flat().join(" ") || "שגיאה בנתונים";
      return res.status(400).json({ error: message });
    }

    await sendLeadEmail(parsed.data);

    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
});
