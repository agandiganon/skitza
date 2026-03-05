import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "נא להזין שם מלא"),
  phone: z
    .string()
    .trim()
    .min(1, "נא להזין מספר נייד")
    .regex(/^[\d\s\-]+$/, "נא להזין מספר תקין"),
  email: z.string().trim().email('נא להזין דוא"ל תקין'),
  service: z.string().trim().min(1, "נא לבחור סוג שירות"),
});

export type ContactPayload = z.infer<typeof contactSchema>;
